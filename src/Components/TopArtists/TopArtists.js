import React, { useContext, useEffect } from "react";
import "./TopArtists.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

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
    dispatch({ type: "LOADING", payload: true });
    const res = await spotifyWebApi.getMyTopArtists({
      time_range: `${range}`,
    });
    dispatch({ type: "RANGE", payload: range });
    dispatch({ type: "TOP_ARTISTS", payload: res });
    dispatch({ type: "LOADING", payload: false });
  };

  const handleClick = (range) => {
    fetchTopArtists(range);
  };

  if (state.topArtists) {
    console.log(state.topArtists);
  }

  return (
    <div className="topartists-container">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="header">
            <div className="header-topartists">
              <h1>TopArtists</h1>
            </div>
            <div className="header-timer">
              <button
                onClick={() => handleClick("long_term")}
                className={
                  "header-button " +
                  (state.range === "long_term" ? "header-button-active" : "")
                }
              >
                All Time
              </button>
              <button
                onClick={() => handleClick("medium_term")}
                className={
                  "header-button " +
                  (state.range === "medium_term" ? "header-button-active" : "")
                }
              >
                Last 6 Months
              </button>
              <button
                onClick={() => handleClick("short_term")}
                className={
                  "header-button " +
                  (state.range === "short_term" ? "header-button-active" : "")
                }
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
                    <div key={item.id} className="topartist-image-container">
                      <Link to={{ pathname: `/artist/${item.id}` }}>
                        <img
                          className="topartists-image"
                          src={item.images[0].url}
                        />
                      </Link>
                      <div className="topartists-name">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TopArtists;
