import React from "react";
import Home from "../Components/Home/Home";
import { token } from "../utils/utils";
import Login from "../Components/Login/login";

const App = () => {
  console.log(token);
  return <div className="app-container"> {token ? <Home /> : <Login />} </div>;
};

export default App;
