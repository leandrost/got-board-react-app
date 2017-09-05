import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './InfluenceTrack.scss';

@CSSModules(styles)
export class InfluenceToken extends React.Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div></div>
    );
  }
}

@CSSModules(styles)
export class InfluenceTrackSlot extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props;
    return connectDropTarget(
      <div>
        { children }
      </div>
    );
  }
}

@CSSModules(styles)
export default class InfluenceTrack extends React.Component {
  render() {
    return <ul styleName="tracks">
      <li className="iron-throne">
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </li>
      <li className="fiefdoms">
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </li>
      <li className="kings-court">
        <ol>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </li>
    </ul>
  }
}

