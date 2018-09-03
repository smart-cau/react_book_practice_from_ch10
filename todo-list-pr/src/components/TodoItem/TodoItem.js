import React, { Component } from "react";
import styles from "./TodoItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class TodoItem extends Component {
  render() {
    // TodoList.js에서 아래의 props들을 받음.
    const { done, children, onToggle, onRemove } = this.props;
    return (
      <div className={cx("todo-item")} onClick={onToggle}>
        <input type="checkbox" className={cx("tick")} checked={done} readOnly />
        <div className={cx("text", { done })}>{children}</div>
        <div
          className={cx("delete")}
          onClick={e => {
            onRemove();
            e.stopPropagation();
          }}
        >
          [지우기]
        </div>
      </div>
    );
  }
}

export default TodoItem;
