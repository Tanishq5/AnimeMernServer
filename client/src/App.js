import React, { useEffect, useState } from "react";
import { HashRouter as Route, Routes, Link, useNavigate } from "react-router-dom";
import StatusAlert from "react-status-alert";

import { useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import Filter from "./components/Filter/Filter";
import DownloadPage from "./components/Download/DownloadPage";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Page404 from "./components/404/Page404";
import Search from "./components/Filter/Search";
import EditProfile from "./Pages/Profile/EditProfile";


import "./Signup.css";
import "./Login.css";
import "./Home.css";
import "./App.css";
import Axios from "axios";

export default function App() {
  const [isload, setisload] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (isload) {
        await fetchData(dispatch);
        setisload(false);
      }
    };
    getData();
  },);

  return (
    <div >
        <StatusAlert />
        <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<EditProfile />} />
          <Route path="/filter/:type" element={<Filter />} />
          <Route path="/download/:id" element={<DownloadPage />} />
          <Route exact path="/A_D_M_I_N" element={<Admin />} />
          <Route exact path="/A_D_M_I_N/Dashboard" element={<Dashboard />} />
          <Route path="/search/:search" element={<Search />} />
          <Route element={<Page404 />} />
        </Routes>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <nav className="navbar  navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">
          AnimeVerse
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="home-headings">
        <h1 className="heading-text">
          Deep dive into anime movies and tv shows.
        </h1>
        {/* <p className="">Sign in or Sign Up with trial account  to start watching</p> */}
        <Link
          className="btn btn-dark btn-lg download-btn home-btn"
          to="/signup"
        >
          <i className="fa-solid fa-play"></i> Get Started
        </Link>
      </div>
    </div>
  );
}

function SignUpPage() {
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      userName: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    });
  
    let name, value;
  
    const handleInputs = (e) => {
      console.log(e);
      name = e.target.name;
      value = e.target.value;
  
      setUser({ ...user, [name]: value });
    };
  
    const postData = async (e) => {
      e.preventDefault();
  
      const { userName, email, phone, password, cpassword } = user;
  
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          phone,
          password,
          cpassword,
        }),
      });
  
      if (res.status === 406) {
        window.alert("Invalid Registration");
      } else if (res.status === 409) {
        window.alert("Email already exists");
      } else if (res.status === 401) {
        window.alert("password didn't matched");
      } else {
        window.alert("Registered Successfully");
        navigate("/login");
      }
    };
  
    return (
      <div>
        <Link to="/">
          <h5>AnimeVerse</h5>
        </Link>
        <div className="signup-page">
          <div id="error"></div>
          <form method="POST">
            <h3>Sign Up</h3>
            <input
              value={user.userName}
              onChange={handleInputs}
              name="userName"
              id="username"
              type="text"
              className="input-box"
              placeholder="User name"
            />
            <input
              value={user.email}
              onChange={handleInputs}
              name="email"
              id="email"
              type="email"
              className="input-box"
              placeholder="Email"
            />
            <input
              value={user.phone}
              onChange={handleInputs}
              name="phone"
              id="phone"
              type="text"
              className="input-box"
              placeholder="Phone number"
            />
            <input
              value={user.password}
              onChange={handleInputs}
              name="password"
              id="password"
              type="password"
              className="input-box"
              placeholder="Password"
            />
            <input
              value={user.cpassword}
              onChange={handleInputs}
              name="cpassword"
              id="cpassword"
              type="password"
              className="input-box"
              placeholder="Confirm password"
            />
            <button
              type="submit"
              value="register"
              name="signup"
              id="signup"
              onClick={postData}
              className="btn btn-dark btn-md download-btn signup-btn"
            >
              Sign up
            </button>
            <p className="new-member">
              Already have an account <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }

  function LogInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 406 || !data) {
      window.alert("Invalid Credentials");
    } else if (res.status === 401) {
      window.alert("Invalid Credentials");
    } else if (res.status === 400) {
      window.alert("Invalid Credentials");
    } else if (res.status === 201) {
      window.alert("Login Successfull");
      navigate("/filter/anime");
    }
  };

  return (
    <div>
      <Link to="/">
        <h5>AnimeVerse</h5>
      </Link>
      <div className="login-page">
        <form method="POST">
          <h3>Log In</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="input-box"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="input-box"
            placeholder="Password"
          />
          <button
            type="submit"
            value="login"
            name="login"
            id="login"
            className="btn btn-dark btn-md download-btn login-btn"
            onClick={loginUser}
          >
            Log in
          </button>
          <hr />
          <p className="new-member">
            New to AnimeVerse? <Link to="/signup">sign up now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
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
  };

  useEffect(() => {
    callAboutPage();
  },);

  return (
    <div>
      <Header />
      <div className="profile-page">
        <div id="error"></div>
        <form method="GET">
          <h5>Your Profile</h5>
          <div className="profile-edit">
            <button
              onClick={() => {
                navigate(`/profile/${userData._id}`);
              }}
              className="profile-edit-btn"
            >
              Edit Profile
            </button>
          </div>
          <div className="row">
            <div className="profile-details col-md-6">
              <h3 className="details">Username :</h3>
              <h3 className="details">Email :</h3>
              <h3 className="details">Phone Number :</h3>
            </div>
            <div className="profile-info col-md-6">
              <h3 className="info">{userData.userName}</h3>
              <h3 className="info">{userData.email}</h3>
              <h3 className="info">{userData.phone}</h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const fetchData = async (dispatch) => {
  const allData = await (await Axios.post("/movie_data/fetch")).data;

  const filterDataWithTimeStamp = await filterWithTimeStamp(allData);

  await setAllAnimeData(filterDataWithTimeStamp, dispatch);
  await setNewAnime(filterDataWithTimeStamp, dispatch);
  await setActionAnime(filterDataWithTimeStamp, dispatch);
  await setChildAnime(filterDataWithTimeStamp, dispatch);
  await setAnime(filterDataWithTimeStamp, dispatch);
};

const filterWithTimeStamp = async (allData) => {
  const filterData = await allData.sort((a, b) => {
    if (a.TimeStamp < b.TimeStamp) {
      return 1;
    } else if (b.TimeStamp < a.TimeStamp) {
      return -1;
    }
    return 0;
  });

  return filterData;
};

const setAllAnimeData = async (allData, dispatch) => {
  await dispatch({ type: "ALL_MOVIE_DATA", data: allData });
};

const setNewAnime = async (allData, dispatch) => {
  await dispatch({ type: "NEW_MOVIE_DATA", data: allData.slice(0, 8) });
};

const setActionAnime = async (allData, dispatch) => {
  const actionanime = await allData.filter((list) => {
    if (list.Wood === "Bollywood") {
      return list;
    }
  });
  await dispatch({ type: "ACTION_ANIME", data: actionanime });
};

const setChildAnime = async (allData, dispatch) => {
  const childanime = await allData.filter((list) => {
    if (list.Wood === "Hollywood") {
      return list;
    }
  });
  await dispatch({ type: "CHILD_ANIME", data: childanime });
};

const setAnime = async (allData, dispatch) => {
  const anime = await allData.filter((list) => {
    if (list.Wood === "Series") {
      return list;
    }
  });
  await dispatch({ type: "ANIME", data: anime });
};