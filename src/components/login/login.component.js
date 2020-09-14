import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";

const formValid = (state) => {
  let valid = true;
  state.username === "" || state.password === ""
    ? (valid = false)
    : (valid = true);
  Object.values(state.formErrors).forEach((val) => {
    //if error length > 0 set valid = false
    val.length > 0 && (valid = false);
  });
  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: "",
      username: "",
      password: "",
      formErrors: {
        username: "",
        password: "",
      },
    };

    this.googleLogin = this.googleLogin.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
  }

  googleLogin(response) {
    if (response.accessToken) {
      this.setState(() => ({
        isLogined: true,
        accessToken: response.accessToken,
      }));
    }
    console.log(response);
    // this.props.history.push("/dashboard");
  }

  handleLoginFailure() {
    alert("Failed to log in");
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "username":
        formErrors.username =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 4 ? "minimum 4 characters required" : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (formValid(this.state)) {
      console.log(this.state);
    } else {
      console.log("Form Invalid");
    }
  };

  render() {
    return (
      <div className="row w-100">
        <div className="col-md-4 col-sm-2"></div>
        <div className="col-md-4 col-sm-8 formStyle">
          <div className="text-center display-4">Login</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="form-control"
                name="username"
                type="text"
                placeholder="Enter username"
                onChange={this.handleChange}
              />
              {this.state.formErrors.username.length > 0 && (
                <span className="text-danger">
                  {this.state.formErrors.username}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-control"
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={this.handleChange}
              />
              {this.state.formErrors.password.length > 0 && (
                <span className="text-danger">
                  {this.state.formErrors.password}
                </span>
              )}
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              Login
            </button>

            <GoogleLogin
              className="btn-block d-flex justify-content-center mt-2"
              clientId="1008368973287-b886an6093lloimoeiikhl7quhphh5tf.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.googleLogin}
              onFailure={this.handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
            <div className="text-center mt-2">
              Don't Have an Account ? <Link to="/register">Sign Up</Link>
            </div>
          </form>
        </div>
        <div className="col-md-4 col-sm-2"></div>
      </div>
    );
  }
}

export default Login;
