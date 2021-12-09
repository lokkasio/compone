import { ATTRIBUTE } from "./const.js"

/** @typedef { (element: Element) => void } lifecycleCallback */

/** @param { ParentNode } node */
const qSA = (node) => node.querySelectorAll(`[${ATTRIBUTE}]`)

/**
 * @param { NodeList } nodes
 * @param { lifecycleCallback } callback
 */
const process = (nodes, callback) => {
  for (const entryNode of nodes) {
    if (entryNode.nodeType === Node.ELEMENT_NODE) {
      const element = /** @type Element */ (entryNode)
      ;[element, ...qSA(element)].forEach(callback)
    }
  }
}

/**
 * @param { lifecycleCallback } connectedCallback
 * @param { lifecycleCallback } disconnectedCallback
 */
export const observe = (
  connectedCallback,
  disconnectedCallback,
  root = document
) => {
  new MutationObserver((records) => {
    for (const { attributeName, target, removedNodes, addedNodes } of records) {
      if (attributeName) {
        const element = /** @type Element */ (target)
        disconnectedCallback(element)
        connectedCallback(element)
      }

      process(removedNodes, disconnectedCallback)
      process(addedNodes, connectedCallback)
    }
  }).observe(root, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [ATTRIBUTE],
  })

  qSA(root).forEach(connectedCallback)
}
