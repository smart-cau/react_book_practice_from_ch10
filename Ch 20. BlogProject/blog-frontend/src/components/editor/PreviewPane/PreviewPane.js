import React from "react";
import styles from "./PreviewPane.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PreviewPane = () => (
  <div className={cx("preview-pane")}>
    <h1 className={cx("title")}>Title</h1>
    <div>Content</div>
  </div>
);

export default PreviewPane;
