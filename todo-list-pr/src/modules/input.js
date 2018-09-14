/*
  state = {
    input: "",
    todos: []
  };

  handleChange = e => {
    const { value } = e.target;

    this.setState({
      input: value
    });
  };
수정할 것.
*/

import { Map } from "immutable";
import { createAction, handleActions } from "redux-actions";

const SET_INPUT = "input/SET_INPUT";

export const setInput = createAction(SET_INPUT);

const initialState = Map({
  value: ""
});

export default handleActions(
  {
    [SET_INPUT]: (state, action) => state.set("value", action.payload)
  },
  initialState
);
