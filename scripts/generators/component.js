import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './component.scss';

@CSSModules(styles)
export default class component extends React.Component {
  render() {
    return (
      <div />
    );
  }
}
