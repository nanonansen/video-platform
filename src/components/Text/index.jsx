import React from "react";
import classNames from "classnames";

const Text = ({
    rank,
    children,
    light,
    bold,
    standard,
    hero,
    headline,
    subtitle,
    large,
    className
}) => {
    let Tag;
    if (rank) {
        Tag = rank > 6 ? "h6" : `h${rank}`;
    } else {
        Tag = "p";
    }
    let textClass = classNames(className, {
        "text--light": light,
        "text--standard": standard,
        "text--large": large,
        "text--headline": headline,
        "text--subtitle": subtitle,
        "text--hero": hero,
        "text--bold": bold
    });
    return <Tag className={textClass}>{children}</Tag>;
};

export default Text;
