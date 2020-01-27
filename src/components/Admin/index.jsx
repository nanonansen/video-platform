import React from "react";

import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div>
            <Wrapper>
                <Link to={"/admin/add_youtubeVideo"}>Add Video</Link>
                <Link to={"/admin/add_conference"}>Add Conference</Link>
            </Wrapper>
        </div>
    );
};

export default Admin;
