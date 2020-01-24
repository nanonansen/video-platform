import React from "react";
import classNames from "classnames";

const Input = props => {
    const {
        type,
        name,
        placeholder,
        autoComplete,
        className,
        onChange
    } = props;
    return (
        <input
            className={classNames("input", className)}
            type={type || "text"}
            name={name || ""}
            placeholder={placeholder || ""}
            autoComplete={autoComplete ? "true" : "not"}
            onChange={onChange}
        />
    );
};

export default Input;
