import React, { Component } from "react";

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

export default class SetPassword extends Component {
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
    const { password, confirmPassword } = this.state;
    if (formValid(this.state)) {
      console.log(password + " and " + confirmPassword);
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
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                className="form-control"
                name="password"
                type="password"
                placeholder="Enter New Password"
                onChange={this.handleChange}
              />
              {this.state.formErrors.password.length > 0 && (
                <span className="text-danger">
                  {this.state.formErrors.password}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                className="form-control"
                name="confirmPassword"
                type="password"
                placeholder="Repeat Password"
                onChange={this.handleChange}
              />
              {this.state.formErrors.confirmPassword.length > 0 && (
                <span className="text-danger">
                  {this.state.formErrors.confirmPassword}
                </span>
              )}
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              Confirm
            </button>
          </form>
        </div>
        <div className="col-md-4 col-sm-2"></div>
      </div>
    );
  }
}
