import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./components/App/App";

import Firebase, { FirebaseContext } from "./components/Firebase";
import AuthProvider from "./Auth";
import StoreProvider from "./GlobalStore";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <AuthProvider>
            <StoreProvider>
                <App />
            </StoreProvider>
        </AuthProvider>
    </FirebaseContext.Provider>,
    document.getElementById("root")
);
