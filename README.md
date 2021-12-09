# compone

> Lifecycle Callbacks for any HTML Element

```html
<div c1="my-compone">Hello!</div>
```

```js
import { define } from "compone"

define("my-compone", function (host) {
  console.log("connected", host.textContent)
})
```

## Extensions

Add more functionality to your compone with extensions

### `onDisconnect`

```js
import { define } from "compone"
import { _onDisconnect } from "compone/extensions"

define("my-compone", function (host) {
  const onDisconnect = _onDisconnect(host)

  function clickHandler(event) {
    console.log("click", event)
  }

  host.addEventListener(clickHandler)

  onDisconnect(function () {
    host.removeEventListener(clickHandler)
  })
})
```

### `on`

`onDisconnect` is a good place to clean up event listeners. While this is a common pattern, there's an own extension for that.

```js
import { define } from "compone"
import { _on } from "compone/extensions"

define("my-compone", function (host) {
  const on = _on(host)

  on(host, "click", function (event) {
    console.log("click", event)
  })
})
```

### `qs` & `qsa`

Another common task is selecting child elements

```js
import { define } from "compone"
import { _qs, _qsa } from "compone/extensions"

define("my-compone", function (host) {
  const qs = _qs(host)
  const qsa = _qsa(host)

  const child = qs(".child")
  const children = qsa(".child")
})
```

### `extend`

Using extensions can be verbose

```js
const onDisconnect = _onDisconnect(host)
const on = _on(host)
const qs = _qs(host)
const qsa = _qsa(host)
```

Fortunately there is a handy helper, that reduces the boilerplate

```js
import { define, extend } from "compone"
import { _on, _qs } from "compone/extensions"

define(
  "my-compone",
  extend(
    _on,
    _qs
  )(function (host, on, qs) {
    const button = qs(".button")
    on(button, "click", function (event) {
      console.log("button click", event)
    })
  })
)
```
