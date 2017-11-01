import { combineReducers }  from 'redux';
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

export default combineReducers({
  games: pieceReducer('game', 'games'),
  houses: pieceReducer('house', 'houses'),

  footmen: pieceReducer('footman', 'footmen'),
  knights: pieceReducer('knight', 'knights'),
  ships: pieceReducer('ship', 'ships'),
  siegeEngines: pieceReducer('siegeEngine', 'siegeEngines'),

  ironThroneTokens: pieceReducer('ironThroneToken', 'ironThroneTokens'),
  fiefdomTokens: pieceReducer('fiefdomToken', 'fiefdomTokens'),
  kingsCourtTokens: pieceReducer('kingsCourtToken', 'kingsCourtTokens'),

  supplyTokens: pieceReducer('supplyToken', 'supplyTokens'),
  victoryTokens: pieceReducer('victoryToken', 'victoryTokens'),
  powerTokens: pieceReducer('powerToken', 'powerTokens'),

  marchOrders: pieceReducer('marchOrder', 'marchOrders'),
  houseCards: pieceReducer('houseCard', 'houseCards'),

  garrisonTokens,
  //garrisonTokens: pieceReducer('garrisonToken', 'garrisonTokens'),
  neutralForceTokens: pieceReducer('neutralForceToken', 'neutralForceTokens'),

  territories,
});


