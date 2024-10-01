import React, { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword !== "") {
      setPasswordMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
    setPasswordMatch(password === confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setLoading(true);
    setErr(false);

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${email + date}`);

      if (file) {
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update profile
              await updateProfile(res.user, {
                email,
                photoURL: downloadURL,
              });
              // Create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                email,
                photoURL: downloadURL,
              });

              // Create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr("Failed to update profile");
              setLoading(false);
            }
          });
        });
      } else {
        // If no file is selected, create user without photo
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email,
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
      }
    } catch (err) {
      setErr(err.message || "Failed to create account");
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-5 shadow-md rounded-[12px]">
      <h2 className="text-2xl font-semibold text-center text-blue-500 mb-[30px]">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 border border-gray-300 rounded-xl text-base placeholder-gray-400"
        />
        <div className="relative">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-xl text-base placeholder-gray-400"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
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
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-4 mb-4 border rounded-xl text-base placeholder-gray-400 ${
              !passwordMatch && confirmPassword !== ""
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
          >
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </div>
        {!passwordMatch && confirmPassword !== "" && (
          <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
        )}
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <label
          htmlFor="file"
          className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-blue-500"
        >
          <img src={Add} alt="" className="w-8 h-8" />
          <span>Add an avatar</span>
        </label>
        <button
          disabled={
            loading ||
            !passwordMatch ||
            password === "" ||
            confirmPassword === ""
          }
          className={`w-full p-3 text-base font-medium rounded-xl transition duration-300 ${
            loading ||
            !passwordMatch ||
            password === "" ||
            confirmPassword === ""
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {loading && (
          <p className="text-sm text-gray-600 text-center">
            Uploading and compressing the image please wait...
          </p>
        )}
        {err && <p className="text-sm text-red-500 text-center">{err}</p>}
      </form>
      <p className="text-[#333] font-sans tracking-tight leading-6 mt-6 text-center">
        Already have an account?{" "}
        <span
          onClick={() => onSwitchForm("signin")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default SignUp;
