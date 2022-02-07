import { _onDisconnect } from "../src/mixins/onDisconnect.js"
import { define } from "../src/define.js"
import { whenConnected } from "../src/whenConnected.js"
import { fixture, createElement } from "./utils.js"
const { module, test } = QUnit

module("define", () => {
  test("connect present element", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "define-1" })
    fixture().appendChild(element)
    define("define-1", () => {
      assert.ok(true)
      done()
    })
  })

  test("connect future element", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "define-2" })
    define("define-2", () => {
      assert.ok(true)
      done()
    })
    fixture().appendChild(element)
  })

  test("disconnect when element is removed", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "define-4" })
    fixture().appendChild(element)
    define("define-4", (host) => {
      const onDisconnect = _onDisconnect(host)
      onDisconnect(() => {
        assert.ok(true)
        done()
      })
    })
    whenConnected(element).then(() => {
      fixture().removeChild(element)
    })
  })

  test("connect future child element", (assert) => {
    const done = assert.async()
    const parent = createElement("div")
    const element = createElement("div", { c1: "define-8" })
    parent.appendChild(element)
    define("define-8", () => {
      assert.ok(true)
      done()
    })
    fixture().appendChild(parent)
  })

  test("disconnect when parent element is removed", (assert) => {
    const done = assert.async()
    const parent = createElement("div")
    const element = createElement("div", { c1: "define-9" })
    parent.appendChild(element)
    fixture().appendChild(parent)
    define("define-9", (host) => {
      const onDisconnect = _onDisconnect(host)
      onDisconnect(() => {
        assert.ok(true)
        done()
      })
    })
    whenConnected(element).then(() => {
      fixture().removeChild(parent)
    })
  })
})
