import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpen: this.props.setOpen,
    };
  }

  onToggle = () => {
    this.props.onToggle(!this.state.setOpen);
    this.setState({ setOpen: !this.state.setOpen });
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
              name="name"
              // onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="amount"
              label="Max Amount"
              type="text"
              name="amount"
              fullWidth
              // onChange={this.handleChange}
            />
            <input
              type="file"
              name="image"
              className="mt-4"
              // onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onToggle} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddCategory;
