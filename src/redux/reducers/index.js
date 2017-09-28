import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';
import units from './units';
import influenceTokens from './influence-tokens';
import ironThroneTokens from './iron-throne-tokens';
import fiefdomTokens from './fiefdom-tokens';
import kingsCourtTokens from './kings-court-tokens';
import garrisonTokens from './garrison-tokens';

export default combineReducers({
  games,
  territories,
  units,
  influenceTokens,
  ironThroneTokens,
  fiefdomTokens,
  kingsCourtTokens,
  garrisonTokens,
});
