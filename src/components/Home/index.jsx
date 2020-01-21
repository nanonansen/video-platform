import React, { useEffect, useState, useContext } from "react";
import VideoList from "../VideoList";
import Wrapper from "../Wrapper";

import { StoreContext } from "../../GlobalStore";

const Home = () => {
    const [videos, setVideos] = useState([]);
    const { globalStore } = useContext(StoreContext);

    useEffect(() => {
        if (globalStore) {
            setVideos(globalStore);
        }
    }, [globalStore]);
    return (
        <Wrapper>
            <h1>Home Component</h1>
            <VideoList data={videos} />
        </Wrapper>
    );
};

export default Home;
