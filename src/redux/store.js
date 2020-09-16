import { createStore } from "redux";
import { expenseReducer } from "./reducers/expense.reducer";

if (JSON.parse(localStorage.getItem("categories")) === null) {
  localStorage.setItem("categories", JSON.stringify([]));
}
if (JSON.parse(localStorage.getItem("users")) === null) {
  localStorage.setItem("users", JSON.stringify([]));
}
if (JSON.parse(localStorage.getItem("currentCategory")) === null) {
  localStorage.setItem("currentCategory", JSON.stringify(-1));
}
if (JSON.parse(localStorage.getItem("currentExpense")) === null) {
  localStorage.setItem("currentExpense", JSON.stringify(-1));
}
let initialState = {
  categories: JSON.parse(localStorage.getItem("categories")),
  selectedCategoryIndex: JSON.parse(localStorage.getItem("currentCategory")),
  selectedExpenseIndex: JSON.parse(localStorage.getItem("currentExpense")),
  users: JSON.parse(localStorage.getItem("users")),
};

export const store = createStore(expenseReducer, initialState);
