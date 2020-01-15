import React from "react";

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
            className={className}
            type={type || "text"}
            name={name || ""}
            placeholder={placeholder || ""}
            autoComplete={autoComplete ? "true" : "not"}
            onChange={onChange}
        />
    );
};

export default Input;
