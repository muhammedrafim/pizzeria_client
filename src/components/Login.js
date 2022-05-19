import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import axios from "../axios/axios";

import { loginAction } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorFromServer, setErrorFromServer] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This function handle submit action
  let submitHandler = e => {
    e.preventDefault();
    setErrorFromServer(null);
    axios({
      url: "auth/login",
      method: "post",
      data: {
        email,
        password
      }
    })
      .then(response => {
        console.log("Response from Login API ", response.data);
        if (response.data.status === 1) {
          // Storing token in local storage : this token comes from server
          localStorage.setItem("token", response.data.user.token);
          dispatch(loginAction(response.data.user));
          navigate("/");
        } else {
          setErrorFromServer(response.data.msg);
          console.log("Something went wrong");
        }
      })
      .catch(e => {
        console.log("Error from  login API", e);
      });
  };

  return (
    <div className="container w-50 py-4 my-4 px-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="inputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="inputPassword1"
          />
        </div>
        {errorFromServer &&
          <div className="text-danger">
            {errorFromServer}
          </div>}
        <button
          type="submit"
          className="btn btn-warning d-block ms-auto fw-bold"
        >
          Login
        </button>
      </form>
      <div>
        New User?<Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
