const default_state = {
  '1': {
    id: 1,
    attributes: {
      name: 'dragonstone',
      territory: 'dragonstone',
      x: 1372,
      y: 1732
    }
  },
  '2': {
    id: 2,
    attributes: {
      name: 'winterfell',
      territory: 'winterfell',
      x: 655,
      y: 518
    }
  },
  '3': {
    id: 3,
    attributes: {
      name: 'pyke',
      territory: 'pyke',
      x: 179,
      y: 1423
    }
  },
  '4': {
    id: 4,
    attributes: {
      name: 'highgarden',
      territory: 'highgarden',
      x: 246,
      y: 2131
    }
  },
  '5': {
    id: 5,
    attributes: {
      name: 'lannisport',
      territory: 'lannisport',
      x: 299,
      y: 1727
    }
  },
  '6': {
    id: 6,
    attributes: {
      name: 'sunspear',
      territory: 'sunspear',
      x: 1115,
      y: 2617
    }
  }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case 'MOVE_GARRISON_TOKEN':
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
