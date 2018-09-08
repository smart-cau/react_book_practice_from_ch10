import React from "react";
import propTypes from "prop-types";

import "./Buttons.css";

const Buttons = ({ onCreate, onRemove }) => {
  return (
    <div className="Buttons">
      <div className="btn add" onClick={onCreate}>
        생성
      </div>
      <div className="btn remove" onClick={onRemove}>
        제거
      </div>
    </div>
  );
};

Buttons.propTypes = {
  onCreate: propTypes.func,
  onRemove: propTypes.func
};

Buttons.defaultProps = {
  onCreate: () => console.warn("onCreate not defined"),
  onRemove: () => console.warn("onRemove not defined")
};

export default Buttons;
