import React from "react";

const Wrapper = props => {
    const { children, className } = props;
    return <div className={className}>{children}</div>;
};

export default Wrapper;
