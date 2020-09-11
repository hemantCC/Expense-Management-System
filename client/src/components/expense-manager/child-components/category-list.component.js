import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import AddCategory from "../../shared/add-category.component";

function CategoryList() {
  const [state, setState] = useState(false);

  function onToggle() {
    setState(!state);
  }

  return (
    <div>
      <h3 className="text-center pt-3">Categories</h3>
      <Divider className="mx-3"></Divider>
      <div className="card c2">
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item">Category 1</li>
          <li className="list-group-item">Category 2</li>
          <li className="list-group-item">Category 3</li>
        </ul>
      </div>
      <Divider className="mx-3"></Divider>
      <div className="text-center mt-4">
        <img
          src={require("../../../assets/application-images/add-category.png")}
          height="80px"
          onClick={onToggle}
          alt="addCategoryIcon"
        />
        <div className="text-center">Add Category</div>
      </div>

      {state && <AddCategory onToggle={onToggle} setOpen={state} />}
    </div>
  );
}
export default CategoryList;
