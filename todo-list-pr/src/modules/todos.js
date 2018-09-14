/*
  
  handleInsert = () => {
    const { todos, input } = this.state;

    const newTodo = {
      id: this.getId(),
      text: input,
      done: false
    };

    this.setState({
      todos: [...todos, newTodo],
      input: ""
    });
  };

  // 여기 id는 인수로 전달 받은 id.
  handleToggle = id => {
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);

    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  };

  handleRemove = id => {
    const { todos } = this.state;

    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)]
    });
  };
*/

import { Map, List } from "immutable";
import { handleActions, createAction } from "redux-actions";

const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

const initialState = List([
  Map({
    id: 0,
    text: "고구마 먹기",
    done: true
  }),
  Map({
    id: 1,
    text: "닭가슴살 먹기",
    done: false
  })
]);

export default handleActions(
  {
    [INSERT]: (state, action) => {
      const { id, text, done } = action.payload;

      return state.push(
        Map({
          id,
          text,
          done
        })
      );
    },

    [TOGGLE]: (state, action) => {
      // const index = action.payload;
      const id = action.payload;
      const index = state.findIndex(todo => todo.get("id") === id);

      return state.updateIn([index, "done"], done => !done);
    },

    [REMOVE]: (state, action) => {
      // const index = action.payload;
      const id = action.payload;
      const index = state.findIndex(todo => todo.get("id") === id);

      return state.delete(index);
    }
  },
  initialState
);
