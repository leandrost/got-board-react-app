const default_state = {
	"23": {
		"id": '23',
		"attributes": {
			'house': 'stark',
			'type': 'footman',
		}
  },
	'24': {
		'id': '24',
		'attributes': {
			'house': 'baratheon',
			'type': 'knight',
			'territory': 'bay_of_ice',
			'x': 799,
			'y': 238
		}
  }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case 'MOVE_UNIT':
      let id = action.id;
      if (!id) { return; }
      return {...state,
        [id]: {...state[id],
          attributes: { ...state[id].attributes, ...action.attributes }
        }
      };

    default:
      return state;
  }
}
