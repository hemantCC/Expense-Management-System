import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {
  insertExpense,
  editExpense,
} from "../../../redux/actions/expense.action";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";

class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      amount: "",
      image: "",
      formErrors: {
        description: "",
        amount: "",
      },
    };
  }

  // componentDidUpdate = (previousProps, previousState) => {
  //   if (
  //     JSON.stringify(this.props.currentExpense) !==
  //     JSON.stringify(previousState)
  //   ) {
  //     console.log("update state");
  //     this.setState({
  //       ...this.props.currentExpense,
  //     });
  //   }
  // };

  // returnStateProperties() {
  //   if (this.props.currentExpenseIndex === -1) {
  //     return {
  //       description: "",
  //       amount: "",
  //       image: "",
  //     };
  //   } else {
  //     return this.props.currentExpense;
  //   }
  // }

  handleSubmit = (e) => {
    if (this.props.currentExpenseIndex === -1) {
      console.log("add");
      console.log(this.state.image);
      this.props.insertExpense(this.state);
    } else {
      console.log("edit");
      this.props.editExpense(this.state);
    }
    e.preventDefault();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    if (e.target.name === "image") {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      switch (name) {
        case "description":
          formErrors.description =
            value.length < 5 ? "minimum 5 characters required" : "";
          break;
        case "amount":
          formErrors.amount =
            value.length < 1
              ? "Amount required"
              : /\D/.test(value)
              ? "Only Numbers"
              : "";
          // formErrors.amount = /\D/.test(value) ? "Only Numbers" : "";
          break;
        default:
          break;
      }

      this.setState({
        formErrors,
        [name]: value,
      });

      // this.setState({
      //   [e.target.name]: e.target.value,
      // });
    }
  };

  render() {
    return (
      <div>
        <h3 className="text-center pt-3">Add Expense</h3>
        <Divider className="mx-2"></Divider>
        <form className="px-4" onSubmit={this.handleSubmit}>
          <div className="form-group mt-4">
            <TextField
              // className="form-control"
              // placeholder="Description"
              required
              rows="4"
              name="description"
              label="Description"
              multiline
              rows={2}
              rowsMax={4}
              value={this.state.description}
              onChange={this.handleChange}
            />
            {this.state.formErrors.description.length > 0 && (
              <span className="text-danger">
                {this.state.formErrors.description}
              </span>
            )}
          </div>
          <div className="form-group mt-4">
            <TextField
              type="text"
              label="Amount"
              required
              // placeholder="Amount"
              // className="form-control"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            {this.state.formErrors.amount.length > 0 && (
              <span className="text-danger">
                {this.state.formErrors.amount}
              </span>
            )}
          </div>
          <div className="form-group mt-5">
            <input
              type="file"
              name="image"
              onChange={this.handleChange}
              // value={this.state.image}
            />
          </div>
          <div className="form-group text-center mt-5">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={
                !(
                  this.state.formErrors.description === "" &&
                  this.state.formErrors.amount === "" &&
                  this.state.description !== "" &&
                  this.state.amount !== ""
                )
              }
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentExpense:
      state.categories[state.selectedCategoryIndex]?.expenses[
        state.selectedExpenseIndex
      ],
    currentExpenseIndex: state.selectedExpenseIndex,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    insertExpense: (value) => dispatch(insertExpense(value)),
    editExpense: (value) => dispatch(editExpense(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
