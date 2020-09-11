import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./shared.component.css";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light ">
          <Link className="navbar-brand" to="/dashboard">
            <b> Expense Manager</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mr-4">
                <Link className="nav-link " to="/dashboard">
                  <b> Dashboard</b>
                </Link>
              </li>
              <li className="nav-item mr-4">
                <Link className="nav-link" to="/expenseManager">
                  <b> Expenses</b>
                </Link>
              </li>
              <li className="nav-item mr-4">
                <Link className="nav-link" to="/newUser">
                  <b> New User</b>
                </Link>
              </li>
              <li className="nav-item mr-4">
                <Link className="nav-link" to="/">
                  <b> Login</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <b> Register</b>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
