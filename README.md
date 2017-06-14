# pambda-redux

Pambda to handle Redux action.

## Installation

```
npm i pambda-redux -S
```

## Usage

``` javascript
import { compose, createLambda } from 'pambda';
import { router } from 'pambda-router';
import { jsonApi } from 'pambda-json-api';
import { redux } from 'pambda-redux';

export const handler = createLambda(
  compose(
    router()
      .post('/api/', compose(
        jsonApi({}),
        redux({})
      ))
      .toPambda()
  )
);
```

handlers/MY_ACTION.js

``` javascript
export default (event, context, callback) => {
  // Do something for type MY_ACTION
};
```

## redux(options)

- `options.handlers`
    - The object with a handler according to type of Action. The type of Action is specified for the key. For the value, a function with the argument `(event, context, callback)` is specified.
- `options.basedir`
    - Base directory that a module is required.
    - When a corresponding handler for type of Action can not be found in `handlers`, require a module that matches type in its base directory. The `default` function in the module is called as a handler.
    - The default value is `process.cwd() + '/handlers'`.
- `options.invalidRequestHandler`
    - A function with an argument `(event, context, callback)` called for an invalid request.
- `options.unknownTypeHandler`
    - A function with an argument `(event, context, callback)` called for an unknown type.

## License

MIT
