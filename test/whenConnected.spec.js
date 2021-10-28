import { whenConnected } from "../src/whenConnected.js"
import { define } from "../src/define.js"
import { fixture, createElement } from "./utils.js"
const { module, test } = QUnit

module("whenConnected", () => {
  test("wait for connected element and resolve the returned value", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "whenConnected" })
    whenConnected(element).then((api) => {
      assert.equal(api, 42)
      done()
    })
    define("whenConnected", () => 42)
    fixture().appendChild(element)
  })
})
