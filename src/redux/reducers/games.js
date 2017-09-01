export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_GAME':
      return  {...state, loading: true };

    case 'FETCH_GAME_SUCCESS':
      return action.payload.games || state;

    default:
      return state;
  }
}
