export const INSERT_CATEGORY = "INSERT_CATEGORY";
export const INSERT_EXPENSE = "INSERT_EXPENSE";
export const UPDATE_CURRENTCATEGORY_INDEX = "UPDATE_CURRENTCATEGORY_INDEX";
export const UPDATE_CURRENTEXPENSE_INDEX = "UPDATE_CURRENTEXPENSE_INDEX";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const EDIT_EXPENSE = "EDIT_EXPENSE";
export const INSERT_USER = "INSERT_USER";

export const insertCategory = (data) => {
  return {
    type: INSERT_CATEGORY,
    payload: data,
  };
};

export const insertExpense = (data) => {
  return {
    type: INSERT_EXPENSE,
    payload: data,
  };
};

export const updateCurrentCategoryIndex = (index) => {
  return {
    type: UPDATE_CURRENTCATEGORY_INDEX,
    payload: index,
  };
};
export const updateCurrentExpenseIndex = (index) => {
  return {
    type: UPDATE_CURRENTEXPENSE_INDEX,
    payload: index,
  };
};

export const deleteExpense = (index) => {
  return {
    type: DELETE_EXPENSE,
    payload: index,
  };
};

export const editExpense = (data) => {
  return {
    type: EDIT_EXPENSE,
    payload: data,
  };
};

export const insertUser = (data) => {
  return {
    type: INSERT_USER,
    payload: data,
  };
};
