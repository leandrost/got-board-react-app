import { collectionName, resourceName, modelName } from '~/redux/datatypes';

export function fetchGame(id) {
  return (dispatch) => {
    return dispatch({
      type: 'FETCH_GAME',
      fetch: {
        endpoint: `/games/${id}?include=*`,
        success: (json) => {
          dispatch({
            type: 'SET_CURRENT_GAME',
            id: id,
          })
        },
      }
    });
  };
}

export function movePiece(piece, attrs) {
  console.log(arguments);
  const { id, type, gameId } = piece;
  const collection = collectionName(type);
  const resource = resourceName(type);
  const pieceType = modelName(type).toUpperCase();
  delete attrs.dropEffect;

  return (dispatch) => {
    dispatch({
      type: `MOVE_${pieceType}`,
      id: id,
      attributes: attrs,
      fetch: {
        endpoint: `/games/${gameId}/${resource}/${id}`,
        options: {
          method: "PATCH",
          body: JSON.stringify({
            data: {
              type: collection,
              id: id,
              attributes: attrs,
            }
          }),
        }
      }
    });
  };
}
