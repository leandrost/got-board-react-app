import { combineReducers }  from 'redux';
import _ from 'lodash';

import { reducerNames } from '~/redux/datatypes';
import territories from './territories';

const updateAttributes = (state, action) => {
  let id = action.id;
  if (!id) { return state; }
  return {
    ...state,
    [id]: {...state[id],
      attributes: { ...state[id].attributes, ...action.attributes }
    }
  };
}

const pieceReducer = (type, collection) => {
  const piece = _.snakeCase(type).toUpperCase();
  const pieces = _.snakeCase(collection).toUpperCase();

  return (state = {}, action) => {
    switch (action.type) {
      case `FETCH_${piece}`:
        return  { ...state, loading: true };

      case `FETCH_${piece}_SUCCESS`:
      case `BULK_UPDATE_${pieces}_SUCCESS`:
      case `LOAD_${pieces}`:
        const type = _.singularize(collection);
        const reducers = reducerNames(type);

        if(!reducers) {
          return  { ...state, ...action.data[collection] };
        }

        let data = {};
        reducers.forEach(name => {
          data = { ...data, ...action.data[name] }
        });

        return  { ...state, ...data };

      case `UPDATE_${piece}`:
      case `MOVE_${piece}`:
        return updateAttributes(state, action);

      case `MOVE_${piece}_SUCCESS`:
        return updateAttributes(state, action.payload.data);

      default:
        return state;
    }
  }
}

const dataTypes = [
  'game',
  'house',
  'unit',
  'order',
  'powerToken',
  'houseCard',
  'neutralForceToken',
  'garrisonToken',
  'influenceToken',
  'supplyToken',
  'victoryToken',
];

const reducers = {};

dataTypes.forEach(resource => {
  const { type, collection } = Array.isArray(resource) ?
    { type: resource[0], collection: resource[1] } :
    { type: resource, collection: _.pluralize(resource) };

  reducers[collection] = pieceReducer(type, collection);
});

const current = (state = { gameId: null }, action) => {
  switch (action.type) {
    case 'SET_CURRENT_GAME':
      return {...state, gameId: action.id, house: action.house };
    default:
      return state;
  }
}

export default combineReducers({
  current,
  ...reducers,
  territories
});
