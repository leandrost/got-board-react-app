import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';
import units from './units';

export default combineReducers({
  games,
  territories,
	units
});
