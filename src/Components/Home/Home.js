import React from "react";
import Store from "../../store/store";
import SpotifyWebApi from "spotify-web-api-js";
import Nav from "../Nav/Nav";
import Profile from "../Profile/Profile";
import "./Home.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <Nav />
      <BrowserRouter>
        <>
          <Switch>
            <Store>
              <Route path="/" component={Profile} exact />
            </Store>
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
};

export default Home;
