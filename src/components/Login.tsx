import GoogleButton from "react-google-button";
import { auth } from "../lib/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { AuthError } from "firebase/auth";
import { useUserDetails } from "../data_store/user_store";

auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

export const Login = () => {
  const user_store = useUserDetails();

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user_id = result.user?.uid;
      const user_name = result.user?.displayName;
      user_store.setUser(user_id, user_name);
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        const authError = error as AuthError;
        const errorCode = authError.code;
        const errorMessage = authError.message;
        const email = authError.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(authError);
        console.error("Google Sign-In Error:", {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      } else {
        console.error("An unexpected error occurred during sign-in:", error);
      }
    }
  };
  return (
    <div className="mt-5 d-flex justify-content-center">
      <GoogleButton onClick={signInGoogle} />
    </div>
  );
};
