import { combineReducers }  from 'redux';
import games from './games';
import territories from './territories';

export default combineReducers({
  games,
  territories,
});
