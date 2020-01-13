import React from "react";
import AddVideo from "../AddVideo";
import AddConference from "../AddConference";
import Wrapper from "../Wrapper";

const Admin = () => {
    return (
        <div>
            <Wrapper className="wrapper wrapper--small">
                <AddVideo />
                <AddConference />
            </Wrapper>
        </div>
    );
};

export default Admin;
