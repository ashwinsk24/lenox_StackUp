import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";


export const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/create");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/create");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <p className="heading">Quiz App</p>
      <div className="loginContainer">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="input" />

        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
        />
        <button onClick={signIn} className="input signinbtn">Sign in</button>
        <button onClick={signInWithGoogle} className="input googlesigninbtn">Sign In With Google</button>
      </div>
    </>
  );
};
