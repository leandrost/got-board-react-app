import _ from 'lodash';

export function fetchGame(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_GAME',
      fetch: {
        endpoint: `/games/${id}?include=*`,
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

export function movePiece(piece, attrs) {
  const type = _.snakeCase(piece.type).toUpperCase();
  return (dispatch) => {
    dispatch({
      type: `MOVE_${type}`,
      id: piece.id,
      attributes: attrs,
    });
  };
}
