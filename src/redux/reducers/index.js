import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';
import units from './units';
import ironThroneTrack from './iron-throne-track';
import fiefdomsTrack from './fiefdoms-track';
import kingsCourtTrack from './kings-court-track';
import influenceTokens from './influence-tokens';

export default combineReducers({
  games,
  territories,
  units,
  ironThroneTrack,
  fiefdomsTrack,
  kingsCourtTrack,
  influenceTokens,
});
