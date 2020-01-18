import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

import Input from "../Input";

const Header = ({ firebase }) => {
    const { currentUser } = useContext(AuthContext);
    const handleSignOut = () => {
        firebase.doSignOut();
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
                    <Link to="/admin">Admin</Link>
                    <button className="button" onClick={handleSignOut}>
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
                    <Link to="/login">
                        <button className="button">Login</button>
                    </Link>
                    <Link to="/signup">
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

export default withFirebase(Header);
