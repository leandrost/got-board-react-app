export function fetchBoard(boards) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_BOARD',
      fetch: {
        endpoint: '/board',
      }
    });
  };
}
