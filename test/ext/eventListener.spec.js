import { _on } from "../../src/ext/eventListener.js"
import { ON_DISCONNECT_PROPERTY } from "../../src/const.js"
import { connect } from "../../src/core.js"
import { createElement } from "../utils.js"
const { module, test } = QUnit

let button

module(
  "eventListener",
  {
    beforeEach() {
      button = createElement("button")
    },
  },
  () => {
    test("adds an event listener", (assert) => {
      const done = assert.async()

      connect(button, (host) => {
        const on = _on(host)
        on(host, "click", () => {
          assert.ok(true)
        })
        host.click()
        done()
      })
    })

    test("returns a callback to remove the event listener", (assert) => {
      assert.expect(1)
      const done = assert.async()

      connect(button, (host) => {
        const on = _on(host)
        const off = on(host, "click", () => {
          assert.ok(true)
        })
        host.click()
        off()
        host.click()
        done()
      })
    })

    test("remove the event listener on disconnect", (assert) => {
      const done = assert.async()

      connect(button, (host) => {
        const on = _on(host)
        const disconnectedCallbacks = host[ON_DISCONNECT_PROPERTY].length
        on(host, "click", () => {})
        assert.equal(
          host[ON_DISCONNECT_PROPERTY].length,
          disconnectedCallbacks + 1
        )
        done()
      })
    })
  }
)
