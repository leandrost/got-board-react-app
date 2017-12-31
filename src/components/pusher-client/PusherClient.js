import React from 'react';
import Pusher from 'pusher-js';

import { connect, actions } from '~/redux/tools';

import { update } from '~/redux/actions/';

@connect(
  () => ({}),
  actions({ update })
)
export default class PusherClient extends React.Component {
  componentDidMount() {
    const pusher = new Pusher("cfdf3c0b0c4a559c3dfe", { cluster: "mt1" });
    const channel = pusher.subscribe('game');

    channel.bind('update', (data) => {
      this.props.update(data)
    });
  }

  render() {
    return null;
  }
}
