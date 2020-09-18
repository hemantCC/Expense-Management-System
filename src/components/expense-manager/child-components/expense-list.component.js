import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import {
  updateCurrentExpenseIndex,
  deleteExpense,
} from "../../../redux/actions/expense.action";

import React, { Component } from "react";

class ExpenseList extends Component {
  handleDelete = (index) => {
    this.props.deleteExpense(index);
  };

  handleEdit = (index) => {
    this.props.updateCurrentExpenseIndex(index);
  };

  render() {
    return (
      <div>
        <h3 className="text-center pt-3">
          Expense List{" "}
          {this.props.currentCategoryName !== " ( undefined )" &&
            this.props.currentCategoryName}
        </h3>
        <Divider className="mx-3"></Divider>
        <div className="row">
          <div className="col-6 text-center">
            Total Amount :&euro; {this.props.currentCategoryAmount}
          </div>
          <div className="col-6 text-center">
            Remaining Amount :&euro; {this.props.currentCategoryRemainingAmount}
          </div>
        </div>
        <Divider className="mx-3"></Divider>
        {this.props.expenses === undefined && (
          <div className="display-4 mt-5">Please Select a Category</div>
        )}
        {this.props.expenses &&
          this.props.expenses.map((item, index) => {
            return (
              <div className="row justify-content-center  mt-4" key={index}>
                <div className="card c1 text-white bg-info mb-3">
                  <div className="card-header">
                    Amount Spent : &euro; <span>{item.amount}</span>
                    <i
                      className="fa fa-trash float-right"
                      style={{ color: "black" }}
                      onClick={() => this.handleDelete(index)}
                    ></i>
                    <i
                      className="fa fa-pencil mr-3 float-right"
                      style={{ color: "black" }}
                      onClick={() => this.handleEdit(index)}
                    ></i>
                  </div>
                  <div className="card-body row">
                    <div className="col-md-6 col-xs-6">
                      {item.image !== "" && (
                        <img src={item.image} className="w-100" alt="e-i" />
                      )}
                      {item.image === "" && (
                        <img
                          src={require("../../../assets/application-images/no-image.png")}
                          className="w-100"
                          alt="no-i"
                        />
                      )}
                    </div>
                    <div className="col-md-6 col-xs-6">
                      {" "}
                      <b>Description: </b> {item.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.categories[state.selectedCategoryIndex]?.expenses,
    currentCategoryName:
      " ( " + state.categories[state.selectedCategoryIndex]?.name + " )",
    currentCategoryAmount:
      state.categories[state.selectedCategoryIndex]?.amount,
    currentCategoryRemainingAmount:
      state.categories[state.selectedCategoryIndex]?.remainingAmount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentExpenseIndex: (index) =>
      dispatch(updateCurrentExpenseIndex(index)),
    deleteExpense: (index) => dispatch(deleteExpense(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
