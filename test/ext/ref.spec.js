import { _refs, _ref } from "../../src/ext/ref.js"
import { define } from "../../src/define.js"
import { whenDefined } from "../../src/whenDefined.js"
import { fixture, createElement } from "../utils.js"
const { module, test } = QUnit

module("ref", () => {
  module("_refs", () => {
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
      whenDefined(element).then(done)
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
      Promise.all([whenDefined(element), whenDefined(nested)]).then(done)
    })
  })

  module("_ref", () => {
    test("get first matching ref", (assert) => {
      const done = assert.async()

      const element = createElement("div", { c1: "ref-3" })
      const child1 = createElement("div", { "c1-ref": "ref-3.foo" })
      const child2 = createElement("div", { "c1-ref": "ref-3.foo" })
      element.appendChild(child1)
      element.appendChild(child2)
      fixture().appendChild(element)

      define("ref-3", (host) => {
        const ref = _ref(host)
        const fooRef = ref("foo")
        assert.propEqual(fooRef, child1)
        done()
      })
    })
  })
})
