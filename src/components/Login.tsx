import GoogleButton from "react-google-button";
import { auth } from "../lib/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useUserDetails } from "../data_store/user_store";

auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

export const Login = () => {
  const user_store = useUserDetails();

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user_id = result.user?.uid;
      const user_name = result.user?.displayName;
      user_store.setUser(user_id, user_name);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5 d-flex justify-content-center">
      <GoogleButton onClick={signInGoogle} />
    </div>
  );
};
