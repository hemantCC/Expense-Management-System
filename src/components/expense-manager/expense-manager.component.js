import React, { Component } from "react";
import Header from "../shared/header.component";
import AddExpenses from "./child-components/add-expense.component";
import CategoryList from "./child-components/category-list.component";
import ExpenseList from "./child-components/expense-list.component";
import "./expense-manager.component.css";

class ExpenseManager extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="row justify-content-between px-4 mt-2 mx-0">
          <div className="col-md-3 my-2 py-0 px-2">
            <div className="expense-component">
              <CategoryList />
            </div>
          </div>
          <div className="col-md-6 px-0  my-2 px-2">
            <div className="expense-component">
              <ExpenseList />
            </div>
          </div>
          <div className="col-md-3  my-2 px-2">
            <div className="expense-component">
              <AddExpenses />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ExpenseManager;
