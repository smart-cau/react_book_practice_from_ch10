import React from "react";
import styles from "./PostList.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const PostItem = () => {
  return (
    <div className={cx("post-item")}>
      <h2>
        <a>Title</a>
      </h2>
      <div className={cx("date")}>2018-10-17</div>
      <p>Content</p>
      <div className={cx("tags")}>
        <a>#태그</a>
        <a>#태그</a>
        <a>#태그</a>
      </div>
    </div>
  );
};
// 이런 방법 기억해두기!
const PostList = () => (
  <div className={cx("post-list")}>
    <PostItem />
    <PostItem />
    <PostItem />
    <PostItem />
  </div>
);

export default PostList;
