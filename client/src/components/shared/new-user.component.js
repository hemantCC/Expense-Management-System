import React, { Component } from "react";
import AddCategory from "./add-category.component";

class newUser extends Component {
  constructor() {
    super();
    this.state = {
      setOpen: false,
      name: "",
      amount: "",
      image: [],
    };
  }

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
          <h6 className="mt-5">
            <b>NOTE: </b> You must add atleast one category to proceed forward
          </h6>
        </div>
        <div className="col-md-2 col-sm-2"></div>
        <button onClick={this.current}>Hello</button>
        {this.state.setOpen && (
          <AddCategory
            setOpen={this.state.setOpen}
            onToggle={this.toggleDialog}
          />
        )}
      </div>
    );
  }
}

export default newUser;
