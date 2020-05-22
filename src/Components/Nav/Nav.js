import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
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
          <Link to={{ pathname: `/` }}>
            <FontAwesomeIcon color="white" icon={faUser} />
          </Link>
          <Link to={{ pathname: `/artists` }}>
            <FontAwesomeIcon color="white" icon={faMicrophone} />
          </Link>
          <Link to={{ pathname: `/tracks` }}>
            <FontAwesomeIcon color="white" icon={faMusic} />
          </Link>
          <Link to={{ pathname: `/recent` }}>
            <FontAwesomeIcon color="white" icon={faHistory} />
          </Link>
          <Link to={{ pathname: `/playlists` }}>
            <FontAwesomeIcon color="white" icon={faListUl} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
