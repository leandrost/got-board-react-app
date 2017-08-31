const fetchData = (config, dispatch, action) => {
  console.log("Action ", action);
  //function asyncFunc(e) {
    //return new Promise((resolve, reject) => {
      //setTimeout(() => resolve(e), e * 1000);
    //});
  //}

  //const p1 = new Promise(result => {
    //return "this";
  //});
  //const p2 = new Promise(result => {
    //console.log(result);
    //debugger
    //return result.then(`${result} is`);
  //});
  //const p3 = new Promise(result => {
    //debugger
    //return result.then(`${result} it!`);
  //});

  //const arr = [ p1, p2, p3 ];

  //function promiseChain(arr) {
    //return arr.reduce((promise, item) => {
      //return item;
    //}, Promise.resolve());
  //}

  //p1.then(p2).then(p3);

  function asyncFunc(e) {
    return new Promise((resolve, reject) => {
       resolve(e);
    });
  }

  const arr = [1, 2, 3];
  let final = [];

  function workMyCollection(arr) {
    return arr.reduce((promise, item) => {
      return promise
      .then((result) => {
        console.log(`item ${item}`);
        return asyncFunc(item).then(result => {
          final.push(result)
          return result;
        });
      })
      .catch(console.error);
    }, Promise.resolve());
  }

  workMyCollection(arr)
  .then((r) => console.log(`FINAL RESULT is ${final} - ${r}`));

  //promiseChain(arr).then(json => {
    //console.log("CHAIN: ", json)
  //});

  fetchFrom(action, config).then(json => {
    dispatch({
      type: `${action.type}_SUCCESS`,
      payload: json,
      jsonapi: true,
    });
    return json;
  })
  .then(json => {
    console.log(json);
    dispatch({
      type: `LOAD_TERRITORIES`,
      payload: json,
      jsonapi: true,
    });
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
