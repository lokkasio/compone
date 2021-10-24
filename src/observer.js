import { ATTRIBUTE } from "./const.js"

/** @typedef { (element: HTMLElement) => void } lifecycleCallback */

/** @param { HTMLElement } node */
const qSA = (node) => node.querySelectorAll(`[${ATTRIBUTE}]`)

/**
 * @param { NodeList } nodes
 * @param { lifecycleCallback } callback
 */
const process = (nodes, callback) => {
  for (const entryNode of nodes) {
    if (entryNode.nodeType === Node.ELEMENT_NODE) {
      ;[entryNode, ...qSA(entryNode)].forEach(callback)
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
        disconnectedCallback(target)
        connectedCallback(target)
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
