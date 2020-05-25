import React, { useContext, useEffect } from "react";
import "./Playlists.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Context } from "../../store/store";

const TopPlaylists = () => {
  const spotifyWebApi = new Spotify();

  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  async function fetchPlaylists() {
    const res = await spotifyWebApi.getUserPlaylists();

    // console.log(res);

    dispatch({ type: "USER_PLAYLIST", payload: res });
  }

  useEffect(() => {
    fetchPlaylists("long_term");
  }, []);

  console.log(state.userPlaylists);

  return (
    <div className="playlist-container">
      <div className="header-playlists">
        <h1>TopPlaylists</h1>
      </div>
      {state.userPlaylists ? (
        <div className="playlist-lower">
          <div className="playlist">
            {state.userPlaylists.items.map((item) => {
              return (
                <div className="playlist-image-container">
                  <img className="playlist-image" src={item.images[0].url} />
                  <div className="playlist-name">{item.name}</div>
                  <div className="playlist-total-tracks">
                    {item.tracks.total}tracks
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopPlaylists;
