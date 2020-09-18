import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

const formValid = (state) => {
  let valid = true;
  state.password === "" || state.confirmPassword === ""
    ? (valid = false)
    : (valid = true);
  Object.values(state.formErrors).forEach((val) => {
    //if error length > 0 set valid = false
    val.length > 0 && (valid = false);
  });
  return valid;
};

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      formErrors: {
        password: "",
        confirmPassword: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    switch (name) {
      case "password":
        formErrors.password =
          value.length < 4 ? "minimum 4 characters required" : "";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value === this.state.password ? "" : "Password do not Match!";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { password } = this.state;
    if (formValid(this.state)) {
      const email = this.props.match.params.email;
      const users = this.props.users.map((user) => {
        if (user.email === email) {
          user.password = password;
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(users));
      this.props.history.push("/");
    } else {
      alert("failed");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-2"></div>
        <div className="col-md-4 col-sm-8 formStyle">
          <div className="text-center display-4 mb-4">Set Password</div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mt-5">
              <TextField
                error={this.state.formErrors.password.length > 0}
                helperText={this.state.formErrors.password}
                className="form-control"
                name="password"
                type="password"
                label="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mt-5">
              <TextField
                error={this.state.formErrors.confirmPassword.length > 0}
                helperText={this.state.formErrors.confirmPassword}
                className="form-control"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary btn-block mt-5" type="submit">
              Confirm
            </button>
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

export default connect(mapStateToProps)(SetPassword);
