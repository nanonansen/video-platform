import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import DashBoard from "../DashBoard";

import PrivateRoute from "../../PrivateRoute";
import Header from "../Header";
import Admin from "../Admin";
import VideoDetail from "../VideoDetail";
import ConferenceDetail from "../ConferenceDetail";
import AddVideo from "../AddVideo";
import AddConference from "../AddConference";
import SpeakerDetail from "../SpeakerDetail";
import TagDetail from "../TagDetail";
import AddYoutubeVideo from "../AddYoutubeVideo";
import Styleguide from "../Styleguide";

function App() {
    return (
        <Router>
            <Header />
            <main>
                <PrivateRoute exact path="/dashboard" component={DashBoard} />
                <PrivateRoute exact path="/admin" component={Admin} />

                <Route exact path="/" component={Home} />
                <Route exact path="/styleguide" component={Styleguide} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/video/:id" component={VideoDetail} />
                <Route
                    exact
                    path="/conference/:uid"
                    component={ConferenceDetail}
                />
                <Route exact path="/speaker/:uid" component={SpeakerDetail} />
                <Route exact path="/tag/:uid" component={TagDetail} />
                <Route exact path={"/admin/add_video"} component={AddVideo} />
                <Route
                    exact
                    path={"/admin/add_youtubeVideo"}
                    component={AddYoutubeVideo}
                />
                <Route
                    exact
                    path={"/admin/add_conference"}
                    component={AddConference}
                />
            </main>
        </Router>
    );
}

export default App;
