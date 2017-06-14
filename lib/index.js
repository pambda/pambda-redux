exports.redux = (options = {}) => {
  const {
    handlers = {},
    basedir = process.cwd() + '/handlers',
    invalidRequestHandler = defaultInvalidRequestHandler,
    unknownTypeHandler = defaultUnknownTypeHandler,
  } = options;

  return next => (event, context, callback) => {
    const { body: action } = event;

    if (typeof action !== 'object') {
      return invalidRequestHandler(event, context, callback);
    }

    const { type } = action;

    if (!type) {
      return invalidRequestHandler(event, context, callback);
    }

    let handler = handlers[type];

    if (!handler) {
      const [err, module] = safeRequire(basedir + '/' + type);

      if (err) {
        return callback(err);
      }

      if (!module) {
        return unknownTypeHandler(event, context, callback);
      }

      handlers[type] = handler = module.default || module;
    }

    handler(event, context, callback);
  };
};

function safeRequire(path) {
  try {
    require.resolve(path);
  } catch (err) {
    return [null, null];
  }

  try {
    return [null, require(path)];
  } catch (err) {
    return [err, null];
  }
}

function defaultUnknownTypeHandler(event, context, callback) {
  callback(null, {
    statusCode: 422,
    body: {
      type: 'INVALID_TYPE',
    },
  });
}

function defaultInvalidRequestHandler(event, context, callback) {
  callback(null, {
    statusCode: 400,
    body: 'Bad Request',
  });
}
