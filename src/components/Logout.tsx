import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../data_store/user_store";
export const Logout = () => {
  const navigate = useNavigate();
  const loggout_store = useUserDetails((state) => state.logOutUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("user logged out successfully");
      loggout_store();
      navigate("/");
    } catch (err) {
      console.log("user logging out error", err);
    }
  };

  return (
    <div>
      <button className="btn btn-secondary" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
};
