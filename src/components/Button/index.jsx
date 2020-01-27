import React from "react";
import classNames from "classnames";

const Button = props => {
    const { type, children, className, onClick, disabled } = props;
    return (
        <button
            className={classNames(
                "button",
                { "is-disabled": disabled },
                className
            )}
            type={type || null}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
