# @stoplight/json-schema-sampler

It's a fork of [openapi-sampler](https://github.com/Redocly/openapi-sampler) by Redocly, with focus on supporting JSON Schema Draft 7.

Tool for generation samples based on JSON Schema Draft 7.

## Features

- Deterministic (given a particular input, will always produce the same output)
- Supports compound keywords: `allOf`, `oneOf`, `anyOf`, `if/then/else`
- Supports `additionalProperties`
- Uses `default`, `const`, `enum` and `examples` where possible
- Good array support: supports `contains`, `minItems`, `maxItems`, and tuples (`items` as an array)
- Supports `minLength`, `maxLength`, `min`, `max`, `exclusiveMinimum`, `exclusiveMaximum`
- Supports the following `string` formats:
  - email
  - idn-email
  - password
  - date-time
  - date
  - time
  - ipv4
  - ipv6
  - hostname
  - idn-hostname
  - uri
  - uri-reference
  - uri-template
  - iri
  - iri-reference
  - uuid
  - json-pointer
  - relative-json-pointer
  - regex
- Infers schema type automatically following same rules as [json-schema-faker](https://www.npmjs.com/package/json-schema-faker#inferred-types)
- Support for `$ref` resolving

## Installation

Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm)

    npm install @stoplight/json-schema-sampler --save

or using [yarn](https://yarnpkg.com)

    yarn add @stoplight/json-schema-sampler

Then require it in your code:

```js
const JSONSchemaSampler = require('@stoplight/json-schema-sampler');
```

## Usage
#### `JSONSchemaSampler.sample(schema, [options], [spec])`
- **schema** (_required_) - `object`
A JSON Schema Draft 7 document.
- **options** (_optional_) - `object`
Available options:
  - **skipNonRequired** - `boolean`
  Don't include non-required object properties not specified in [`required` property of the schema object](https://swagger.io/docs/specification/data-models/data-types/#required)
  - **skipReadOnly** - `boolean`
  Don't include `readOnly` object properties
  - **skipWriteOnly** - `boolean`
  Don't include `writeOnly` object properties
  - **quiet** - `boolean`
  Don't log console warning messages
  - **maxSampleDepth** - `number`
    Max depth sampler should traverse
- **doc** - the whole schema where the schema is taken from. Might be useful when the `schema` passed is only a portion of the whole schema and $refs aren't resected. **doc** must not contain any external references

## Example
```js
const JSONSchemaSampler = require('@stoplight/json-schema-sampler');
JSONSchemaSampler.sample({
  type: 'object',
  properties: {
    a: {type: 'integer', minimum: 10},
    b: {type: 'string', format: 'password', minLength: 10},
    c: {type: 'boolean', readOnly: true}
  }
}, {skipReadOnly: true});
// { a: 10, b: 'pa$$word_q' }
```
