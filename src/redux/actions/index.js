import { collectionName, resourceName, actionModelName } from '~/redux/datatypes';
import _ from 'lodash';

const snakeCaseKeys = (obj) => {
  if (!_.isObject(obj)) {
    return obj;
  } else if (_.isArray(obj)) {
    return obj.map((v) => snakeCaseKeys(v));
  }
  return _.reduce(obj, (r, v, k) => {
    return {
      ...r,
      [_.snakeCase(k)]: snakeCaseKeys(v)
    };
  }, {});
};

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
  delete attrs.dropEffect;

  const { id, type, gameId } = piece;
  const collection = collectionName(type);
  const resource = resourceName(type);
  const actionModel = actionModelName(type);

  return (dispatch) => {
    dispatch({
      type: `MOVE_${actionModel}`,
      id: id,
      attributes: attrs,
      fetch: {
        endpoint: `/games/${gameId}/${resource}/${id}`,
        options: {
          method: 'PATCH',
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

export function updateGame(id, attrs) {
  return (dispatch) => {
    dispatch({
      type: `UPDATE_GAME`,
      id: id,
      attributes: attrs,
      fetch: {
        endpoint: `/games/${id}`,
        options: {
          method: 'PATCH',
          body: JSON.stringify({
            data: {
              type: 'games',
              id: id,
              attributes: snakeCaseKeys(attrs),
            }
          }),
        }
      }
    });
  };
}

export function updateAll(gameId, type, data) {
  const collection = collectionName(type);
  const resource = resourceName(type);
  const filter = Object.entries(data.filter)
  .map(([key, value]) => `filter[${key}]=${value}`)
  .join('&');

  return (dispatch) => {
    dispatch({
      type: `BULK_UPDATE_${collection.toUpperCase()}`,
      attributes: data.attributes,
      fetch: {
        endpoint: `/games/${gameId}/${resource}?${filter}`,
        options: {
          method: "PATCH",
          body: JSON.stringify({
            data: {
              type: collection,
              attributes: data.attributes
            }
          }),
        }
      }
    });
  };
}

export function update(data) {
  const actionModel = actionModelName(data.type);

  return (dispatch) => {
    dispatch({
      type: `UPDATE_${actionModel}`,
      id: data.id,
      attributes: data.attributes,
    });
  };
}

export function bulkUpdate(type, data) {
  return (dispatch) => {
    dispatch({
      type: `LOAD_${type.toUpperCase()}`,
      data: data,
    });
  };
}

export function revealWildlingCard(id) {
  return (dispatch) => {
    dispatch({
      type: `REVEAL_WILDLING_CARD`,
      id: id,
      fetch: {
        endpoint: `/games/${id}/wildling_cards/reveal`,
        options: {
          method: 'PATCH',
          success: (json) => {
            dispatch({
              type: 'REVEAL_WILDLING_CARD_SUCCESS',
              id: id,
            })
          },
        }
      }
    });
  };
}

export function revealWildlingCardSuccess() {
  return (dispatch) => {
    dispatch({
      type: `REVEAL_WILDLING_CARD_SUCCESS`,
    });
  };
}

export function unrevealWildlingCardSuccess() {
  return (dispatch) => {
    dispatch({
      type: `UNREVEAL_WILDLING_CARD_SUCCESS`,
    });
  };
}

