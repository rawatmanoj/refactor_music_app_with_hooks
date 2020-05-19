import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Components/Home/Home";
import Store from "../store/store";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

const App = () => {
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  const params = getHashParams();
  const token = params.access_token;

  return (
    // <BrowserRouter>
    //   <>
    //     <Switch>
    //       <Store>
    //         <Route path="/" component={Home} exact />
    //       </Store>
    //     </Switch>
    //   </>
    // </BrowserRouter>
    <div> {token ? <Home /> : null}</div>
  );
};

export default App;
