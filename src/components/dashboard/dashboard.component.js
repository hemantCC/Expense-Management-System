import React, { Component } from "react";
import Header from "../shared/header.component";
import "./dashboard.component.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoogleUser: false,
      email: "",
      username: "",
      contact: "",
      dateOfBirth: "",
      designation: "",
      address: "",
      image: "",
      name: "",
    };
  }

  //populates user details
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user?.isGoogleUser) {
      this.setState({
        isGoogleUser: true,
        email: user?.email,
        image: user?.image,
        name: user?.name,
      });
    } else {
      this.setState({
        isGoogleUser: false,
        email: user?.email,
        username: user?.username,
        contact: user?.contact,
        dateOfBirth: user?.dateOfBirth,
        designation: user?.designation,
        address: user?.address,
      });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="row mx-0">
          <div className="col-md-5 profile  mt-4">
            <div className="panel">
              <div className="text-center display-4">Profile</div>

              <div className="text-center mt-4">
                {!this.state.isGoogleUser && (
                  <div>
                    <img
                      src={require("../../assets/application-images/profile.png")}
                      className="profile-img mb-3"
                      alt="addCategoryImg"
                    />
                    <p>
                      <b> Username:</b> {this.state.username}
                    </p>
                    <p>
                      <b>Email:</b> {this.state.email}
                    </p>
                    <p>
                      <b>Designation:</b> {this.state.designation}
                    </p>
                    <p>
                      <b>Address: </b>
                      {this.state.address}
                    </p>
                    <p>
                      <b>Contact:</b> {this.state.contact}
                    </p>
                    <p>
                      <b>Date of Birth:</b> {this.state.dateOfBirth}
                    </p>
                  </div>
                )}
                {this.state.isGoogleUser && (
                  <div>
                    <img
                      src={this.state.image}
                      className="profile-img-google mb-5"
                      alt="addCategoryImg"
                    />
                    <p>
                      <b> Name:</b> {this.state.name}
                    </p>
                    <p>
                      <b>Email:</b> {this.state.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7 dashboard pl-1  mt-4">
            <div className="panel">
              <div className="text-center display-4 caption">
                Welcome to Dashboard
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
