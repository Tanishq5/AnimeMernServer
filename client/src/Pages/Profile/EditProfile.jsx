import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  const [user, setUser] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  let name, value;

  
  useEffect(() => {
    const Edit = async() => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });


      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
}
Edit();
  },);
  console.log(userData)

  const handleprofileInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const updateData = async (e) => {
    e.preventDefault();

    const { userName, email, phone } = user;

    const res = await fetch(`/about/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        phone,
      }),
    });

    if (res.status === 200) {
      window.alert("Updated Successfully");
      navigate("/profile");
    } else {
      window.alert("error");
    }
  };

  return (
    <div>
      <Link to="/">
        <h5>AnimeVerse</h5>
      </Link>
      <div className="signup-page">
        <div id="error"></div>
        <form method="PUT">
          <h3>Edit Profile</h3>
          <input
          
            defaultValue={userData.userName}
            onChange={handleprofileInputs}
            // value="userName"
            name="userName"
            id="username"
            type="text"
            className="input-box"
          />
          <input
            defaultValue={userData.email}
            onChange={handleprofileInputs}
            // value="email"
            name="email"
            id="email"
            type="email"
            className="input-box"
          />
          <input
            defaultValue={userData.phone}
            onChange={handleprofileInputs}
            // value="phone"
            name="phone"
            id="phone"
            type="text"
            className="input-box"
          />
          <button
            type="submit"
            value="register"
            name="signup"
            id="signup"
            onClick={updateData}
            className="btn btn-dark btn-md download-btn signup-btn"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;