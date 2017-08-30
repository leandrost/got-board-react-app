const fetchData = (config, dispatch, action) => {
  fetchFrom(action, config).then(json => {
    dispatch({
      type: `${action.type}_SUCCESS`,
      payload: json,
      jsonapi: true,
    });
  }).catch(exception => {
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
  console.log(config);

  if (action.fetch) {
    fetchData(config, store.dispatch, action);
  }
  next(action);
}
