import React from "react";
import Pusher from "pusher-js";
import normalize from "json-api-normalizer";
import _ from "lodash";

import { connect, actions } from "~/redux/tools";

import { update, bulkUpdate } from "~/redux/actions/";

const camelCaseKeys = obj => {
  if (!_.isObject(obj)) {
    return obj;
  } else if (_.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  return _.reduce(
    obj,
    (r, v, k) => {
      return {
        ...r,
        [_.camelCase(k)]: camelCaseKeys(v)
      };
    },
    {}
  );
};

@connect(
  () => ({}),
  actions({ update, bulkUpdate })
)
export default class PusherClient extends React.Component {
  componentDidMount() {
    const pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER
    });
    const channel = pusher.subscribe("game");

    channel.bind("update", data => {
      console.log("Pusher dispatches an update from API", data);
      let obj = camelCaseKeys(data);
      this.props.update(obj);
    });

    channel.bind("bulk_update", bulk => {
      const json = JSON.parse(bulk.payload);
      const data = normalize(json);
      this.props.bulkUpdate(bulk.type, data);
    });

    channel.bind("combat", data => {
      console.log("combat", data);
    });
  }

  render() {
    return null;
  }
}
