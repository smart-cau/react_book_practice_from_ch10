import * as types from "../actions/ActionTypes";

const initialState = {
  counters: [
    {
      number: 0,
      color: "black"
    }
  ]
};

// 여기서 action param은 대체 어디서, 어떻게, 무엇이 들어오는지 모르겠다.
function counter(state = initialState, action) {
  const { counters } = state;

  switch (action.type) {
    case types.CREATE:
      return {
        counters: [
          ...counters,
          {
            number: 0,
            color: action.color
          }
        ]
      };

    case types.REMOVE:
      return {
        counters: counters.slice(0, counters.length - 1)
      };

    case types.INCREMENT:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            number: counters[action.index].number + 1
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };

    case types.DECREMENT:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            number: counters[action.index].number - 1
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };

    case types.SET_COLOR:
      return {
        counters: [
          ...counters.slice(0, action.index),
          {
            ...counters[action.index],
            color: action.color
          },
          ...counters.slice(action.index + 1, counters.length)
        ]
      };

    default:
      return state;
  }
}

export default counter;
