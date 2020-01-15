import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";
import app from "../../base";

import Input from "../Input";

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const doSignOut = () => {
        app.auth()
            .signOut()
            .then(() => {
                console.log("sign out");
            })
            .catch(error => {
                console.log(error);
            });
    };
    if (currentUser) {
        return (
            <header className="site-header loggedIn">
                <div className="site-header__branding">
                    <Link to="/">Logo</Link>
                </div>
                <div className="site-header__search">
                    <Input
                        className="input"
                        placeholder="Search for topics and speakers"
                    />
                </div>
                <nav className="site-header__navigation">
                    {currentUser.role === "Admin" && (
                        <Link to="/admin">Admin</Link>
                    )}
                    <Link to="/dashboard">Dashboard</Link>
                    <button className="button" onClick={doSignOut}>
                        Sign Out
                    </button>
                </nav>
            </header>
        );
    } else {
        return (
            <header className="site-header">
                <div className="site-header__branding">
                    <Link to="/">Logo</Link>
                </div>
                <div className="site-header__search">
                    <Input
                        className="input"
                        placeholder="Search for topics and speakers"
                    />
                </div>
                <nav className="site-header__navigation">
                    <Link to="Login">
                        <button className="button">Login</button>
                    </Link>
                    <Link to="Signup">
                        <button
                            className="button button--primary
                        "
                        >
                            Sign Up
                        </button>
                    </Link>
                </nav>
            </header>
        );
    }
};

export default Header;
