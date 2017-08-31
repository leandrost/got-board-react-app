export function fetchBoard(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_BOARD',
      included: "territories",
      fetch: {
        //endpoint: `/board/${id}`,
        endpoint: `board${id}`,
      }
    });
  };
}
