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
  };

  //returns state for Add or Edit based on condition
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
    if (this.props.currentCategoryIndex !== -1) {
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
    } else {
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    //handles image selection
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
      //handles description and amount selection
      const remAmount =
        Number(this.props.currentCategoryRemainingAmount) +
        Number(this.props.currentExpense?.amount);
      console.log(remAmount);
      //validation based on field
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
              : Number(value) > remAmount && this.state.updateMode
              ? "Amount Exceeded "
              : Number(value) >
                  Number(this.props.currentCategoryRemainingAmount) &&
                !this.state.updateMode
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

//redux mapping
const mapStateToProps = (state) => {
  return {
    currentExpense:
      state.categories[state.selectedCategoryIndex]?.expenses[
        state.selectedExpenseIndex
      ],
    currentExpenseIndex: state.selectedExpenseIndex,
    currentCategoryRemainingAmount:
      state.categories[state.selectedCategoryIndex]?.remainingAmount,
    currentCategoryIndex: state.selectedCategoryIndex,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    insertExpense: (value) => dispatch(insertExpense(value)),
    editExpense: (value) => dispatch(editExpense(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
