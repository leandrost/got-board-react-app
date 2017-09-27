const default_state = {
  1: {
    id: 1,
    attributes: {
      track: 'iron_throne',
      position: 1,
      house: 'baratheon',
      x: 0,
      y: 0,
    }
  },
  4: {
    id: 4,
    attributes: {
      track: 'fiefdoms',
      position: 5,
      house: 'baratheon',
      x: 0,
      y: 0,
    }
  },
  5: {
    id: 5,
    attributes: {
      track: 'kings_court',
      position: 4,
      house: 'baratheon',
      x: 0,
      y: 0,
    }
  },
  6: {
    id: 6,
    attributes: {
      track: 'iron_throne',
      position: 3,
      house: 'stark',
      x: 0,
      y: 0,
    }
  },
  8: {
    id: 8,
    attributes: {
      track: 'fiefdoms',
      position: 4,
      house: 'stark',
      x: 0,
      y: 0,
    }
  },
  9: {
    id: 9,
    attributes: {
      track: 'kings_court',
      position: 2,
      house: 'stark',
      x: 0,
      y: 0,
    }
  },
};

export default (state = default_state, action) => {
  switch (action.type) {

    case 'LOAD_TOKENS':
      const payload = action.payload;
      const influenceTokens = Object.assign(
        {},
        payload.ironThroneTokens,
        payload.fiefdomTokens,
        payload.kingsCourtTokens
      );
      console.log("InfluenceTokens", influenceTokens);
      return influenceTokens || state;

    case 'MOVE_INFLUENCE_TOKEN':
      let id = action.id;
      if (!id) { return; }
      console.log('MOVE_INFLUENCE_TOKEN', action);
      return {...state,
        [id]: {...state[id],
          attributes: { ...state[id].attributes, ...action.attributes }
        }
      };

    default:
      return state;
  }
}
