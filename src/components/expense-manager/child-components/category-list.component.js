import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import AddCategory from "../../shared/add-category.component";
import { connect } from "react-redux";
import { updateCurrentCategoryIndex } from "../../../redux/actions/expense.action";

function CategoryList({
  categories,
  updateCurrentCategoryIndex,
  selectedCategory,
}) {
  const [state, setState] = useState(false);

  function onToggle() {
    setState(!state);
  }

  return (
    <div>
      <h3 className="text-center pt-3">Categories</h3>
      <Divider className="mx-3"></Divider>
      <div className="card c2">
        <ul className="list-group list-group-flush">
          {categories?.map((item, index) => {
            return (
              <li
                className={`list-group-item px-5
                  ${
                    selectedCategory === index && !item.isDisabled
                      ? "bg-info"
                      : ""
                  } ${item.isDisabled ? "bg-secondary" : ""}`}
                style={{
                  pointerEvents:
                    window.location.pathname === "/expenseManager" &&
                    item.isDisabled
                      ? "none"
                      : "auto",
                }}
                key={index}
                onClick={() => updateCurrentCategoryIndex(index)}
              >
                {item.image === "" && (
                  <img
                    src={require("../../../assets/application-images/no-image.png")}
                    className="img float-left rounded"
                    alt="no-img"
                  />
                )}
                {item.image !== "" && (
                  <img
                    src={item.image}
                    className="img float-left rounded"
                    alt="category-img"
                  />
                )}
                <div className="float-right ">{item.name}</div>
              </li>
            );
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

      {state && <AddCategory onToggle={onToggle} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: Array.from(state.categories),
    selectedCategory: state.selectedCategoryIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentCategoryIndex: (index) =>
      dispatch(updateCurrentCategoryIndex(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
