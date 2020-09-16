import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  INSERT_CATEGORY,
  INSERT_EXPENSE,
  INSERT_USER,
  UPDATE_CURRENTCATEGORY_INDEX,
  UPDATE_CURRENTEXPENSE_INDEX,
} from "../actions/expense.action";

export const expenseReducer = (state, action) => {
  const categories = JSON.parse(localStorage.getItem("categories"));
  switch (action.type) {
    case INSERT_CATEGORY:
      categories.push(action.payload);
      localStorage.setItem("categories", JSON.stringify(categories));
      return { categories: categories };
    case INSERT_EXPENSE:
      categories[state.selectedCategoryIndex].expenses.push(action.payload);
      localStorage.setItem("categories", JSON.stringify(categories));
      return {
        categories: categories,
        selectedCategoryIndex: state.selectedCategoryIndex,
        selectedExpenseIndex: -1,
      };
    case UPDATE_CURRENTCATEGORY_INDEX:
      localStorage.setItem("currentCategory", action.payload);
      return {
        categories: categories,
        selectedCategoryIndex: action.payload,
        selectedExpenseIndex: -1,
      };
    case UPDATE_CURRENTEXPENSE_INDEX:
      localStorage.setItem("currentExpense", JSON.stringify(action.payload));
      return {
        categories: categories,
        selectedExpenseIndex: action.payload,
        selectedCategoryIndex: state.selectedCategoryIndex,
      };
    case DELETE_EXPENSE:
      categories[state.selectedCategoryIndex].expenses.splice(
        action.payload,
        1
      );
      localStorage.setItem("categories", JSON.stringify(categories));
      return {
        categories: categories,
        selectedCategoryIndex: state.selectedCategoryIndex,
        selectedExpenseIndex: -1,
      };
    case EDIT_EXPENSE:
      categories[state.selectedCategoryIndex].expenses[
        state.selectedExpenseIndex
      ] = action.payload;
      localStorage.setItem("categories", JSON.stringify(categories));
      localStorage.setItem("currentExpense", JSON.stringify(-1));
      return {
        categories: categories,
        selectedCategoryIndex: state.selectedCategoryIndex,
        selectedExpenseIndex: -1,
      };
    case INSERT_USER:
      const users = JSON.parse(localStorage.getItem("users"));
      delete action.payload.formErrors;
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
      return {
        users: users,
      };
    default:
      return state;
  }
};
