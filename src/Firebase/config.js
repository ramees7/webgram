import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTbEts44sbzZO9Uns2xnTRlX8UfVzQ7_U",
  authDomain: "parabolic-audio-422606-h5.firebaseapp.com",
  projectId: "parabolic-audio-422606-h5",
  storageBucket: "parabolic-audio-422606-h5.appspot.com",
  messagingSenderId: "434816966372",
  appId: "1:434816966372:web:0aadd077893baec07816f1",
  measurementId: "G-XK721EKNBG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);