import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

const TagBar = ({ tags }) => {
    const transformTag = tag => {
        return tag
            .toLowerCase()
            .split(" ")
            .join("_");
    };

    return (
        <section className="tag-bar">
            {tags.map((tag, index) => (
                <Link key={index} to={`/tag/${transformTag(tag.name)}`}>
                    <Button>{tag.name}</Button>
                </Link>
            ))}
        </section>
    );
};

export default TagBar;
