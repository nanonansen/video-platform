import React from "react";

const Text = ({ rank = 2, type, children }) => {
    console.log(type);

    let Tag;
    switch (type) {
        case "standard":
            Tag = "p";
            return <Tag className={`text-${type}`}>{children}</Tag>;
        case "large":
            Tag = "p";
            return <Tag className={`text-${type}`}>{children}</Tag>;
        case "headline":
            Tag = rank > 6 ? "h6" : `h${rank}`;
            return <Tag className={`text-${type}`}>{children}</Tag>;
        case "subtitle":
            Tag = rank > 6 ? "h6" : `h${rank}`;
            return <Tag className={`text-${type}`}>{children}</Tag>;
        case "hero":
            Tag = rank > 6 ? "h6" : `h${rank}`;
            return <Tag className={`text-${type}`}>{children}</Tag>;
        default:
            Tag = "p";
            return <Tag className={`text-standard`}>{children}</Tag>;
    }
};

export default Text;
