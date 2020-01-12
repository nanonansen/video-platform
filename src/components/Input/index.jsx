import React from "react";

const Input = props => {
    const { type, name, id, placeholder, autoComplete, className } = props;
    return (
        <input
            className={className}
            type={type || "text"}
            name={name || ""}
            id={id || ""}
            placeholder={placeholder || ""}
            autoComplete={autoComplete ? "true" : "not"}
        />
    );
};

export default Input;
