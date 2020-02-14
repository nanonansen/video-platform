import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";

import VideoList from "../VideoList";
import Wrapper from "../Wrapper";
import Text from "../Text";

import TagBar from "../TagBar";

const Home = ({ firebase }) => {
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        firebase
            .videos()
            .orderBy("date", "desc")
            .get()
            .then(querySnapshot => {
                let videos = [];
                querySnapshot.forEach(doc => {
                    console.log("READ");

                    videos.push(doc.data());
                });
                setData(videos);
            });
        firebase
            .tags()
            .get()
            .then(querySnapshot => {
                let tags = [];
                querySnapshot.forEach(doc => {
                    tags.push(doc.data());
                });
                setTags(tags);
            });
    }, [firebase]);

    useEffect(() => {}, [firebase]);

    return (
        <main className="page-home">
            <section className="hero-header">
                <Wrapper className="wrapper--medium">
                    <div className="hero-header__search">
                        <Text
                            className="hero-header__subtitle"
                            rank={3}
                            large
                            light
                        >
                            Browse our catalogue of more than{" "}
                            <span className="underline">75.000</span> Talks
                        </Text>
                        <Text
                            className="hero-header__title"
                            rank={1}
                            hero
                            light
                        >
                            Browse And Discover Your Next Favorite Talk Today.
                        </Text>
                    </div>
                </Wrapper>
            </section>
            <TagBar tags={tags} />
            <Wrapper>
                <VideoList data={data} />
            </Wrapper>
        </main>
    );
};

export default withFirebase(Home);
