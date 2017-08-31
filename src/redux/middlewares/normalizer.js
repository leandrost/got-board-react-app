import normalize from 'json-api-normalizer';

export default (store) => (next) => (action) => {
  if (action.jsonapi) {
    const payload = normalize(action.payload);
    action.payload = payload;
  }
  next(action);
}

