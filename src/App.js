import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import Admin from "./components/Admin";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <main>
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={DashBoard}
                    />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </main>
            </Router>
        </AuthProvider>
    );
}

export default App;
