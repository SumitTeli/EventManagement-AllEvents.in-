import React, { useState, useEffect, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext"; // Import your ProfileContext
import "./LoginSection.css";

function Login() {
  const { setProfile, profile } = useContext(ProfileContext);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("loggedInUser");
    if (storedProfile) {
      navigate("/home");
    }
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          // console.log(res.data);

          // Insert user details into the database using PHP API
          axios
            .post("http://localhost/reactcurdphp/api/login.php", {
              email: res.data.email,
              google_id: res.data.id,
              username: res.data.name,
              image_link: res.data.picture,
              // Other user details to be inserted
            }) // Inside your login function after successful login:
            .then((response) => {
              // Save user data to localStorage
              localStorage.setItem("loggedInUser", JSON.stringify(res.data));
              // Redirect to home.jsx upon successful insertion
              navigate("/home");
            })
            .catch((error) => {
              console.error("Error inserting user details: ", error);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    // navigate("/addevent");
  };

  return (
    <div className="hero-section">
      <div className="login-container">
        <h2 className="login-heading">Welcome to our Platform</h2>
        <p className="login-subtext">Sign in to access all the features!</p>

        <button className="login-button" onClick={() => login()}>
          Sign in with Google 🚀
        </button>
      </div>
    </div>
  );
}

export default Login;
