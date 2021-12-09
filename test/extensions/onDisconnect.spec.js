import { _on } from "../../src/extensions/eventListener.js"
import { _onDisconnect } from "../../src/extensions/onDisconnect.js"
import { connect, disconnect } from "../../src/core.js"
import { C1_PROPERTY, ON_DISCONNECT_PROPERTY } from "../../src/const.js"
import { createElement } from "../utils.js"
const { module, test } = QUnit

let element

module(
  "onDisconnect",
  {
    beforeEach() {
      element = createElement("div")
    },
  },
  () => {
    test("add callback to disconnectedCallbacks array", (assert) => {
      const done = assert.async()

      connect(element, (host) => {
        const onDisconnect = _onDisconnect(host)
        const disconnectedCallbacks =
          host[C1_PROPERTY][ON_DISCONNECT_PROPERTY].length
        onDisconnect(() => {})
        assert.equal(
          host[C1_PROPERTY][ON_DISCONNECT_PROPERTY].length,
          disconnectedCallbacks + 1
        )
        done()
      })
    })

    test("run callback on disconnect", (assert) => {
      const done = assert.async()

      connect(element, (host) => {
        const onDisconnect = _onDisconnect(host)
        onDisconnect(() => {
          assert.ok(true)
          done()
        })

        disconnect(element)
      })
    })
  }
)
