export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TERRITORIES':
      return  action.payload.gameTerritories || state;
    default:
      return state;
  }
}