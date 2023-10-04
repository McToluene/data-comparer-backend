import firebase from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.FIREBASE_PRIVATE_KEY);
const firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: `"${process.env.FIREBASE_PRIVATE_KEY}"`,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-byu4d%40productzoo-3e5f9.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

const serviceAccount = JSON.parse(JSON.stringify(firebaseConfig));
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://productzoo-3e5f9.firebaseio.com',
});
export default firebase;
