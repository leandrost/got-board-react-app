export function fetchGame(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_GAME',
      fetch: {
        include: ['territories'],
        endpoint: `/games/${id}?include=territories`,
      }
    });
  };
}

export function moveUnit(id, attrs) {
  return (dispatch) => {
    dispatch({
      type: 'MOVE_UNIT',
      id: id,
      attributes: attrs,
    });
  };
}

export function moveInfluenceToken(id, attrs) {
  return (dispatch) => {
    dispatch({
      type: 'MOVE_INFLUENCE_TOKEN',
      id: id,
      attributes: attrs,
    });
  };
}

export function movePiece(type, id, attrs) {
  return (dispatch) => {
    dispatch({
      type: `MOVE_${type.toUpperCase()}`,
      id: id,
      attributes: attrs,
    });
  };
}
