import { _onDisconnect } from "../src/ext/onDisconnect.js"
import { define } from "../src/define.js"
import { fixture, createElement } from "./utils.js"
const { module, test } = QUnit

module("define", () => {
  test("connect present element", (assert) => {
    const element = createElement("div", { c1: "define-1" })
    fixture().appendChild(element)
    define("define-1", () => {
      assert.ok(true)
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

  test("connect present element with future attribute", (assert) => {
    const done = assert.async()
    const element = createElement("div")
    fixture().appendChild(element)
    define("define-3", () => {
      assert.ok(true)
      done()
    })
    setTimeout(() => {
      element.setAttribute("c1", "define-3")
    })
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
    setTimeout(() => {
      fixture().removeChild(element)
    })
  })

  test("disconnect when attribute is removed", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "define-5" })
    fixture().appendChild(element)
    define("define-5", (host) => {
      const onDisconnect = _onDisconnect(host)
      onDisconnect(() => {
        assert.ok(true)
        done()
      })
    })
    setTimeout(() => {
      element.removeAttribute("c1")
    })
  })

  test("reconnect when attribute is changed", (assert) => {
    const done = assert.async()
    const element = createElement("div", { c1: "define-6" })
    fixture().appendChild(element)
    define("define-6", (host) => {
      const onDisconnect = _onDisconnect(host)
      onDisconnect(() => {
        assert.ok(true)
      })
    })
    define("define-7", () => {
      assert.ok(true)
      done()
    })
    setTimeout(() => {
      element.setAttribute("c1", "define-7")
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
    setTimeout(() => {
      fixture().removeChild(parent)
    })
  })
})
