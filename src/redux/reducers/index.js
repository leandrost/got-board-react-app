import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';
import garrisonTokens from './garrison-tokens';
import _ from 'lodash';

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
      case `LOAD_${pieces}`:
        return action.payload[collection] || state;

      case `MOVE_${piece}`:
        return updateAttributes(state, action);

      default:
        return state;
    }
  }
}

export default combineReducers({
  games,

  footmen: pieceReducer('footman', 'footmen'),
  knights: pieceReducer('knight', 'knights'),
  ships: pieceReducer('ship', 'ships'),
  siegeEngines: pieceReducer('siegeEngine', 'siegeEngines'),

  ironThroneTokens: pieceReducer('IRON_THRONE_TOKEN', 'ironThroneTokens'),
  fiefdomTokens: pieceReducer('FIEFDOM_TOKEN', 'fiefdomTokens'),
  kingsCourtTokens: pieceReducer('KINGS_COURT_TOKEN', 'kingsCourtTokens'),

  supplyTokens: pieceReducer('SUPPLY_TOKEN', 'supplyTokens'),
  victoryTokens: pieceReducer('VICTORY_TOKEN', 'victoryTokens'),
  garrisonTokens,
  territories,
});


