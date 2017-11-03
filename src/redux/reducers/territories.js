export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TERRITORIES':
      return  action.data.gameTerritories || state;
    default:
      return state;
  }
}
