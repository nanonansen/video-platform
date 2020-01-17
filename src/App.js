import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";

import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import Admin from "./components/Admin";
import VideoDetail from "./components/VideoDetail";
import ConferenceDetail from "./components/ConferenceDetail";

function App() {
    return (
        <Router>
            <Header />
            <main>
                {/* <PrivateRoute
                        exact
                        path="/dashboard"
                        component={DashBoard}
                    />
                    <PrivateRoute exact path="/admin" component={Admin} />
                */}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/video/:id" component={VideoDetail} />
                <Route
                    exact
                    path="/conference/:id"
                    component={ConferenceDetail}
                />
            </main>
        </Router>
    );
}

export default App;
