import React from "react";
import classNames from "classnames";

const Input = props => {
    const {
        type,
        name,
        placeholder,
        autoComplete,
        className,
        onChange,
        value,
        label
    } = props;
    return (
        <label>
            {label}

            <input
                className={classNames("input", className)}
                type={type || "text"}
                name={name || ""}
                placeholder={placeholder || ""}
                autoComplete={autoComplete ? "true" : "not"}
                onChange={onChange}
                value={value}
            />
        </label>
    );
};

export default Input;
