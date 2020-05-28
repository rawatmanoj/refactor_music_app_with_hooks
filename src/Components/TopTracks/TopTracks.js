import React, { useContext, useEffect } from "react";
import "./TopTracks.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Link } from "react-router-dom";

import { Context } from "../../store/store";
const spotifyWebApi = new Spotify();

const TopTracks = () => {
  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    fetchTopTracks("long_term");
  }, []);

  const fetchTopTracks = async (range) => {
    // console.log(range);
    const res = await spotifyWebApi.getMyTopTracks({
      time_range: `${range}`,
    });

    dispatch({ type: "RANGE", payload: range });
    dispatch({ type: "TOP_TRACKS", payload: res });
  };

  const handleClick = (range) => {
    fetchTopTracks(range);
  };

  //console.log(state);

  if (state.range) {
    console.log(state.range);
  }

  return (
    <div className="toptracks-container">
      <div className="header">
        <div className="header-toptracks">
          <h1>
            <strong>TopTracks</strong>
          </h1>
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
      {state.topTracks ? (
        <div className="toptracks-lower">
          <div className="toptracks">
            {state.topTracks.items.map((item) => {
              return (
                <Link
                  style={{
                    textDecoration: "inherit",
                    color: "inherit",
                    margin: "2rem",
                  }}
                  to={{ pathname: `/track/${item.id}` }}
                >
                  <div className="toptracks-div-container">
                    <div className="toptracks-image-container">
                      <img
                        className="toptracks-image"
                        src={item.album.images[0].url}
                      />
                    </div>
                    <div className="toptracks-info">
                      <div className="toptracks-name">{item.name}</div>
                      <div className="toptracks-artists-container">
                        {item.artists.map((artist) => (
                          <div>{artist.name} | </div>
                        ))}
                        <div>{item.album.name}</div>
                      </div>
                    </div>
                    <div className="toptracks-time">
                      {(item.duration_ms / (1000 * 60)).toFixed(2)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopTracks;
