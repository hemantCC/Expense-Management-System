import React from "react";
import Divider from "@material-ui/core/Divider";
function ExpenseList() {
  return (
    <div>
      <h3 className="text-center pt-3">Expense List</h3>
      <Divider className="mx-3"></Divider>
      <div className="row">
        <div className="col-6 text-center">Total Amount : 5000</div>
        <div className="col-6 text-center">Remaining Amount : 2000</div>
      </div>
      <Divider className="mx-3"></Divider>
      <div className="row justify-content-center mt-4">
        <div className="card c1 text-white bg-info mb-3">
          <div className="card-header ">
            <span>Header</span>
            <i className="fa fa-trash float-right"></i>
            <i className="fa fa-pencil mr-3 float-right"></i>
          </div>
          <div className="card-body">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card c1 text-white bg-info mb-3">
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card c1 text-white bg-info mb-3">
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExpenseList;
