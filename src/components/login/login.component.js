import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const formValid = (state) => {
  let valid = true;
  state.username === "" || state.password === ""
    ? (valid = false)
    : (valid = true);
  Object.values(state.formErrors).forEach((val) => {
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
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({
        email: response.profileObj.email,
        isGoogleUser: true,
        image: response.profileObj.imageUrl,
        name: response.profileObj.givenName,
        familyName: response.profileObj.familyName,
      })
    );
    this.props.history.push("/dashboard");
  }

  redirection() {
    if (JSON.parse(localStorage.getItem("categories")).length === 0) {
      this.props.history.push("/newUser");
    } else {
      this.props.history.push("/dashboard");
    }
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
      this.props.users.map((user) => {
        if (
          user.username === this.state.username &&
          user.password === this.state.password
        ) {
          localStorage.setItem(
            "loggedUser",
            JSON.stringify({
              username: user.username,
              email: user.email,
              isGoogleUser: false,
              contact: user.contact,
              dateOfBirth: user.dateOfBirth,
              designation: user.designation,
              address: user.address,
            })
          );
          this.redirection();
        } else {
          console.log("username or password incorrect");
        }
      });
    } else {
      console.log("Form Invalid");
    }
  };

  render() {
    return (
      <div className="row w-100">
        <div className="col-md-4 col-sm-2"></div>
        <div className="col-md-4 col-sm-8 formStyle">
          <div className="text-center display-4 mb-4">Login</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <TextField
                error={this.state.formErrors.username.length > 0}
                helperText={this.state.formErrors.username}
                className="form-control mb-3"
                name="username"
                type="text"
                label="Username"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <TextField
                error={this.state.formErrors.password.length > 0}
                helperText={this.state.formErrors.password}
                className="form-control mb-3"
                name="password"
                type="password"
                label="Password"
                onChange={this.handleChange}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={
                !(
                  this.state.formErrors.username === "" &&
                  this.state.formErrors.password === "" &&
                  this.state.username !== "" &&
                  this.state.password !== ""
                )
              }
            >
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

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(Login);
