import React from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

function AddExpense() {
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
          ></textarea>
        </div>
        <div className="form-group mt-4">
          <input type="text" placeholder="Amount" className="form-control" />
        </div>
        <div className="form-group mt-5">
          <input type="file" />
        </div>
        <div className="form-group text-center mt-5">
          <Button variant="contained" type="submit" color="primary">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AddExpense;
