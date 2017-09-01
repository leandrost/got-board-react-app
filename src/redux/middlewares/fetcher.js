const fetchData = (config, dispatch, action) => {
  const dispatchers = dispatchersFor(action.fetch.include, dispatch);
  fetchFrom(action, config).then(json => {
    dispatch({
      type: `${action.type}_SUCCESS`,
      payload: json,
      jsonapi: true,
    });
    return json;
  })
  .then(json => {
    return Promise.chain(dispatchers, json);
  })
  .catch(exception => {
    console.error(exception);
  });
};

function dispatchersFor(includes, dispatch) {
  return includes.map(include => {
    return (json => {
      dispatch({
        type: `LOAD_${include.toUpperCase()}`,
        payload: json,
        jsonapi: true,
      });
      return json;
    });
  });
}

Promise.chain = function(arr, value) {
  return arr.reduce(
    (promise, item) => {
      return promise.then(item).catch(console.error);
    },
    Promise.resolve(value)
  );
};

function fetchFrom(action, config) {
  const options = Object.assign({}, config.options, action.options);
  const endpoint = `${config.host}${action.fetch.endpoint}`;

  return fetch(endpoint, options)
    .then(checkStatus).then(formatToJSON);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw errorFrom(response);
  }
}

function errorFrom(response) {
  const error = new Error(`${response.status} - ${response.statusText}`);
  error.response = response;
  return error;
}

function formatToJSON(response) {
  return response.json();
}

export default (config = {}) => (store) => (next) => (action) => {
  if (action.fetch) {
    fetchData(config, store.dispatch, action);
  }
  next(action);
}
