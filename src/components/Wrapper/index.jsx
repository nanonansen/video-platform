import React from "react";
import classNames from "classnames";

const Wrapper = props => {
    const { children, className } = props;
    return <div className={classNames("wrapper", className)}>{children}</div>;
};

export default Wrapper;
