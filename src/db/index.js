import firebase from 'firebase'
import 'firebase/firestore'
const config = {
	apiKey: "AIzaSyBC1YFEdqbCRR7Y9FyVWo6izjWpz4uvJnE",
    authDomain: "vue-crud-firebase-7f39e.firebaseapp.com",
    databaseURL: "https://vue-crud-firebase-7f39e.firebaseio.com",
    projectId: "vue-crud-firebase-7f39e",
    storageBucket: "vue-crud-firebase-7f39e.appspot.com",
    messagingSenderId: "1024842773131"
}
const firebaseapp = firebase.initializeApp(config)
export default firebaseapp.firestore()