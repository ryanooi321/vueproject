import firebase from 'firebase/app'
import 'firebase/auth'
import firestore from 'firebase/firestore'

const settings = { timestapmsInSnapShots: true };
// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBx_NnF1guHMpFBzKLpQ_kHoc2qX1TE0K8",
    authDomain: "uow-app.firebaseapp.com",
    databaseURL: "https://uow-app.firebaseio.com",
    projectId: "uow-app",
    storageBucket: "uow-app.appspot.com",
    messagingSenderId: "641410973144",
    appId: "1:641410973144:web:c05a4d45162feb0f1546ad",
    measurementId: "G-Z17SP53MV7"
}
firebase.initializeApp(firebaseConfig)

firebase.firestore().settings(settings);

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const users = db.collection('users')
const profiles = db.collection('profiles')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    users,
    profiles,
    postsCollection,
    commentsCollection,
    likesCollection
}

export default firebase;