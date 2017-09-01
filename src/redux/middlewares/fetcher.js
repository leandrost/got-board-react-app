const fetchData = (config, dispatch, action) => {
  console.log("Action ", action);

  Promise.chain = function(arr, value) {
    return arr.reduce(
      (promise, item) => {
        return promise.then(item).catch(console.error);
      },
      Promise.resolve(value)
    );
  };

  const promises = action.fetch.included.map(include => {
    return (json => {
      dispatch({
        type: `LOAD_${include.toUpperCase()}`,
        payload: json,
        jsonapi: true,
      });
      return json;
    });
  });

  fetchFrom(action, config).then(json => {
    dispatch({
      type: `${action.type}_SUCCESS`,
      payload: json,
      jsonapi: true,
    });
    return json;
  })
  .then(json => {
    return Promise.chain(promises, json);
  })
  .catch(exception => {
    console.error(exception);
  });
};

function fetchFrom(action, config) {
  const options = Object.assign({}, config.options, action.options);

  return fetch(`${config.host}${action.fetch.endpoint}`, options)
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
