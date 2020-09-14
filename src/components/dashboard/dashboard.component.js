import React, { Component } from "react";
import Header from "../shared/header.component";
import "./dashboard.component.css";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="row mx-0 mt-4">
          <div className="col-md-4 profile">
            <div className="panel">
              <div className="text-center display-4">Profile</div>
              <div className="text-center mt-4">
                <img
                  src={require("../../assets/application-images/profile.png")}
                  className="profile-img"
                  alt="addCategoryImg"
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 dashboard pl-1">
            <div className="panel">
              <div className="text-center display-4 caption">
                Welcome to Dashboard
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.accessToken ? (
          <h5>
            Your Access Token: <br />
            <br /> {this.state.accessToken}
          </h5>
        ) : null} */}
      </div>
    );
  }
}

export default Dashboard;
