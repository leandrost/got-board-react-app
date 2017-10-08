import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import build from 'redux-object';

export function actions(actions) {
  return dispatch => bindActionCreators(actions, dispatch);
}

export { connect, build };
