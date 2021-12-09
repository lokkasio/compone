import { _refs } from "../../src/extensions/ref.js"
import { define } from "../../src/define.js"
import { whenConnected } from "../../src/whenConnected.js"
import { fixture, createElement } from "../utils.js"
const { module, test } = QUnit

module("refs", () => {
  test("get all refs", (assert) => {
    const element = createElement("div", { c1: "ref-1" })
    const child1 = createElement("div", { "c1-ref": "ref-1.foo" })
    const child2 = createElement("div", { "c1-ref": "ref-1.foo" })
    element.appendChild(child1)
    element.appendChild(child2)
    fixture().appendChild(element)

    define("ref-1", (host) => {
      const refs = _refs(host)
      const fooRefs = refs("foo")
      assert.propEqual(fooRefs, [child1, child2])
    })

    const done = assert.async()
    whenConnected(element).then(done)
  })

  test("don't get nested refs", (assert) => {
    const element = createElement("div", { c1: "ref-2" })
    const child1 = createElement("div", { "c1-ref": "ref-2.foo" })
    const child2 = createElement("div", { "c1-ref": "ref-2.foo" })
    const nested = createElement("div", { c1: "ref-2" })
    const nestedChild = createElement("div", { "c1-ref": "ref-2.foo" })
    nested.appendChild(nestedChild)
    element.appendChild(child1)
    element.appendChild(child2)
    element.appendChild(nested)
    fixture().appendChild(element)

    define("ref-2", (host) => {
      const refs = _refs(host)
      const fooRefs = refs("foo")

      switch (host) {
        case element:
          assert.propEqual(fooRefs, [child1, child2])
          break

        case nested:
          assert.propEqual(fooRefs, [nestedChild])
          break
      }
    })

    const done = assert.async()
    Promise.all([whenConnected(element), whenConnected(nested)]).then(done)
  })
})
