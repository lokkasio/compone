export const fixture = () => document.getElementById("qunit-fixture")

export const createElement = (tagName, attr = {}) =>
  Object.entries(attr).reduce((element, [key, value]) => {
    element.setAttribute(key, value)
    return element
  }, document.createElement(tagName))
