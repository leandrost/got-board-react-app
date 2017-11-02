import { combineReducers }  from 'redux';
import territories from './territories';
import garrisonTokens from './garrison-tokens';
import _ from 'lodash';
import _inflection from 'lodash-inflection';
_.mixin(_inflection);

const updateAttributes = (state, action) => {
  let id = action.id;
  if (!id) { return; }
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
        return  {...state, loading: true };

      case `FETCH_${piece}_SUCCESS`:
      case `LOAD_${pieces}`:
        return action.payload[collection] || state;

      case `UPDATE_${piece}`:
      case `MOVE_${piece}`:
        return updateAttributes(state, action);

      default:
        return state;
    }
  }
}

const resources = [
  'game',
  'house',

  ['footman', 'footmen'],
  'knight',
  'ship',
  'siegeEngine',

  'ironThroneToken',
  'fiefdomToken',
  'kingsCourtToken',

  'supplyToken',
  'victoryToken',
  'powerToken',

  'raidOrder',
  'marchOrder',
  'supportOrder',
  'consolidationOrder',
  'defenseOrder',

  'houseCard',
  'neutralForceToken',
];

const reducers = {};

resources.forEach(resource => {
  const { type, collection } = Array.isArray(resource) ?
    { type: resource[0], collection: resource[1] } :
    { type: resource, collection: _.pluralize(resource) };

  reducers[collection] = pieceReducer(type, collection);
});

export default combineReducers({...reducers, garrisonTokens, territories });
