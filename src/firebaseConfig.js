import firebase from 'firebase';
import "firebase/auth"
import "firebase/storage"
import "firebase/database"
import {firebase_server_config} from './globalConfig'

let config = {
    apiKey: firebase_server_config.API_KEY,
    authDomain: "dev-messenger-react.firebaseapp.com",
    databaseURL: "https://dev-messenger-react.firebaseio.com",
    projectId: "dev-messenger-react",
    storageBucket: "dev-messenger-react.appspot.com",
    messagingSenderId: firebase_server_config.messagingSenderId
  };
firebase.initializeApp(config);


export default firebase