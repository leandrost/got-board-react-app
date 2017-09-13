const default_state = {
  2: {
    "id": 2,
    attributes: {
      game_id: 1,
      type: 'fiefdoms',
      positions: ['greyjoy', 'martell', 'tyrell', 'stark', 'baratheon', 'lannister'],
    }
  },
  //3: {
		//"id": 3,
		//attributes: {
      //game_id: 1,
      //type: 'kings_court',
      //positions: ['greyjoy', 'martell', 'tyrell', 'stark', 'baratheon', 'lannister'],
    //}
  //}
};

export default (state = default_state, action) => {
  switch (action.type) {

    default:
      return state;
  }
}
