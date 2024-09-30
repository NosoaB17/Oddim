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
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisiblity}
          >
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </div>
        <div className="relative">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Re-enter your new password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisiblity}
          >
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </div>
        <input required type="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-500"
        >
          <img src={Add} alt="" className="w-8 h-8" />
          <span>Add an avatar</span>
        </label>
        <button
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
        {loading && (
          <p className="text-sm text-gray-600">
            Uploading and compressing the image please wait...
          </p>
        )}
        {err && <p className="text-sm text-red-500">Something went wrong</p>}
      </form>
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => onSwitchForm("signin")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </div>
    </div>
  );
};

export default SignUp;
