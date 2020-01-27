import React, { useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import Select from "react-select";
import { withFirebase } from "../Firebase";

const AddNewVideoForm = ({ data, firebase }) => {
    const [formData, setFormData] = useState();
    const [tags, setTags] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [speakers, setSpeakers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedConference, setSelectedConference] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [showAddSpeakerForm, setShowAddSpeakerForm] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    // COMPONENT DID MOUNT
    useEffect(() => {
        const getSpeakers = () => {
            var unsubscribe = firebase.speakers().onSnapshot(querySnapshot => {
                let speakers = [];
                querySnapshot.forEach(speaker => {
                    speakers.push({
                        value: speaker.data().name,
                        label: speaker.data().name,
                        uid: speaker.data().uid
                    });
                });
                setSpeakers(speakers);
                setIsLoading(false);
            });

            return () => {
                unsubscribe();
                console.log("Unsubscribe");
            };
        };
        const getConferences = () => {
            firebase
                .conferences()
                .get()
                .then(querySnapshot => {
                    let conferences = [];
                    querySnapshot.forEach(conference => {
                        conferences.push({
                            value: conference.data().name,
                            label: conference.data().name,
                            uid: conference.data().uid,
                            profileImage: conference.data().profileImage
                        });
                    });
                    setConferences(conferences);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        const getTags = () => {
            firebase
                .tags()
                .get()
                .then(querySnapshot => {
                    let tags = [];
                    querySnapshot.forEach(tag => {
                        tags.push({
                            value: tag.data().name,
                            label: tag.data().name,
                            uid: tag.data().uid
                        });
                    });
                    setTags(tags);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                });
        };

        setFormData({ ...data });
        getSpeakers();
        getTags();
        getConferences();
    }, [data, firebase]);

    // ONCHANGE EVENTS
    const handleInputChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleConferenceChange = selectedOption => {
        setSelectedConference(selectedOption);
    };
    const handleTagChange = selectedOption => {
        setSelectedTag(selectedOption);
    };
    const handleSpeakerChange = selectedOption => {
        setSelectedSpeaker([selectedOption]);
    };
    const handleShowSpeakerForm = e => {
        e.preventDefault();
        setShowAddSpeakerForm(!showAddSpeakerForm);
    };

    const addNewSpeaker = (event, speaker) => {
        event.preventDefault();
        let newSpeakerRef = firebase.speakers().doc();
        let newSpeaker = { name: speaker, uid: newSpeakerRef.id };
        firebase
            .speakers()
            .doc(newSpeakerRef.id)
            .set(newSpeaker)
            .then(() => {
                console.log("Added new Speaker");
                setShowAddSpeakerForm(false);
                setSelectedSpeaker([
                    {
                        value: newSpeaker.name,
                        label: newSpeaker.name,
                        uid: newSpeaker.uid
                    }
                ]);
            });
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log("SUBMIT FORM");
        doAddVideoToCollection();
    };

    useEffect(() => {
        const checkSubmitStatus = () => {
            if (
                selectedTag !== null &&
                selectedSpeaker !== null &&
                selectedConference !== null
            ) {
                console.log("Ready To Submit");
                setReadyToSubmit(true);
            }
        };
        checkSubmitStatus();
    }, [selectedSpeaker, selectedTag, selectedConference]);

    const doAddVideoToCollection = () => {
        let newVideoRef = firebase.videos().doc();

        let confRef = firebase.conferences().doc(selectedConference.uid);
        let speakerRef = firebase.speakers().doc(selectedSpeaker[0].uid);

        const transformSpeaker = arr => {
            let newObj = [];
            arr.map(el =>
                newObj.push({
                    name: el.value,
                    uid: el.uid
                })
            );
            return newObj;
        };
        const transformTags = arr => {
            let newTags = [];
            arr.map(el => newTags.push(el.value));
            return newTags;
        };

        let speaker = transformSpeaker(selectedSpeaker);
        const newVideoData = {
            ...formData,
            date: Date.now(),
            saveCount: 0,
            uid: newVideoRef.id,
            users: [],
            conference: {
                name: selectedConference.value,
                uid: selectedConference.uid,
                profileImage: ""
            },
            tags: transformTags(selectedTag),
            speaker: speaker
        };

        const newVideoForRef = {
            title: formData.title,
            uid: newVideoRef.id,
            thumbnail: formData.thumbnail
        };

        console.log("newVideoData", newVideoData);
        console.log("newVideoForRef", newVideoForRef);

        let batch = firebase.db.batch();

        // Add new Video to Videos Collection
        batch.set(newVideoRef, newVideoData);

        //Add Video to existing Speaker Docu
        batch.update(speakerRef, {
            videos: firebase.fieldValue.arrayUnion(newVideoForRef)
        });
        //Push new Video to Conference Doc
        batch.update(confRef, {
            videos: firebase.fieldValue.arrayUnion(newVideoForRef)
        });

        // Commit the batch
        batch.commit().then(() => {
            console.log("Success");
        });
    };

    if (isLoading) return <div>Is Loading</div>;
    return (
        <div>
            <h2>Update Data</h2>
            <form>
                {Object.keys(formData).map((input, index) => (
                    <Input
                        value={formData[input]}
                        name={input}
                        label={input}
                        onChange={handleInputChange}
                        key={index}
                    />
                ))}
                <hr />
                <div>
                    <label>Select Speaker:</label>
                    {!showAddSpeakerForm && (
                        <Select
                            value={selectedSpeaker}
                            onChange={handleSpeakerChange}
                            options={speakers}
                        />
                    )}
                    <Button onClick={handleShowSpeakerForm}>
                        Add New Speaker
                    </Button>
                    {showAddSpeakerForm && (
                        <AddSpeakerForm addNewSpeaker={addNewSpeaker} />
                    )}
                </div>
                <div>
                    <label>Select Conference:</label>
                    <Select
                        value={selectedConference}
                        onChange={handleConferenceChange}
                        options={conferences}
                    />
                    <Button>Add New Conference</Button>
                </div>
                <label>Select Tags:</label>
                <Select
                    value={selectedTag}
                    onChange={handleTagChange}
                    options={tags}
                    isMulti={true}
                />
                <Button
                    onClick={onSubmit}
                    type={"submit"}
                    className={"button--primary"}
                    disabled={!readyToSubmit}
                >
                    Submit Video
                </Button>
            </form>
        </div>
    );
};

export default withFirebase(AddNewVideoForm);

const AddSpeakerForm = ({ addNewSpeaker }) => {
    const [speaker, setSpeaker] = useState("");
    return (
        <div>
            <Input
                label="Speaker"
                value={speaker}
                onChange={e => setSpeaker(e.target.value)}
            />
            <Button onClick={event => addNewSpeaker(event, speaker)}>
                Save Speaker
            </Button>
        </div>
    );
};
