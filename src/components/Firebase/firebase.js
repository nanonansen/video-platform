import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.firestore();

        this.fieldValue = app.firestore.FieldValue;

        // *** Social Auth Provider ***
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    // *** Create new Document ***
    doCreateDocument = (collection, docID, data) => {
        this.db
            .collection(collection)
            .doc(docID)
            .set(data)
            .then(docRef => {
                console.log("docRed", docRef);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    // *** Save and Remove Video from User *** //
    doSaveVideoToUserDoc = (userId, videoData, videoId) => {
        let videoRef = this.video(videoId);
        let batch = this.db.batch();

        batch.update(videoRef, { saveCount: this.fieldValue.increment(1) });
        batch.update(videoRef, {
            users: this.fieldValue.arrayUnion(userId)
        });
        // Commit the batch
        batch.commit().then(() => {
            console.log("Success");
        });
    };
    doRemoveUserFromVideo = (userId, videoId) => {
        let videoRef = this.video(videoId);
        let batch = this.db.batch();
        batch.update(videoRef, { saveCount: this.fieldValue.increment(-1) });
        batch.update(videoRef, {
            users: this.fieldValue.arrayRemove(userId)
        });
        batch.commit().then(() => {
            console.log("Successfully Removed");
        });
    };

    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const dbUser = snapshot.data();

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    /* User API */
    user = uid => this.db.doc(`users/${uid}`);

    /* Video API */
    video = uid => this.db.doc(`videos/${uid}`);
    videos = uid => this.db.collection("videos");

    /* Conferences API */
    conferences = () => this.db.collection("conferences");

    //Helper
    getCurrentUserID = () => this.auth.currentUser.uid;
    getCurrentUserEmail = () => this.auth.currentUser.email;
}

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default Firebase;
