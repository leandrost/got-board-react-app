import { combineReducers }  from 'redux';
import board from './board';
import territory from './territory';

export default combineReducers({
  board,
  territory,
});
