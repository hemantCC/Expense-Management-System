import React, { Component } from "react";
import AddCategory from "./add-category.component";
import { Link } from "react-router-dom";

class newUser extends Component {
  constructor() {
    super();
    this.state = {
      setOpen: false,
      name: "",
      amount: null,
      image: "",
      categories: [
        {
          expenses: [
            {
              description: "",
              amount: null,
              image: "",
            },
          ],
        },
      ],
    };
  }

  componentDidMount = () => {
    this.setState({
      categories: JSON.parse(localStorage.getItem("categories")),
    });
  };

  toggleDialog = () => {
    this.setState({ setOpen: !this.state.setOpen });
  };

  onSubmit = (value) => {
    delete value.setOpen;
    if (JSON.parse(localStorage.getItem("categories")) == null) {
      localStorage.setItem("categories", JSON.stringify([]));
    }
    var categories = JSON.parse(localStorage.getItem("categories"));
    categories.push(value);
    localStorage.setItem("categories", JSON.stringify(categories));
    this.setState({
      categories: categories,
    });
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

          {this.state.categories && (
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
                  {this.state.categories.map((item, index) => {
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
        {this.state.setOpen && (
          <AddCategory
            setOpen={this.state.setOpen}
            onToggle={this.toggleDialog}
            onsubmit={this.onSubmit}
          />
        )}
      </div>
    );
  }
}

export default newUser;
