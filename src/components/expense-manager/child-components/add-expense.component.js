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
      ...this.returnStateProperties(),
      formErrors: {
        description: "",
        amount: "",
      },
      updateMode: false,
    };
  }

  componentDidUpdate = (previousProps, previousState) => {
    // if (
    //   JSON.stringify(this.props.currentExpense) !==
    //   JSON.stringify(previousState)
    // ) {
    //   console.log("update state");
    //   this.setState({
    //     ...this.props.currentExpense,
    //   });
    // }

    // console.log(
    //   this.props.currentExpenseIndex !== -1 && this.state.updateMode === false
    // );
    // if (
    //   this.props.currentExpenseIndex !== -1 &&
    //   this.state.updateMode === false
    // )
    //   this.setState({ updateMode: true });
    if (
      this.props.currentExpenseIndex !== -1 &&
      this.state.updateMode === false
    ) {
      console.log("update state");
      this.setState({
        ...this.props.currentExpense,
        updateMode: true,
      });
    }

    // console.log(this.state);
    // console.log(this.currentExpenseIndex);
    // if (this.props.currentExpenseIndex !== -1) {
    //   window.location.reload();
    // }
  };

  returnStateProperties() {
    if (this.props.currentExpenseIndex === -1) {
      return {
        description: "",
        amount: "",
        image: "",
      };
    } else {
      return this.props.currentExpense;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.currentExpenseIndex === -1) {
      console.log(this.state.image);
      this.props.insertExpense(this.state);
    } else {
      this.props.editExpense(this.state);
    }
    this.setState({
      description: "",
      amount: "",
      image: "",
      formErrors: {
        description: "",
        amount: "",
      },
      updateMode: false,
    });
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
      const remAmount =
        Number(this.props.currentCategoryRemainingAmount) -
        Number(this.props.currentExpense?.amount);
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
              : Number(value) > remAmount
              ? "Amount Exceeded "
              : Number(value) >
                Number(this.props.currentCategoryRemainingAmount)
              ? "Amount limit Exceeded"
              : "";

          break;
        default:
          break;
      }

      this.setState({
        formErrors,
        [name]: value,
      });
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
              required
              name="description"
              label="Description"
              error={this.state.formErrors.description.length > 0}
              helperText={this.state.formErrors.description}
              multiline
              rows={2}
              rowsMax={4}
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group mt-4">
            <TextField
              type="text"
              label="Amount"
              required
              error={this.state.formErrors.amount.length > 0}
              helperText={this.state.formErrors.amount}
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group mt-5">
            <input
              type="file"
              name="image"
              onChange={this.handleChange}
              value={this.state.image}
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
    currentCategoryRemainingAmount:
      state.categories[state.selectedCategoryIndex]?.remainingAmount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    insertExpense: (value) => dispatch(insertExpense(value)),
    editExpense: (value) => dispatch(editExpense(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
