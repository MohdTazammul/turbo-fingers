import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// import { onSuccess, onFailure } from "../Components/Register/Register";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNXjbuwXwroMr1_1qUSgaxvvK4wTmzyk",
  authDomain: "turbo-fingers.firebaseapp.com",
  projectId: "turbo-fingers",
  storageBucket: "turbo-fingers.appspot.com",
  messagingSenderId: "198231804922",
  appId: "1:198231804922:web:2e65e9bba8b6b4a0067243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export {signInWithPopup}
// export const signInWithGoogle = () =>{
//     signInWithPopup(auth, provider).then(resp=>{
//       var obj = {name:resp.user.displayName, email:resp.user.email, profile:resp.user.photoURL};
//       let email = obj.email.replace(/[^a-zA-Z0-9 ]/g, '');
//       onSuccess({obj, email});
//       // return {error:false, message:obj, email}
//     }).catch(e=>{
//       onFailure(e.message);
//       // return {error:true, message:e.message}
//     })
//   }