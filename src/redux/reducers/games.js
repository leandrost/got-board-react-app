export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_GAME':
      return  {...state, loading: true };

    case 'FETCH_GAME_SUCCESS':
      action = mockGame(action);
      return action.payload.games || state;

    default:
      return state;
  }
}

function mockGame(action) {
  const attrs = {
    influnce_tracks: {
      iron_throne: ['baratheon', 'lannister', 'tyrell', 'stark', 'greyjoy', 'martell'],
      fiefdoms: ['greyjoy', 'martell', 'tyrell', 'stark', 'baratheon', 'lannister'],
      kings_court: ['lannister', 'tyrell', 'stark', 'baratheon', 'greyjoy', 'martell'],
    }
  };
  let game1 = action.payload.games['1'];
  game1.attributes = { ...game1, attributes: attrs };
  console.log(action.payload.games['1'].attributes);
  return action;
}
