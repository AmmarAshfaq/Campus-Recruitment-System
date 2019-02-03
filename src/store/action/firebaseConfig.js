import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB0uumuWJ-1t-IIExMgCcH9f7cnrwIwCyk",
  authDomain: "campusrequirementsystem.firebaseapp.com",
  databaseURL: "https://campusrequirementsystem.firebaseio.com",
  projectId: "campusrequirementsystem",
  storageBucket: "campusrequirementsystem.appspot.com",
  messagingSenderId: "946549197531"
};
  let dbConfig =  firebase.initializeApp(config);


 
 
export default dbConfig;