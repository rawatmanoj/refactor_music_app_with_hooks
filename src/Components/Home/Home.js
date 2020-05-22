import React from "react";
import Store from "../../store/store";
import Nav from "../Nav/Nav";
import TopArtists from "../TopArtists/TopArtists";
import TopTracks from "../TopTracks/TopTracks";
import Recent from "../Recent/Recent";
import Playlists from "../Playlists/Playlists";

import Profile from "../Profile/Profile";
import "./Home.scss";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <BrowserRouter>
        <Nav />

        <Switch>
          <Route path="/" component={Profile} exact />
          <Route path="/artists" component={TopArtists} exact />
          <Route path="/tracks" component={TopTracks} exact />
          <Route path="/recent" component={Recent} exact />
          <Route path="/playlists" component={Playlists} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Home;
