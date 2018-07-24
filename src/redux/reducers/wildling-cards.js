export default (state = {}, action) => {
  switch (action.type) {
    case 'REVEAL_WILDLING_CARD':
      return  {...state, loading: true };
    case 'REVEAL_WILDLING_CARD_SUCCESS':
      return { 42: { id: 42, attributes: { name: "silence_at_the_wall" } } } || state;
    case 'UNREVEAL_WILDLING_CARD_SUCCESS':
      return {};
    default:
      return state;
  }
}
