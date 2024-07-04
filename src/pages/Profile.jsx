import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { UsersContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser, setCurrentUser } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prev) => ({ ...prev, userProfile: downloadURL }))
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(`http://localhost:5000/update/${currentUser.data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/delete/${currentUser.data._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      console.log(data);

      navigate("/login");
      setCurrentUser(null);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser.data ? (
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              id="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={currentUser.data.userProfile}
              alt=""
              onClick={() => fileRef.current.click()}
              className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            />
            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">Image uploaded successfully</span>
              ) : (
                ""
              )}
            </p>
            <input
              defaultValue={currentUser.data.username}
              type="text"
              id="username"
              placeholder="Username"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.data.email}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Update
            </button>
          </form>

          <div className="flex justify-between mt-5">
            <span onClick={handleDelete} className="text-red-700 cursor-pointer">
              Delete Account
            </span>
            <span onClick={handleSignout} className="text-red-700 cursor-pointer">
              Sign out
            </span>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Profile;
