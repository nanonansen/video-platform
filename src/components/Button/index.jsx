import React from "react";
import classNames from "classnames";

const Button = props => {
    const {
        type,
        children,
        className,
        onClick,
        disabled,
        primary,
        large,
        medium,
        small,
        outline,
        light
    } = props;
    return (
        <button
            className={classNames(
                "button",
                {
                    "is-disabled": disabled,
                    "button--primary": primary,
                    "button--large": large,
                    "button--medium": medium,
                    "button--small": small,
                    "button--outline": outline,
                    "button--light": light
                },
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
