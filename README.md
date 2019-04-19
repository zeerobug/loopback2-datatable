# loopback3-datatable
Returns all search results as needed by datatables and other ajax based tables
Derived from https://github.com/zeerobug/loopback3-xTotalCount

```json
  "response": {
    "data": [
      {item_1}
      {item_2}
      ...
      {item_n}
    ],
    "count": n
  }

## Install

### NPM

1. Add `"loopback3-datatable": "latest"` to your `package.json` file.
2. Run `npm install` OR run `npm install loopback3-datatable`
3. Set the module in your `component-config.json` (loopback server endpoint)

```json
  "loopback3-datatable": {
    "pattern": [
      "*.find"
    ]
  }
```

### Yarn

We recommend to use `yarn` instead of `npm`:

1. `yarn add loopback3-datatable`
2. Set the module in your `component-config.json`

```json
  "loopback3-datatable": {
    "pattern": [
      "*.find"
    ]
  }
```

## Options

### `pattern`: Array of String

Method patterns that `X-Total-Count` header will be added.

Accepted patterns: See https://loopback.io/doc/en/lb3/Remote-hooks.html#wildcards.

Default value: `[ "*.find" ]`, which auto added to find method of all models.

## Example

Please check example here: [loopback-aor-boilerplate](https://github.com/kimkha/loopback-aor-boilerplate), you should clone it and change your model later.

## Known issues

### Cross-domain header

By default, loopback doesn't allow expose header over cross-domain. So, if you client site and your loopback server run on 2 different domain, the client won't receive `X-Total-Count` (see [here](https://github.com/kimkha/aor-loopback/issues/2)).

To fix it, open `middleware.json` and insert following line under `initial.cors.params`:

```
"exposedHeaders": "X-Total-Count"
```

## License
This module is licensed under the [MIT Licence](LICENSE).
