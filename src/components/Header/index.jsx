import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

import Input from "../Input";
import Icon from "../Icon";
import Button from "../Button";
import { useState } from "react";

const Header = ({ firebase }) => {
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    const handleSignOut = () => {
        firebase.doSignOut();
    };
    if (currentUser) {
        return (
            <header className="site-header loggedIn">
                <div className="site-header__branding">
                    <Link to="/">Mubi</Link>
                </div>
                {/* <div className="site-header__search">
                    <Input
                        className="input"
                        placeholder="Search for topics and speakers"
                    />
                </div> */}
                <nav className="site-header__navigation">
                    <div className="site-header__menu">
                        <Button onClick={() => setShowMenu(!showMenu)}>
                            <Icon name="menu" color={"#ffffff"} />
                        </Button>
                        <div
                            className={
                                showMenu ? "submenu is-active" : "submenu"
                            }
                        >
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/admin">Admin</Link>
                            <button className="button" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                    <div className="site-header__search">
                        <Button>
                            <Icon name="search" color={"#ffffff"} />
                        </Button>
                    </div>
                    <div className="site-header__avatar">
                        <img
                            src={
                                currentUser &&
                                currentUser.providerData[0].photoURL
                            }
                            alt=""
                        />
                    </div>
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
