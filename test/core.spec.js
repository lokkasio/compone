import { C1_PROPERTY } from "../src/const.js"
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
      test("callback is called", async (assert) => {
        await connect(element, () => {
          assert.ok(true)
        })
      })

      test("element is passed to callback", async (assert) => {
        await connect(element, (host) => {
          assert.equal(host, element)
        })
      })

      test("element gets an async `api` property", async (assert) => {
        await connect(element, () => {})
        assert.ok(element[C1_PROPERTY])
        assert.equal(typeof element[C1_PROPERTY].then, "function")
      })

      test("element's `api` property resolves to the callback's return value", async (assert) => {
        await connect(element, () => 42)
        const api = await element[C1_PROPERTY]
        assert.equal(api, 42)
      })

      test("cannot connect allready connected node", async (assert) => {
        await connect(element, () => {
          assert.step("1")
        })
        await connect(element, () => {
          assert.step("2")
        })
        assert.verifySteps(["1"])
      })

      test("can connect a disconnected node", async (assert) => {
        await connect(element, () => {
          assert.step("1")
        })
        disconnect(element)
        await connect(element, () => {
          assert.step("2")
        })
        assert.verifySteps(["1", "2"])
      })
    })
  }
)
