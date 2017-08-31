export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_BOARD':
      return  {...state, loading: true };

    case 'FETCH_BOARD_SUCCESS':
      return  action.payload.board;

    default:
      return state;
  }
}
