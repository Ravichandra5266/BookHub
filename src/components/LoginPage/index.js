import { useState } from "react";

import { Redirect } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [isLoginFormSubmited, setIsLoginFormSubmited] = useState(false);

  const onchangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onchangeUserpassword = (event) => {
    setUserpassword(event.target.value);
  };

  const onsubmitForm = async (event) => {
    event.preventDefault();
    const loginApi = "https://apis.ccbp.in/login";
    const options = {
      method: "post",
      body: JSON.stringify({ username, password: userpassword }),
    };
    const responseUrl = await fetch(loginApi, options);
    const responseData = await responseUrl.json();

    if (responseUrl.ok) {
      Cookies.set("jwt_token", responseData.jwt_token, {
        expires: 30,
      });
      const { history } = props;
      history.replace("/");
    } else {
      setLoginErrorMsg(responseData.error_msg);
      setIsLoginFormSubmited(true);
    }
  };

  const token = Cookies.get("jwt_token");
  if (token !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page-container">
      <div className="sm-login-page-logo">
        <img
          src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171070/Ellipse_99_debu49.png"
          alt="login logo"
          className="sm-login-logo"
        />
      </div>
      <div className="lg-login-page-logo">
        <img
          src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171065/Rectangle_1467_nd6rrh.png"
          alt="login logo"
          className="lg-login-logo"
        />
      </div>
      <div className="login-content-container">
        <div className="login-icon">
          <img
            src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171066/Group_7732_pif35n.png"
            alt="login "
            className="login-book-icon"
          />
        </div>
        <form className="login-form" onSubmit={onsubmitForm}>
          <label htmlFor="username" className="username-label">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="username-input"
            value={username}
            onChange={onchangeUsername}
          />
          <label htmlFor="userpassword" className="username-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="userpassword"
            className="userpassword-input"
            value={userpassword}
            onChange={onchangeUserpassword}
          />
          {isLoginFormSubmited && <p className="error-msg">{loginErrorMsg}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
