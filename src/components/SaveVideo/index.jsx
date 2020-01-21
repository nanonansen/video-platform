import React from "react";
import { withFirebase } from "../Firebase";

import Button from "../Button";

const SaveVideo = ({ isSaved, handleSave, handleRemove, saveCount }) => {
    if (isSaved)
        return (
            <Button onClick={handleRemove} className={"button--disabled"}>
                Remove - {saveCount}
            </Button>
        );
    return (
        <Button onClick={handleSave} className={"button--primary"}>
            Save - {saveCount}
        </Button>
    );
};

export default withFirebase(SaveVideo);
