import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import "../../src/App.css";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={logout} className="logoutbtn">Logout</button>
    </div>
  );
};

export default LogoutBtn;
