import React from 'react';
import Pusher from 'pusher-js';
import normalize from 'json-api-normalizer';

import { connect, actions } from '~/redux/tools';

import { update, bulkUpdate } from '~/redux/actions/';

@connect(
  () => ({}),
  actions({ update, bulkUpdate })
)
export default class PusherClient extends React.Component {
  componentDidMount() {
    const pusher = new Pusher("cfdf3c0b0c4a559c3dfe", { cluster: "mt1" });
    const channel = pusher.subscribe('game');

    channel.bind('update', (data) => {
      this.props.update(data)
    });

    channel.bind('bulk_update', (bulk) => {
      const json = JSON.parse(bulk.payload);
      const data = normalize(json);
      this.props.bulkUpdate(bulk.type, data);
    });
  }

  render() {
    return null;
  }
}
