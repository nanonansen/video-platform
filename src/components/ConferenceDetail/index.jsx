import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";

import Wrapper from "../Wrapper";
import VideoListItem from "../VideoListItem";
import Text from "../Text";
import Button from "../Button";

const ConferenceDetail = ({ firebase, data }) => {
    const [conferenceData, setConferenceData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let { uid } = useParams();
    useEffect(() => {
        firebase
            .conferences()
            .where("uid", "==", uid)
            .get()
            .then(querySnapshot => {
                let conferenceData = {};
                querySnapshot.forEach(conference => {
                    conferenceData.name = conference.data().name;
                    conferenceData.description = conference.data().description;
                    conferenceData.videos = conference.data().videos;
                    conferenceData.profileImage = conference.data().profileImage;
                });

                setConferenceData(conferenceData);
                setIsLoading(false);
            });
    }, [firebase, uid]);

    if (isLoading) return <div>Is Loading...</div>;
    return (
        <main className="page-conference">
            <section className="hero-header hero-header--medium">
                <Wrapper medium>
                    <div className="hero-header__content">
                        {conferenceData.profileImage && (
                            <figure className="hero-header__image">
                                <img src={conferenceData.profileImage} alt="" />
                            </figure>
                        )}

                        <Text rank={1} headline light>
                            {conferenceData.name}
                        </Text>
                        <Text light>{conferenceData.description}</Text>
                        <div className="button-group">
                            <Button medium light>
                                Follow
                            </Button>
                            <Button medium light>
                                Website
                            </Button>
                        </div>
                    </div>
                </Wrapper>
            </section>
            <section className="content">
                <Wrapper>
                    {conferenceData && (
                        <section className="conference__videos">
                            <Text rank={2} subtitle>
                                All Videos
                            </Text>
                            <div className="auto-grid">
                                {conferenceData.videos.map(video => (
                                    <VideoListItem
                                        data={video}
                                        key={video.uid}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </Wrapper>
            </section>
        </main>
    );
};

export default withFirebase(ConferenceDetail);
