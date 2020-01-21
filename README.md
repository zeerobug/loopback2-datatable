# loopback3-datatable

Returns all search results as needed by [datatables](https://datatables.net/), [vue-tables-2](https://www.npmjs.com/package/vue-tables-2) and other ajax based tables.
Data can be paginated, count result is the total of records corresponding to the filter, without pagination.
Compatible with [vue-tables-2](https://www.npmjs.com/package/vue-tables-2), for pagination and search queries. Reads from GET and POST data (untested). filerFields is an array of the searchable fields.
Example of query:
`filterFields[]=titre&query=Mark&limit=10&ascending=1&page=1&byColumn=0`

Derived from [loopback3-xTotalCount](https://github.com/zeerobug/loopback3-xTotalCount)

Response:

```json
  "response": {
    "data": [
      {"item_1": "val_1"}
      {"item_2": "val_2"}
      ...
      {"item_n": "val_n"}
    ],
    "count": "total_items"
  }

```

## Install

### NPM

1. `npm install loopback3-datatable`
2. Set the module in your `component-config.json` (loopback server endpoint)

```json
  "loopback3-datatable": {
    "pattern": [
      "*.find"
    ]
  }
```

## Options

### `pattern`: Array of String

Method patterns that will be modified.

Accepted patterns: See https://loopback.io/doc/en/lb3/Remote-hooks.html#wildcards.

Default value: `[ "*.find" ]`, which auto added to find method of all models.

## Known issues

no known issues

## License

This module is licensed under the [MIT Licence](LICENSE).
