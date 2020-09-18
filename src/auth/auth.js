const isAuthorized = () => {
  return JSON.parse(localStorage.getItem("loggedUser")) !== null
    ? console.log("authorised")
    : console.log("NOT authorised");
};

export default isAuthorized;
