import { API_PROPERTY, ON_DISCONNECT_PROPERTY } from "../src/const.js"
import { connect, disconnect } from "../src/core.js"
import { createElement } from "./utils.js"
const { module, test } = QUnit
let element = null

module(
  "core",
  {
    beforeEach() {
      element = createElement("div")
    },
  },
  () => {
    module("connect", () => {
      test("callback is called", (assert) => {
        connect(element, () => {
          assert.ok(true)
        })
      })

      test("element is passed to callback", (assert) => {
        connect(element, (host) => {
          assert.equal(host, element)
        })
      })

      test("element's `onDisconnect` property is an array", (assert) => {
        connect(element, (host) => {
          assert.ok(Array.isArray(host[ON_DISCONNECT_PROPERTY]))
        })
      })

      test("element gets an async `api` property", (assert) => {
        connect(element, () => {})
        assert.ok(element[API_PROPERTY])
        assert.equal(typeof element[API_PROPERTY].then, "function")
      })

      test("element's `api` property resolves to the callback's return value", async (assert) => {
        connect(element, () => 42)
        const api = await element[API_PROPERTY]
        assert.equal(api, 42)
      })

      test("cannot connect allready connected node", (assert) => {
        connect(element, () => {
          assert.step("1")
        })
        connect(element, () => {
          assert.step("2")
        })
        assert.verifySteps(["1"])
      })

      test("can connect a disconnected node", (assert) => {
        connect(element, () => {
          assert.step("1")
        })
        disconnect(element)
        connect(element, () => {
          assert.step("2")
        })
        assert.verifySteps(["1", "2"])
      })
    })
  }
)
