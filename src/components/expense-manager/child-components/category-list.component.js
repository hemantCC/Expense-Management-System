import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import AddCategory from "../../shared/add-category.component";

function CategoryList() {
  const [state, setState] = useState(false);
  const [category, setCategory] = useState([{}]);

  function onToggle() {
    setState(!state);
  }

  useEffect(() => {
    var categories = JSON.parse(localStorage.getItem("categories"));
    setCategory(categories);
  }, [state]);

  function onSubmit(value) {
    delete value.setOpen;
    if (JSON.parse(localStorage.getItem("categories")) == null) {
      localStorage.setItem("categories", JSON.stringify([]));
    }
    var categories = JSON.parse(localStorage.getItem("categories"));
    categories.push(value);
    localStorage.setItem("categories", JSON.stringify(categories));
    setCategory(categories);
  }

  return (
    <div>
      <h3 className="text-center pt-3">Categories</h3>
      <Divider className="mx-3"></Divider>
      <div className="card c2">
        <ul className="list-group list-group-flush text-center">
          {category?.map((item, index) => {
            return <li className="list-group-item">{item.name}</li>;
          })}
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

      {state && (
        <AddCategory onToggle={onToggle} setOpen={state} onsubmit={onSubmit} />
      )}
    </div>
  );
}
export default CategoryList;
