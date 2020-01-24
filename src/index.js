import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./components/App/App";

import Firebase, { FirebaseContext } from "./components/Firebase";
import AuthProvider from "./Auth";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </FirebaseContext.Provider>,
    document.getElementById("root")
);
