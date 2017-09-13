const default_state = {
  1: {
		"id": 1,
		attributes: {
      game_id: 1,
      type: 'iron_throne',
      positions: ['baratheon', 'lannister', 'tyrell', 'stark', 'greyjoy', 'martell'],
    }
  },
  //2: {
		//"id": 2,
		//attributes: {
      //game_id: 1,
      //type: 'fiefdoms',
      //positions: ['greyjoy', 'martell', 'tyrell', 'stark', 'baratheon', 'lannister'],
    //}
  //},
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
