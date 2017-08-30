import normalize from 'json-api-normalizer';

export default (store) => (next) => (action) => {
  if (action.jsonapi) {
    const payload = normalize(action.payload);
    action.resource = Object.keys(payload)[0];
    action.payload = payload[action.resource];
  }
  next(action);
}

