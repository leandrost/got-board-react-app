import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';
import units from './units';
import influenceTokens from './influence-tokens';
import garrisonTokens from './garrison-tokens';

export default combineReducers({
  games,
  territories,
  units,
  influenceTokens,
  garrisonTokens,
});
