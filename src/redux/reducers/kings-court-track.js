const default_state = {
  3: {
    "id": 3,
    attributes: {
      game_id: 1,
      type: 'kings_court',
      positions: ['greyjoy', 'martell', 'tyrell', 'stark', 'baratheon', 'lannister'],
    }
  }
};

export default (state = default_state, action) => {
  switch (action.type) {

    default:
      return state;
  }
}
