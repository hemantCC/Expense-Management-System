import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/login.component";
import SignUp from "./components/sign-up/sign-up.component";
import Dashboard from "./components/dashboard/dashboard.component";
import SetPassword from "./components/shared/set-password.component";
import newUser from "./components/shared/new-user.component";
import ExpenseManager from "./components/expense-manager/expense-manager.component";

function App() {
  return (
    <Router>
      <div className="container-fluid px-0">
        <Route path="/" exact component={Login}></Route>
        <Route path="/register" component={SignUp}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/setPassword" component={SetPassword}></Route>
        <Route path="/newUser" component={newUser}></Route>
        <Route path="/expenseManager" component={ExpenseManager}></Route>
      </div>
    </Router>
  );
}

export default App;
