import React, { Component } from "react";
import { insertUser } from "../../redux/actions/expense.action";
import { connect } from "react-redux";

const emailRegx = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
const phoneRegx = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const validForm = (state) => {
  let valid = true;
  state.username === "" ||
  state.email === "" ||
  state.contact === "" ||
  state.designation === "" ||
  state.dateOfBirth === "" ||
  state.address === ""
    ? (valid = false)
    : (valid = true);
  Object.values(state.formErrors).forEach((val) => {
    //if error length > 0 set valid = false
    val.length > 0 && (valid = false);
  });
  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      contact: "",
      designation: "",
      dateOfBirth: "",
      address: "",
      password: "",
      formErrors: {
        username: "",
        email: "",
        contact: "",
        designation: "",
        dateOfBirth: "",
        address: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const formErrors = this.state.formErrors;
    switch (name) {
      case "username":
        formErrors.username =
          value.length < 3 ? "Minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegx.test(value)
          ? ""
          : "Please insert a valid email.";
        break;
      case "contact":
        formErrors.contact = phoneRegx.test(value)
          ? ""
          : "Contact Number should be a 10 digit number.";
        break;
      case "designation":
        formErrors.designation =
          value.length < 3 ? "Minimum 3 characters required" : "";
        break;
      case "address":
        formErrors.address =
          value.length < 10 ? "Minimum 10 characters required" : "";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      [name]: value,
    });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const state = this.state;
    if (this.state.dateOfBirth === "") {
      state.formErrors.dateOfBirth = "Date of Birth is Required.";
      this.setState(state);
      console.log(this.state);
    }
    if (validForm(this.state)) {
      console.log("Registration Success");
      this.props.insertUser(this.state);
      this.props.history.push("/");
    } else {
      console.log("Registration Fail");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 formStyle">
          <div className="text-center display-4">Sign Up</div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
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
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form-control"
                  name="email"
                  type="text"
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                />
                {this.state.formErrors.email.length > 0 && (
                  <span className="text-danger">
                    {this.state.formErrors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="Contact">Contact</label>
                <input
                  id="Contact"
                  className="form-control"
                  name="contact"
                  type="text"
                  placeholder="Enter Contact"
                  onChange={this.handleChange}
                />
                {this.state.formErrors.contact.length > 0 && (
                  <span className="text-danger">
                    {this.state.formErrors.contact}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="Designation">Designation</label>
                <input
                  id="Designation"
                  className="form-control"
                  name="designation"
                  type="text"
                  placeholder="Enter Designation"
                  onChange={this.handleChange}
                />
                {this.state.formErrors.designation.length > 0 && (
                  <span className="text-danger">
                    {this.state.formErrors.designation}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  className="form-control"
                  name="dateOfBirth"
                  type="date"
                  placeholder="Enter Date of Birth"
                  onChange={this.handleChange}
                />
                {this.state.formErrors.dateOfBirth.length > 0 && (
                  <span className="text-danger">
                    Date of birth is Required.
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="Address">Address</label>
                <textarea
                  id="Address"
                  className="form-control"
                  name="address"
                  type="text"
                  placeholder="Enter Address"
                  onChange={this.handleChange}
                ></textarea>
                {this.state.formErrors.address.length > 0 && (
                  <span className="text-danger">
                    {this.state.formErrors.address}
                  </span>
                )}
              </div>
            </div>
            <button className="btn btn-primary btn-block">Sign Up</button>
          </form>
        </div>
        <div className="col-md-2"></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertUser: (value) => dispatch(insertUser(value)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
