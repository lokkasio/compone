import { _qs, _qsa } from "../../src/ext/querySelector.js"
import { fixture, createElement } from "../utils.js"
const { module, test } = QUnit

module("querySelector", () => {
  test("_qs", (assert) => {
    const element = createElement("div")
    const child = createElement("p")
    element.appendChild(child)
    fixture().appendChild(element)

    const result = _qs(element)("p")
    assert.equal(result, child)
  })

  test("_qsa", (assert) => {
    const element = createElement("div")
    const child1 = createElement("p")
    const child2 = createElement("p")
    child1.appendChild(child2)
    element.appendChild(child1)
    fixture().appendChild(element)

    const result = _qsa(element)("p")
    assert.ok(Array.isArray(result))
    assert.propEqual(result, [child1, child2])
  })
})
