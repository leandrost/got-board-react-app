const default_state = {
  "23": {
    id: "23",
    attributes: {
      house: "stark",
      type: "footman",
      territory: null,
      x: 0,
      y: 0
    }
  },
  "27": {
    id: "27",
    attributes: {
      house: "stark",
      type: "knight",
      territory: null,
      x: 0,
      y: 0
    }
  },
  "24": {
    id: "24",
    attributes: {
      house: "baratheon",
      type: "knight",
      territory: "castle_black",
      x: 799,
      y: 238
    }
  }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case "MOVE_UNIT":
      console.log("CHECK IF WE USE OF THIS REDUCER. units.js", action);
      let id = action.id;
      if (!id) {
        return;
      }
      return {
        ...state,
        [id]: {
          ...state[id],
          attributes: { ...state[id].attributes, ...action.attributes }
        }
      };

    default:
      return state;
  }
};
