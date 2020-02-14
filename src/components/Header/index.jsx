import React, { useContext } from "react";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";

import Icon from "../Icon";
import Button from "../Button";
import { useState } from "react";
import Wrapper from "../Wrapper";

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
                <Wrapper>
                    <div className="container">
                        <div className="site-header__branding">
                            <Link to="/">Mubi</Link>
                        </div>
                        <nav className="site-header__navigation">
                            <div className="site-header__menu">
                                <Button onClick={() => setShowMenu(!showMenu)}>
                                    <Icon name="menu" color={"#ffffff"} />
                                </Button>
                                <div
                                    className={
                                        showMenu
                                            ? "submenu is-active"
                                            : "submenu"
                                    }
                                >
                                    <Link to="/dashboard">Dashboard</Link>
                                    <Link to="/admin">Admin</Link>
                                    <Button medium onClick={handleSignOut}>
                                        Sign Out
                                    </Button>
                                </div>
                            </div>
                            <div className="site-header__search">
                                <Button primary>
                                    <Icon name="search" color={"#ffffff"} />
                                </Button>
                            </div>
                            <div className="site-header__avatar">
                                <Link to="/dashboard">
                                    <img
                                        src={
                                            currentUser &&
                                            currentUser.providerData[0].photoURL
                                        }
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </nav>
                    </div>
                </Wrapper>
            </header>
        );
    } else {
        return (
            <header className="site-header">
                <Wrapper>
                    <div className="container">
                        <div className="site-header__branding">
                            <Link to="/">Mubi</Link>
                        </div>
                        <nav className="site-header__navigation">
                            <div className="site-header__menu">
                                <Button onClick={() => setShowMenu(!showMenu)}>
                                    <Icon name="menu" color={"#ffffff"} />
                                </Button>
                                <div
                                    className={
                                        showMenu
                                            ? "submenu is-active"
                                            : "submenu"
                                    }
                                >
                                    <Link to="/dashboard">Dashboard</Link>
                                    <Link to="/admin">Admin</Link>
                                </div>
                            </div>
                            <div className="site-header__search">
                                <Button>
                                    <Icon name="search" color={"#ffffff"} />
                                </Button>
                            </div>
                            <Link to="/login">
                                <Button medium>Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button medium outline>
                                    Sign Up
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </Wrapper>
            </header>
        );
    }
};

export default withFirebase(Header);
