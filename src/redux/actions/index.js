export function fetchBoard(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_BOARD',
      fetch: {
        //endpoint: `/board/${id}`,
        endpoint: `board${id}`,
        included: ["territories", "units", "power_tokens"],
      }
    });
  };
}
