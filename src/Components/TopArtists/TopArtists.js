import React, { useContext, useEffect } from "react";
import "./TopArtists.scss";
import { token } from "../../spotify/spotify";
import { Button } from "react-bootstrap";
import axios from "axios";
import Spotify from "spotify-web-api-js";

import { Context } from "../../store/store";
const spotifyWebApi = new Spotify();

const TopArtists = () => {
  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    fetchTopArtists("long_term");
  }, []);

  const fetchTopArtists = async (range) => {
    // console.log(range);
    const res = await spotifyWebApi.getMyTopArtists({
      time_range: `${range}`,
    });
    dispatch({ type: "RANGE", payload: range });
    dispatch({ type: "TOP_ARTISTS", payload: res });
  };

  const handleClick = (range) => {
    fetchTopArtists(range);
  };

  if (state.topArtists) {
    console.log(state.topArtists);
  }

  return (
    <div className="topartists-container">
      <div className="header">
        <div className="header-topartists">
          <h1>TopArtists</h1>
        </div>
        <div className="header-timer">
          <button
            onClick={() => handleClick("long_term")}
            className="header-button"
          >
            All Time
          </button>
          <button
            onClick={() => handleClick("medium_term")}
            className="header-button"
          >
            Last 6 Months
          </button>
          <button
            onClick={() => handleClick("short_term")}
            className="header-button"
          >
            Last 4 Weeks
          </button>
        </div>
      </div>
      {state.topArtists ? (
        <div className="topartist-lower">
          <div className="topartist">
            {state.topArtists.items.map((item) => {
              return (
                <div className="topartist-image-container">
                  <img className="topartists-image" src={item.images[0].url} />
                  <div className="topartists-name">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopArtists;
