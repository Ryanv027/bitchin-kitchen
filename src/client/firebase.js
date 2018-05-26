import firebase from 'firebase/app';
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyArjGiDUiNb540TkQ30C4pQYelT9_1J7dQ",
    authDomain: "bitchinkitchen-1.firebaseapp.com",
    databaseURL: "https://bitchinkitchen-1.firebaseio.com",
    projectId: "bitchinkitchen-1",
    storageBucket: "bitchinkitchen-1.appspot.com",
    messagingSenderId: "868806300238"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;