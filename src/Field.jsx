import React from "react";

const Field = props => {
  const { type, labelText, id, max, min, step, name, value, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor={id} style={{ fontSize: "30px" }}>
        {labelText}
      </label>
      <input
        type={type}
        className="form-control-range"
        id={id}
        max={max}
        min={min}
        name={name}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default Field;
