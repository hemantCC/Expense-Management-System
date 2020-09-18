import {
  DELETE_EXPENSE,
  DISABLE_CATEGORY,
  EDIT_EXPENSE,
  INSERT_CATEGORY,
  INSERT_EXPENSE,
  INSERT_USER,
  UPDATE_CURRENTCATEGORY_INDEX,
  UPDATE_CURRENTEXPENSE_INDEX,
  UPDATE_MAXAMOUNT,
} from "../actions/expense.action";

export const expenseReducer = (state, action) => {
  const categories = JSON.parse(localStorage.getItem("categories"));
  switch (action.type) {
    case INSERT_CATEGORY:
      delete action.payload.formErrors;
      delete action.payload.setOpen;
      action.payload.remainingAmount = action.payload.amount;
      categories.push(action.payload);
      localStorage.setItem("categories", JSON.stringify(categories));
      return { categories: categories };
    case INSERT_EXPENSE:
      const prevRemaining =
        categories[state.selectedCategoryIndex].remainingAmount;
      categories[state.selectedCategoryIndex].remainingAmount =
        prevRemaining - action.payload.amount;
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
      const amount =
        categories[state.selectedCategoryIndex].expenses[action.payload].amount;
      categories[state.selectedCategoryIndex].remainingAmount =
        Number(categories[state.selectedCategoryIndex].remainingAmount) +
        Number(amount);
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
      const amt =
        categories[state.selectedCategoryIndex].expenses[
          state.selectedExpenseIndex
        ].amount;
      categories[state.selectedCategoryIndex].remainingAmount =
        Number(state.categories[state.selectedCategoryIndex].remainingAmount) +
        Number(amt) -
        Number(action.payload.amount);
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
      delete action.payload.showError;
      delete action.payload.showSuccess;
      users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(users));
      return {
        users: users,
      };
    case UPDATE_MAXAMOUNT:
      const prevSpent =
        Number(categories[state.selectedCategoryIndex].amount) -
        Number(categories[state.selectedCategoryIndex].remainingAmount);
      categories[state.selectedCategoryIndex].amount = action.payload;
      categories[state.selectedCategoryIndex].remainingAmount =
        Number(action.payload) - Number(prevSpent);
      localStorage.setItem("categories", JSON.stringify(categories));
      return {
        categories: categories,
        selectedCategoryIndex: state.selectedCategoryIndex,
      };
    case DISABLE_CATEGORY:
      categories[state.selectedCategoryIndex].isDisabled = action.payload;
      localStorage.setItem("categories", JSON.stringify(categories));
      return {
        categories: categories,
        selectedCategoryIndex:
          action.payload === false ? state.selectedCategoryIndex : -1,
      };
    default:
      return state;
  }
};
