import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";
import { insertCategory } from "../../redux/actions/expense.action";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: true,
      name: "",
      amount: null,
      image: "",
      expenses: [],
      isDisabled: false,
      formErrors: {
        name: "",
        amount: "",
      },
    };
  }

  onToggle = () => {
    this.props.onToggle(!this.state.setOpen);
    this.setState({ setOpen: !this.state.setOpen });
  };

  handleSubmit = () => {
    this.setState({ setOpen: !this.state.setOpen });
    this.props.insertCategory(this.state);
    this.props.onToggle(!this.state.setOpen);
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
        case "name":
          formErrors.name =
            value.length < 3 ? "minimum 3 characters required" : "";
          break;
        case "amount":
          formErrors.amount =
            value.length < 1
              ? "Amount required"
              : /\D/.test(value)
              ? "Only Numbers"
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
        <Dialog
          open={this.state.setOpen}
          onClose={this.onToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="text"
              fullWidth
              required
              name="name"
              onChange={this.handleChange}
            />
            {this.state.formErrors.name.length > 0 && (
              <span className="text-danger">{this.state.formErrors.name}</span>
            )}
            <TextField
              margin="dense"
              id="amount"
              label="Max Amount"
              type="text"
              name="amount"
              fullWidth
              required
              onChange={this.handleChange}
            />
            {this.state.formErrors.amount.length > 0 && (
              <span className="text-danger">
                {this.state.formErrors.amount}
              </span>
            )}

            <input
              type="file"
              name="image"
              className="mt-4"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onToggle} color="primary">
              Cancel
            </Button>

            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={
                !(
                  this.state.formErrors.name === "" &&
                  this.state.formErrors.amount === "" &&
                  this.state.name !== "" &&
                  this.state.amount !== ""
                )
              }
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertCategory: (value) => dispatch(insertCategory(value)),
  };
};
export default connect(null, mapDispatchToProps)(AddCategory);
