import React from "react";
import classNames from "classnames";

const Button = props => {
    const { type, children, className, onClick } = props;
    return (
        <button
            className={classNames("button", className)}
            type={type || null}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
