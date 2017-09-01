export function fetchBoard(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_BOARD',
      fetch: {
        included: ["territories"],
        endpoint: `/games/${id}?included=territories`,
      }
    });
  };
}
