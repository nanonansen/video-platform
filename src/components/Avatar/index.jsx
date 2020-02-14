import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ imgUrl, id, name }) => {
    return (
        <div className="avatar">
            {imgUrl && <img className="avatar__image" src={imgUrl} alt="" />}
            <Link className="avatar__name" to={`/conference/${id}`}>
                {name}
            </Link>
        </div>
    );
};

export default Avatar;
