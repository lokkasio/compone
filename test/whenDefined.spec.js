import { whenDefined } from "../src/whenDefined.js"
import { define } from "../src/define.js"
import { fixture, createElement } from "./utils.js"
const { module, test } = QUnit

module("whenDefined", () => {
  test("wait for connected element and resolve the returned value", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "whenDefinded" })
    whenDefined(element).then((api) => {
      assert.equal(api, 42)
      done()
    })
    define("whenDefinded", () => 42)
    fixture().appendChild(element)
  })
})
