import { auth } from './firebase';


//Official Documentation:

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/user',
  });

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

