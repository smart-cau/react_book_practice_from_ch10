import React, { Component } from "react";
import PageTemplate from "./PageTemplate";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

class App extends Component {
  // TodoInput이 받는 props = value, onChange, onInsert
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

  // 여기 이해 필요
  id = 0;
  getId = () => {
    return ++this.id;
  };
  //

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

  render() {
    const { input, todos } = this.state;
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;

    return (
      <div>
        <PageTemplate>
          <TodoInput
            value={input}
            onChange={handleChange}
            onInsert={handleInsert}
          />
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        </PageTemplate>
      </div>
    );
  }
}

export default App;
