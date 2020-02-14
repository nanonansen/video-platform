import React from "react";
import classNames from "classnames";

const Wrapper = props => {
    const { children, medium, small } = props;
    return (
        <div
            className={classNames("wrapper", {
                "wrapper--medium": medium,
                "wrapper--small": small
            })}
        >
            {children}
        </div>
    );
};

export default Wrapper;
