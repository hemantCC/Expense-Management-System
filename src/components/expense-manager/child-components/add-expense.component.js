import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {
  insertExpense,
  editExpense,
} from "../../../redux/actions/expense.action";
import { connect } from "react-redux";

class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      amount: "",
      image: "",
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
      this.props.insertExpense(this.state);
    } else {
      console.log("edit");
      this.props.editExpense(this.state);
    }
    e.preventDefault();
  };

  handleChange = (e) => {
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
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  render() {
    return (
      <div>
        <h3 className="text-center pt-3">Add Expense</h3>
        <Divider className="mx-2"></Divider>
        <form className="px-4">
          <div className="form-group mt-4">
            <textarea
              className="form-control"
              placeholder="Description"
              rows="4"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group mt-4">
            <input
              type="text"
              placeholder="Amount"
              className="form-control"
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
              onClick={this.handleSubmit}
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
