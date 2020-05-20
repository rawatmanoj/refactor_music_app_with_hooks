import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMicrophone,
  faMusic,
  faHistory,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

import "./Nav.scss";
const Nav = () => {
  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="nav-icons-container">
          <FontAwesomeIcon color="white" icon={faUser} />
          <FontAwesomeIcon color="white" icon={faMicrophone} />
          <FontAwesomeIcon color="white" icon={faMusic} />
          <FontAwesomeIcon color="white" icon={faHistory} />
          <FontAwesomeIcon color="white" icon={faListUl} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
