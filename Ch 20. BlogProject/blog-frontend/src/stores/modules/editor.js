// 제목(title), 내용(markdown), 태그(tags) 상태관리.
import { createAction, handleActions } from "redux-actions";

import { Map } from "immutable";
import { pender } from "redux-pender";

// Action Types
const INITIALIZE = "editor/INITIALIZE";
const CHANGE_INPUT = "editor/CHANGE_INPUT";

// Action Creators
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);

// initialState
const initialState = Map({
  title: "",
  markdown: "",
  tags: ""
});

// Reducer
export default handleActions(
  {
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      // name이라는 key의 값을 value로 바꾸겠다는거 아님? 근데 name이라는 key가 없는데??
      // --> name은 해당 필드의 key 값을, value는 그에 해당하는 값을 담고 있다.
      // --> 즉, 해당 name(title, markdow, tags)에 맞는 값(value)를 넣어주게 되는 것이다.
      // --> 이 방법도 기억!! 중요!! ㅈㄴ신기하다 딱 2개를 action에서 받음으로 모든 state를 수정할 수 있다니..
      return state.set(name, value);
    }
  },
  initialState
);
