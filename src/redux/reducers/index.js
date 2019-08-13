import { combineReducers } from "redux";
import _ from "lodash";
import _inflection from "lodash-inflection";

import wildlingCards from "./wildling-cards";
_.mixin(_inflection);

const updateAttributes = (state, action) => {
  let id = action.id;
  if (!id) {
    return state;
  }
  return {
    ...state,
    [id]: {
      ...state[id],
      attributes: { ...state[id].attributes, ...action.attributes }
    }
  };
};

const combatReducer = () => {
  return (
    state = { attacker: null, defender: null, started: false },
    action
  ) => {
    switch (action.type) {
      case "UPDATE_COMBAT":
        const { choosenCard, started } = action;
        console.log("action", action);

        if (!choosenCard) {
          return {
            ...state,
            started
          };
        }

        if (state.attacker) {
          return {
            ...state,
            defender: {
              [choosenCard.id]: {
                attributes: { ...choosenCard }
              }
            }
          };
        }

        return {
          ...state,
          attacker: {
            [choosenCard.id]: {
              attributes: { ...choosenCard }
            }
          }
        };
      default:
        return state;
    }
  };
};

const pieceReducer = (type, collection) => {
  const piece = _.snakeCase(type).toUpperCase();
  const pieces = _.snakeCase(collection).toUpperCase();

  return (state = {}, action) => {
    switch (action.type) {
      case `FETCH_${piece}`:
        return { ...state, loading: true };

      case `FETCH_${piece}_SUCCESS`:
      case `BULK_UPDATE_${pieces}_SUCCESS`:
      case `LOAD_${pieces}`:
        return { ...state, ...action.data[type] };
      case `UPDATE_${piece}`:
      case `MOVE_${piece}`:
        return updateAttributes(state, action);

      case `MOVE_${piece}_SUCCESS`:
        console.log(
          "missing data node in payload! pieceReducer",
          `MOVE_${piece}_SUCCESS`,
          action.payload
        );
        return updateAttributes(state, action.payload);

      default:
        return state;
    }
  };
};

const dataTypes = [
  "game",
  "territory",
  "house",
  "unit",
  "order",
  "powerToken",
  "houseCard",
  "neutralForceToken",
  "garrisonToken",
  "influenceToken",
  "supplyToken",
  "victoryToken"
];

const reducers = {};

// This load all data types into redux store loading from fetch game response

reducers["combat"] = combatReducer();

dataTypes.forEach(type => {
  const collection = _.pluralize(type);
  reducers[collection] = pieceReducer(type, collection);
});

const current = (state = { gameId: null }, action) => {
  switch (action.type) {
    case "SET_CURRENT_GAME":
      return { ...state, gameId: action.id, house: action.house };
    default:
      return state;
  }
};

export default combineReducers({
  current,
  ...reducers,
  wildlingCards
});
