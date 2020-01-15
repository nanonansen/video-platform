import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import VideoList from "../VideoList";
import Wrapper from "../Wrapper";

const DashBoard = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <Wrapper>
            <h1 className="fs-xl">
                Hello,
                {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}{" "}
                ({currentUser.role})
            </h1>
            <VideoList />
        </Wrapper>
    );
};

export default DashBoard;
