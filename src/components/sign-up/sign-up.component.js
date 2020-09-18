import React, { Component } from "react";
import { insertUser } from "../../redux/actions/expense.action";
import { connect } from "react-redux";
import emailjs from "emailjs-com";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { TextField } from "@material-ui/core";

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
      showError: false,
      showSuccess: false,
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
      this.sendEmail(event);
      this.props.insertUser(this.state);
      this.setState({
        showSuccess: true,
      });
      this.setState({
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
      });
    } else {
      this.setState({
        showError: true,
      });
    }
  };

  sendEmail = (e) => {
    emailjs
      .sendForm(
        "gmail",
        "template_5y0aoft",
        e.target,
        "user_CXIh8B8oNAAI9jTPmKEhw"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  render() {
    return (
      <div className="row mx-0">
        <div className="col-md-2"></div>
        <div className="col-md-8 formStyle">
          <div className="text-center display-4">Sign Up</div>
          <form onSubmit={this.handleSubmit}>
            <div className="row mt-4">
              <div className="form-group col-md-6">
                <TextField
                  error={this.state.formErrors.username.length > 0}
                  helperText={this.state.formErrors.username}
                  className="form-control"
                  name="username"
                  type="text"
                  label="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <TextField
                  error={this.state.formErrors.email.length > 0}
                  helperText={this.state.formErrors.email}
                  className="form-control"
                  name="email"
                  type="text"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-md-6">
                <TextField
                  error={this.state.formErrors.contact.length > 0}
                  helperText={this.state.formErrors.contact}
                  className="form-control"
                  name="contact"
                  type="text"
                  label="contact"
                  value={this.state.contact}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <TextField
                  error={this.state.formErrors.designation.length > 0}
                  helperText={this.state.formErrors.designation}
                  className="form-control"
                  name="designation"
                  type="text"
                  label="Designation"
                  value={this.state.designation}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="form-group col-md-6">
                <TextField
                  error={this.state.formErrors.dateOfBirth.length > 0}
                  helperText={this.state.formErrors.dateOfBirth}
                  className="form-control"
                  name="dateOfBirth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Date Of Birth"
                  value={this.state.dateOfBirth}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <TextField
                  error={this.state.formErrors.address.length > 0}
                  helperText={this.state.formErrors.address}
                  multiline
                  rows={2}
                  rowsMax={4}
                  className="form-control"
                  name="address"
                  type="text"
                  placeholder="Enter Address"
                  value={this.state.address}
                  onChange={this.handleChange}
                ></TextField>
              </div>
            </div>
            <button className="btn btn-primary btn-block mt-3">Sign Up</button>
          </form>
        </div>
        <div className="col-md-2"></div>

        <Snackbar
          open={this.state.showSuccess}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={8000}
          onClose={() => this.setState({ showSuccess: false })}
        >
          <Alert
            className="bg-success"
            severity="success"
            style={{ color: "white" }}
          >
            <AlertTitle>Success</AlertTitle>
            Registration Successfull —{" "}
            <strong>Email has been sent to SET Password</strong>
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.showError}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={8000}
          onClose={() => this.setState({ showError: false })}
        >
          <Alert
            className="bg-danger"
            severity="error"
            style={{ color: "white" }}
          >
            <AlertTitle>Registration Fail</AlertTitle>
            Please enter valid values!
          </Alert>
        </Snackbar>
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
