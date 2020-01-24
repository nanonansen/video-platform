import React, { useState } from "react";
import moment from "moment";

import Input from "../Input";
import Wrapper from "../Wrapper";

const AddYoutubeVideo = () => {
    const [searchValue, setSearchValue] = useState("r7wXvvxXTHI");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const ytAPIKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    const fetchVideo = videoID => {
        setIsLoading(true);
        const baseURL =
            "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=";
        let url = baseURL + videoID + "&key=" + ytAPIKey;
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Bad Response from Server");
                }
                return response.json();
            })
            .then(data => {
                console.log("data", data.items);
                setIsLoading(false);
                let videoObj = {
                    name: data.items[0].snippet.title,
                    description: data.items[0].snippet.description,
                    id: data.items[0].id,
                    duration: moment
                        .duration(data.items[0].contentDetails.duration)
                        .asMinutes(),
                    thumbnail: data.items[0].snippet.thumbnails.maxres.url,
                    date: data.items[0].snippet.publishedAt
                };
                console.log(videoObj);

                setData(videoObj);
            });
    };

    const handleInputChange = e => {
        setSearchValue(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        console.log("Submit");
        fetchVideo(searchValue);
    };
    if (isLoading) return <div>Is Loading...</div>;
    return (
        <Wrapper className="wrapper--small">
            <h1>Add Video</h1>

            <form action="submit" onSubmit={onSubmit}>
                <label>
                    Add Youtube ID:
                    <Input
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="Enter Youtube Video ID"
                    />
                </label>
            </form>
            <h2>Fetched Video:</h2>
            {data && (
                <div>
                    <h3>{data.name}</h3>
                    <img src={data.thumbnail} alt={data.name} />
                </div>
            )}
        </Wrapper>
    );
};

export default AddYoutubeVideo;
