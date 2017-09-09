const default_state = {
	"23": {
		"id": '23',
		"attributes": {
			'house': 'stark',
			'type': 'footman',
			'place': 'war_room'
		}
  },
	'24': {
		'id': '24',
		'attributes': {
			'house': 'baratheon',
			'type': 'knight',
			'place': 'bay_of_ice',
			'x': 799,
			'y': 238
		}
  }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case 'FIND_UNITS':
			console.log(state);
      return  state;
    default:
      return state;
  }
}
