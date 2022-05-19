import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "../axios/axios";

import { signupAction } from "../actions/authActions";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorFromServer, setErrorFromServer] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function submitHandler is to handle form submit
  let submitHandler = e => {
    e.preventDefault();
    setErrorFromServer(null);

    axios({
      url: "auth/signup",
      method: "post",
      data: {
        email,
        name,
        password
      }
    })
      .then(response => {
        console.log("Response from Signup API ", response.data);
        if (response.data.status === 1) {
          // Storing token in local storage
          localStorage.setItem("token", response.data.user.token);

          dispatch(signupAction(response.data.user));
          navigate("/");
        } else {
          setErrorFromServer(response.data.msg);

          console.log("Something went wrong");
        }
      })
      .catch(e => {
        console.log("Error from  Signup API", e);
      });
  };

  return (
    <div className="container w-50 py-4 my-4 px-5">
      <h2 className="text-center"> Sign up</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="inputName1" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            type="text"
            className="form-control"
            id="inputName1"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        {/* Check for error response from server if there shows it */}
        {errorFromServer &&
          <div className="text-danger">
            {errorFromServer}
          </div>}
        <button
          type="submit"
          className="btn btn-warning d-block ms-auto fw-bold"
        >
          Sign up
        </button>
      </form>
      <div>
        Already Registered?<Link to="/login"> Login</Link>
      </div>
    </div>
  );
}

export default Signup;
