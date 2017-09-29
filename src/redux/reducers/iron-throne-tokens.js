const default_state = {};

export default (state = default_state, action) => {
  switch (action.type) {

    case 'LOAD_IRON_THRONE_TOKENS':
      return action.payload.ironThroneTokens || state;

    case 'MOVE_IRON_THRONE_TOKEN':
      let id = action.id;
      if (!id) { return; }
      return {...state,
        [id]: {...state[id],
          attributes: { ...state[id].attributes, ...action.attributes }
        }
      };

    default:
      return state;
  }
}
