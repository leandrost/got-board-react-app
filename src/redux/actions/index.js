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
  const relationships = [
    'territories',
    'houses',
    'units',
    'orders',
    'power_tokens',
    'house_cards',
    'neutral_force_tokens',
    'garrison_tokens',
    // 'influence_tokens',
    'supply_tokens',
    'victory_tokens'
  ];

  return (dispatch) => {
    return dispatch({
      type: 'FETCH_GAME',
      fetch: {
        endpoint: `/games/${id}?include=${relationships}`,
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

function revealCard(gameId, action) {
  const actionType = action.toUpperCase();
  return (dispatch) => {
    dispatch({
      type: `${actionType}_WILDLING_CARD`,
      id: gameId,
      fetch: {
        endpoint: `/games/${gameId}/wildling_cards/${action}`,
        options: {
          method: 'PATCH',
          success: (json) => {
            dispatch({
              type: `REVEAL_WILDLING_CARD`,
              id: gameId,
            })
          },
        }
      }
    });
  };
}

export function drawWildlingCard(id) {
  return revealCard(id, 'draw');
}

export function peekWildlingCard(id) {
  return revealCard(id, 'peek');
}

export function hideWildlingCard(gameId) {
  return (dispatch) => {
    dispatch({
      type: `HIDE_WILDLING_CARD`,
      id: gameId,
      fetch: {
        endpoint: `/games/${gameId}/wildling_cards/hide`,
        options: { method: 'PATCH' }
      }
    });
  };
}

export function moveWildlingCardToBottom(gameId) {
  return (dispatch) => {
    dispatch({
      type: `MOVE_WILDLING_CARD_TO_BOTTOM`,
      id: gameId,
      fetch: {
        endpoint: `/games/${gameId}/wildling_cards/move_to_bottom`,
        options: { method: 'PATCH' }
      }
    });
  };
}
