import React, { Component } from "react";
import TodoList from "../components/TodoList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as todosActions from "../modules/todos";

// todos, onToggle, onRemove 전달해야함.

class TodoListContainer extends Component {
  handleToggle = id => {
    // const index = state.todos.get('id')
    // TodosActions.toggle(index); 나는 id 안받고 이렇게 할 계획이었음..
    const { TodosActions } = this.props;
    TodosActions.toggle(id);
  };

  handleRemove = id => {
    const { TodosActions } = this.props;
    TodosActions.remove(id);
  };

  render() {
    const { todos } = this.props;
    const { handleToggle, handleRemove } = this;

    return (
      <div>
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </div>
    );
  }
}

export default connect(
  state => ({ todos: state.todos }),
  dispatch => ({
    TodosActions: bindActionCreators(todosActions, dispatch)
  })
)(TodoListContainer);
