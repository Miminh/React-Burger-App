import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inElement = null;
  let inputClasses = [classes.Element];
  if (props.invalid && props.necessary && props.notFirst) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inElement = (
        <input
          className={classes.Element}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.elementConfig.placeholder}</label>
      {inElement}
    </div>
  );
};

export default input;
