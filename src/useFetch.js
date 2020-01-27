import { useState, useEffect } from "react";
import moment from "moment";

const useFetch = () => {
    const [data, setData] = useState({ video: {} });
    const [url, setUrl] = useState("");
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("useFetch");
        const fetchData = async () => {
            setIsLoading(true);
            function handleErrors(response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response;
            }
            fetch(url)
                .then(handleErrors)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { snippet, contentDetails, id } = data.items[0];

                    let foundVideo = {
                        title: snippet.title,
                        description: snippet.description,
                        id: id,
                        videoUrl: "https://www.youtube.com/watch?v=" + id,
                        duration: moment
                            .duration(contentDetails.duration)
                            .asMinutes(),
                        thumbnail: snippet.thumbnails.maxres.url,
                        date: snippet.publishedAt
                    };

                    setData({ video: foundVideo });
                    setIsLoading(false);
                    setIsError(null);
                })
                .catch(error => {
                    console.log("ERROS MSG", error.message);
                    setIsError("Please enter a valid video ID");
                });
        };

        if (url.length) {
            fetchData();
        }
    }, [url]);
    return [{ data, isLoading, isError }, setUrl];
};

export default useFetch;
