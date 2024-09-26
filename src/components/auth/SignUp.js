import React, { useState } from "react";
import Add from "../../assets/auth/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ShowHideIcon from "../../assets/auth/show-hide.svg";

const SignUp = ({ onSwitchForm }) => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${email + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              email,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input required type="email" placeholder="Enter your email" />
        <div className="password-input">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
          />
          <span className="toggle-password" onClick={togglePasswordVisiblity}>
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="show-hide-icon"
            />
          </span>
        </div>
        {/* <div className="password-requirements">
          <p>At least 8 characters</p>
          <p>At least 1 capital letter</p>
        </div> */}
        <div className="password-input">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Re-enter your new password"
          />
          <span className="toggle-password" onClick={togglePasswordVisiblity}>
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="show-hide-icon"
            />
          </span>
        </div>
        <input required style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add an avatar</span>
        </label>
        <button disabled={loading} className="signup-button">
          Sign Up
        </button>
        {loading && "Uploading and compressing the image please wait..."}
        {err && <span>Something went wrong</span>}
      </form>
      <div className="signin-link">
        Already have an account?{" "}
        <span onClick={() => onSwitchForm("signin")} className="signin-direct">
          Sign in
        </span>
      </div>
    </div>
  );
};

export default SignUp;
