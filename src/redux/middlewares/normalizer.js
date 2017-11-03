import normalize from 'json-api-normalizer';

export default (store) => (next) => (action) => {
  if (action.jsonapi) {
    action.data = normalize(action.payload);
  }
  next(action);
}

