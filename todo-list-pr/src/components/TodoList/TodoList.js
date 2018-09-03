import React, { Component } from "react";
import TodoItem from "../TodoItem";

class TodoList extends Component {
  render() {
    // App.js에서 아래의 props들을 받음.
    const { todos, onToggle, onRemove } = this.props;
    const todoList = todos.map(element => (
      <TodoItem
        key={element.id}
        done={element.done}
        onToggle={() => onToggle(element.id)}
        onRemove={() => onRemove(element.id)}
      >
        {element.text}
      </TodoItem>
    ));

    return <div>{todoList}</div>;
  }
}

export default TodoList;
