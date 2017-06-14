# pambda-redux

Redux action を処理する Pambda.

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
)
```

handlers/MY_ACTION.js

``` javascript
export default (event, context, callback) => {
  // type MY_ACTION に対する処理
};
```

## redux(options)

- `options.handlers`
    - Action の type に応じたハンドラーを持つ Object。
      キーとして Action の type を指定する。
      値として引数 `(event, context, callback)` を持つ関数を指定する。
- `options.basedir`
    - モジュールを require する時のベースディレクトリ。
    - `handlers` 内に Action の type に対応するハンドラーが見つからない時に、そのベースディレクトリ内で type に一致するモジュールを require する。 require したモジュール内の `default` 関数がハンドラーとして呼ばれる。
    - デフォルト値は `process.cwd() + '/handlers'`
- `options.invalidRequestHandler`
    - 無効なリクエストに対して呼ばれる引数 `(event, context, callback` を持つ関数。
- `options.unknownTypeHandler`
    - 未知の type に対して呼ばれる引数 `(event, context, callback` を持つ関数。

## License

MIT
