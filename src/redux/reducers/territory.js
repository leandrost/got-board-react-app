export default (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TERRITORIES':
      return  action.payload.territories;

    default:
      return state;
  }
}
