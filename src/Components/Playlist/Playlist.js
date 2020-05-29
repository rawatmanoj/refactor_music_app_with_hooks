import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Context } from "../../store/store";
import "./Playlist.scss";
import { Link } from "react-router-dom";

const spotifyWebApi = new Spotify();

const Playlist = () => {
  const [state, dispatch] = useContext(Context);

  spotifyWebApi.setAccessToken(token);

  const params = new useParams();

  async function fetchPlaylistTracks() {
    const res = await spotifyWebApi.getPlaylistTracks(params.playlistId);
    const res2 = await spotifyWebApi.getPlaylist(params.playlistId);

    console.log(res);
    console.log(res2);

    dispatch({ type: "PLAYLIST_TRACKS", payload: res });
    dispatch({ type: "PLAYLIST", payload: res2 });
  }

  useEffect(() => {
    fetchPlaylistTracks();
  }, []);

  return (
    <div className="innerplaylist-container">
      <div className="innerplaylist">
        {state.playlist ? (
          <div className="innerplaylist-left-container">
            <div className="innerplaylist-left-div-container">
              <img
                className="innerplaylist-image"
                src={state.playlist.images[0].url}
              />
            </div>
            <div className="innerplaylist-left-name">{state.playlist.name}</div>
            <div className="innerplaylist-left-description">
              {state.playlist.description}
            </div>
            <div className="innerplaylist-left-total-tracks">
              {state.playlist.tracks.total} tracks
            </div>
          </div>
        ) : null}
        <div className="innerplaylist-right-conatiner">
          <div className="innerplaylist-right-lower">
            {state.playlistTracks ? (
              <div className="innerplaylist-right">
                {state.playlistTracks.items.map((item) => {
                  return (
                    <Link
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                        margin: "2rem",
                      }}
                      to={{ pathname: `/track/${item.id}` }}
                    >
                      <div className="innerplaylist-right-div-container">
                        <div className="innerplaylist-right-image-container">
                          <img
                            className="innerplaylist-right-image"
                            src={item.track.album.images[0].url}
                          />
                        </div>
                        <div className="innerplaylist-right-info">
                          <div className="innerplaylist-right-name">
                            {item.track.name}
                          </div>
                          <div className="innerplaylist-right-artists-container">
                            {item.track.artists.map((artist) => (
                              <div>{artist.name} | </div>
                            ))}
                            <div>{item.track.album.name}</div>
                          </div>
                        </div>
                        <div className="innerplaylist-right-time">
                          {(item.track.duration_ms / (1000 * 60)).toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
