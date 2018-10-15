import React from "react";
import styles from "./Button.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const Button = ({ children, to, onClick, disabled, theme = "default" }) => {
  // 'to' props가 존재하고, disabled=false이면 Link를 사용, 둘중 하나라도 그렇지 않으면 위의 Div 사용.
  const Element = to && !disabled ? Link : Div;

  return (
    // 이 <Element>가 조건에 따라 <Link>가 될수도, <div>가 될 수도 있다.
    // theme에 따라서 버튼의 스타일링이 바뀐다.
    <Element
      to={to}
      className={cx("button", theme, { disabled })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </Element>
  );
};

export default Button;
