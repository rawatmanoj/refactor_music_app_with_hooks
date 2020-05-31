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
          <div className="nav-button-container">
            <Link className="nav-button" to={{ pathname: `/` }}>
              <FontAwesomeIcon color="white" icon={faUser} />
            </Link>
            <div className="nav-name"> Profile</div>
          </div>
          <div className="nav-button-container">
            <Link className="nav-button" to={{ pathname: `/artists` }}>
              <FontAwesomeIcon color="white" icon={faMicrophone} />
            </Link>
            <div className="nav-name"> Artists</div>
          </div>
          <div className="nav-button-container">
            <Link className="nav-button" to={{ pathname: `/tracks` }}>
              <FontAwesomeIcon color="white" icon={faMusic} />
            </Link>
            <div className="nav-name"> Tracks</div>
          </div>
          <div className="nav-button-container">
            <Link className="nav-button" to={{ pathname: `/recent` }}>
              <FontAwesomeIcon color="white" icon={faHistory} />
            </Link>
            <div className="nav-name"> Recent</div>
          </div>
          <div className="nav-button-container">
            <Link className="nav-button" to={{ pathname: `/playlists` }}>
              <FontAwesomeIcon color="white" icon={faListUl} />
            </Link>
            <div className="nav-name"> Playlists</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
