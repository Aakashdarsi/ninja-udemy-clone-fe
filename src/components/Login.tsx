import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth, google_auth_provider } from "../config/firebase";
export const Login = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  });

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, google_auth_provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-5 d-flex justify-content-center">
      <GoogleButton onClick={() => googleSignin()} />
    </div>
  );
};
