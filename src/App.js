import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/login/login.component";
import SignUp from "./components/sign-up/sign-up.component";
import Dashboard from "./components/dashboard/dashboard.component";
import SetPassword from "./components/shared/set-password.component";
import newUser from "./components/shared/new-user.component";
import ExpenseManager from "./components/expense-manager/expense-manager.component";
import SettingComponent from "./components/shared/setting.component";
import isAuthorized from "./auth/auth";
import SurveyComponent from "./components/survey/survey.component";

function App() {
  return (
    <Router>
      <div className="container-fluid px-0">
        <Route path="/" exact component={Login}></Route>
        <Route exact path="/register" component={SignUp}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/setPassword/:email" component={SetPassword}></Route>
        <Route exact path="/newUser" component={newUser}></Route>
        <Route exact path="/expenseManager" component={ExpenseManager}></Route>
        <Route exact path="/settings" component={SettingComponent}></Route>
        <Route exact path="/survey" component={SurveyComponent}></Route>
      </div>
    </Router>
  );
}

export default App;
