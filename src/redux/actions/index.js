export function fetchGame(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_GAME',
      fetch: {
        include: ["territories"],
        endpoint: `/games/${id}?include=territories`,
      }
    });
  };
}
