import React, { Component } from "react";
import PageTemplate from "./PageTemplate";
import TodoInputContainer from "../containers/TodoInputContainer";
import TodoListContainer from "../containers/TodoListContainer";

class App extends Component {
  render() {
    return (
      <div>
        <PageTemplate>
          <TodoInputContainer />
          <TodoListContainer />
        </PageTemplate>
      </div>
    );
  }
}

export default App;
