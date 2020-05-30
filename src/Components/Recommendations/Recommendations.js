import React, { useContext, useEffect } from "react";
import "./Recommendations.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../../store/store";
const spotifyWebApi = new Spotify();
const Recommendations = () => {
  spotifyWebApi.setAccessToken(token);
  const params = new useParams();
  const [state, dispatch] = useContext(Context);

  async function fetchRecommendations() {
    const res = await spotifyWebApi.getPlaylistTracks(params.playlistId);
    console.log(res);

    const recTracks = res.items
      .map((item) => {
        return item.track.id;
      })
      .slice(0, 5)
      .join(",");

    console.log(recTracks);

    const res2 = await spotifyWebApi.getRecommendations({
      seed_tracks: recTracks,
    });

    console.log(res2);

    dispatch({ type: "RECOMMENDATIONS", payload: res2 });
  }

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-conatiner">
      {state.recommendations ? (
        <div className="recommendations-lower">
          <div className="recommendations">
            {state.recommendations.tracks.map((item) => {
              return (
                <Link
                  style={{
                    textDecoration: "inherit",
                    color: "inherit",
                    margin: "2rem",
                  }}
                  to={{ pathname: `/track/${item.id}` }}
                >
                  <div className="recommendations-div-container">
                    <div className="recommendations-image-container">
                      <img
                        className="recommendations-image"
                        src={item.album.images[0].url}
                      />
                    </div>
                    <div className="recommendations-info">
                      <div className="recommendations-name">{item.name}</div>
                      <div className="recommendations-artists-container">
                        {item.artists.map((artist) => (
                          <div>{artist.name} | </div>
                        ))}
                        <div>{item.album.name}</div>
                      </div>
                    </div>
                    <div className="recommendations-time">
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

export default Recommendations;
