import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';
import units from './units';
import garrisonTokens from './garrison-tokens';

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
  return (state = {}, action) => {
    switch (action.type) {

      case `LOAD_${type}S`:
        return action.payload[collection] || state;

      case `MOVE_${type}`:
        return updateAttributes(state, action);

      default:
        return state;
    }
  }
}

export default combineReducers({
  games,
  units,
  ironThroneTokens: pieceReducer('IRON_THRONE_TOKEN', 'ironThroneTokens'),
  fiefdomTokens: pieceReducer('FIEFDOM_TOKEN', 'fiefdomTokens'),
  kingsCourtTokens: pieceReducer('KINGS_COURT_TOKEN', 'kingsCourtTokens'),
  supplyTokens: pieceReducer('SUPPLY_TOKEN', 'supplyTokens'),
  victoryTokens: pieceReducer('VICTORY_TOKEN', 'victoryTokens'),
  garrisonTokens,
  territories,
});


