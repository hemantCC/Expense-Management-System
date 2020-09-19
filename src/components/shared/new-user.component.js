import React, { Component } from "react";
import AddCategory from "./add-category.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class newUser extends Component {
  constructor() {
    super();
    this.state = {
      setOpen: false,
    };
  }

  //handles popup open and close
  toggleDialog = () => {
    this.setState({ setOpen: !this.state.setOpen });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-2 col-sm-2"></div>
        <div className="col-md-8 col-sm-8 formStyle text-center">
          <img
            src={require("../../assets/application-images/add-category.png")}
            height="80px"
            onClick={this.toggleDialog}
            alt="addCategoryIcon"
          />
          <div className="display-4">Add Category</div>

          {this.props.categories.length > 0 && (
            <>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th></th>
                    <th>Category Name</th>
                    <th>Max Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.categories?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={item.image}
                            className="img"
                            alt="category-img"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Link className="btn btn-primary" to="/dashboard">
                Proceed To Dashboard
              </Link>
            </>
          )}
          <h6 className="mt-5">
            <b>NOTE: </b> You must add atleast one category to proceed forward
          </h6>
        </div>
        <div className="col-md-2 col-sm-2"></div>
        {this.state.setOpen && <AddCategory onToggle={this.toggleDialog} />}
      </div>
    );
  }
}

//mapping to redux
const mapStateToProps = (state) => {
  return {
    categories: Array.from(state.categories),
  };
};

export default connect(mapStateToProps)(newUser);
