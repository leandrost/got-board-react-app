const default_state = {};

export default (state = default_state, action) => {
  switch (action.type) {

    case 'LOAD_KINGS_COURT_TOKENS':
      return action.payload.kingsCourtTokens || state;

    case 'MOVE_KINGS_COURT_TOKEN':
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
