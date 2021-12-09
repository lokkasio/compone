import { extend } from "../src/extend.js"
import { createElement } from "./utils.js"
const { module, test } = QUnit

const add = (a) => (b) => a + b
const multiply = (a) => (b) => a * b
const getAttribute = (node) => (attribute) => node.getAttribute(attribute)

module("extend", () => {
  test("with primitive context", (assert) => {
    const extended = extend(add)((ctx, myAdd) => {
      assert.equal(myAdd(3), add(ctx)(3))
    })
    extended(2)
  })

  test("with element context", (assert) => {
    const element = createElement("div", { foo: "bar" })
    const extended = extend(getAttribute)((ctx, getAttr) => {
      assert.equal(getAttr("foo"), getAttribute(ctx)("foo"))
    })
    extended(element)
  })

  test("with multiple extensions", (assert) => {
    const extended = extend(
      add,
      multiply
    )((ctx, myAdd, myMultiply) => {
      assert.equal(myAdd(3), add(ctx)(3))
      assert.equal(myMultiply(3), multiply(ctx)(3))
    })
    extended(2)
  })

  test("with additional arguments", (assert) => {
    const extended = extend(add)((ctx, myAdd, foo, bar) => {
      assert.equal(foo, "foo")
      assert.equal(bar, "bar")
      assert.equal(myAdd(3), add(ctx)(3))
    })
    extended(2, "foo", "bar")
  })
})
