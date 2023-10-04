import firebase from 'firebase-admin';
import credentials from '../../credentials.json';

const serviceAccount = JSON.parse(JSON.stringify(credentials));
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://productzoo-3e5f9.firebaseio.com',
});
export default firebase;
