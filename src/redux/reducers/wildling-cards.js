export default (state = {}, action) => {
  switch (action.type) {
    case 'DRAW_WILDLING_CARD':
    case 'PEEK_WILDLING_CARD':
      return state;
    case 'DRAW_WILDLING_CARD_SUCCESS':
    case 'PEEK_WILDLING_CARD_SUCCESS':
      return action.payload.data || state;
    case 'HIDE_WILDLING_CARD':
    case 'MOVE_WILDLING_CARD_TO_BOTTOM':
      return {};
    default:
      return state;
  }
}
