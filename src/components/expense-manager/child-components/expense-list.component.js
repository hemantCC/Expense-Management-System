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
          Expense List {this.props.currentCategoryName}
        </h3>
        <Divider className="mx-3"></Divider>
        <div className="row">
          <div className="col-6 text-center">Total Amount : 5000</div>
          <div className="col-6 text-center">Remaining Amount : 2000</div>
        </div>
        <Divider className="mx-3"></Divider>
        {this.props.expenses &&
          this.props.expenses.map((item, index) => {
            return (
              <div className="row justify-content-center  mt-4" key={index}>
                <div className="card c1 text-white bg-info mb-3">
                  <div className="card-header">
                    Amount Spent : &euro; <span>{item.amount}</span>
                    <i
                      className="fa fa-trash float-right"
                      onClick={() => this.handleDelete(index)}
                    ></i>
                    <i
                      className="fa fa-pencil mr-3 float-right"
                      onClick={() => this.handleEdit(index)}
                    ></i>
                  </div>
                  <div className="card-body row">
                    {/* <h5 className="card-title"></h5> */}
                    <div className="col-md-6 col-xs-6">
                      {item.image !== "" && (
                        <img src={item.image} className="w-100" />
                      )}
                      {item.image === "" && (
                        <img
                          src={require("../../../assets/application-images/no-image.png")}
                          className="w-100"
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
