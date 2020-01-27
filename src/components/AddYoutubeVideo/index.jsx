import React, { useState } from "react";

import useFetch from "../../useFetch";
import Input from "../Input";
import Button from "../Button";
import Wrapper from "../Wrapper";

import AddNewVideoForm from "../AddNewVideoForm";

const AddYoutubeVideo = () => {
    const [searchValue, setSearchValue] = useState("");
    const [{ data, isLoading, isError }, setUrl] = useFetch();

    const ytAPIKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    const handleInputChange = e => {
        setSearchValue(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        console.log("Submit");

        const baseURL =
            "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=";
        let url = baseURL + searchValue + "&key=" + ytAPIKey;

        setUrl(url);
    };
    console.log("Component Render");
    console.log("isError", isError);

    return (
        <Wrapper className="wrapper--small">
            <form onSubmit={onSubmit}>
                <label>
                    Add Youtube ID:
                    <Input
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder="Enter Youtube Video ID"
                    />
                </label>
                <Button
                    disabled={searchValue.length >= 1 ? false : true}
                    type={"submit"}
                    className="button--primary"
                >
                    Search
                </Button>
                {isError && <div>Error: {isError}</div>}
            </form>

            {isLoading ? null : (
                <>
                    <h2>Fetched Video:</h2>
                    <AddNewVideoForm data={data.video} />
                </>
            )}
        </Wrapper>
    );
};

export default AddYoutubeVideo;
