import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../base";

const DashBoard = () => {
    const [videoData, setVideoData] = useState([]);
    useEffect(() => {
        console.log("useEffect");

        const unsubscribe = db
            .collection("videos")
            .onSnapshot(querySnapshot => {
                if (querySnapshot.size) {
                    let videos = [];
                    querySnapshot.forEach(doc => {
                        console.log(doc.data());
                        videos.push({
                            ...doc.data(),
                            uid: doc.ref.id
                        });
                    });
                    setVideoData(videos);
                } else {
                    //It's empty
                }
            });
        return () => {
            unsubscribe();
        };
    }, []);
    // useEffect(() => {
    //     db.collection("videos")
    //         .get()
    //         .then(querySnapshot => {
    //             let newVideoData = [];
    //             querySnapshot.forEach(doc => {
    //                 console.log(doc);
    //                 newVideoData.push({
    //                     title: doc.data().title,
    //                     date: doc.data().date,
    //                     likes: doc.data().likes,
    //                     id: doc.ref.id
    //                 });
    //             });
    //             setVideoData(newVideoData);
    //         });
    // }, []);
    const handleAddLike = (id, currentLikes, uid) => {
        db.collection("videos")
            .doc(id)
            .update({
                likes: currentLikes + 1
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        //db.collection("users")
    };
    return (
        <div>
            <h1>This is the secret Dashboard</h1>
            <Link to="/admin">Admin</Link>
            <hr />
            <h2>All Videos</h2>
            {videoData.map(video => (
                <div key={video.uid}>
                    <h3>{video.name}</h3>
                    <button
                        onClick={() => handleAddLike(video.id, video.likes)}
                    >
                        Likes: {video.likes}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DashBoard;
