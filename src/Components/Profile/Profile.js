import React, { useContext, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import { token } from "../../utils/utils";
import { Context } from "../../store/store";
import axios from "axios";
import "./Profile.scss";

const spotifyWebApi = new Spotify();
const Profile = () => {
  spotifyWebApi.setAccessToken(token);
  const [state, dispatch] = useContext(Context);

  const fetchUser = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios.get("https://api.spotify.com/v1/me", { headers });

    dispatch({ type: "USER", payload: res.data });
  };

  const fetchUserPlaylist = async () => {
    const res = await spotifyWebApi.getUserPlaylists();

    console.log(res);

    dispatch({ type: "USER_PLAYLIST", payload: res });
  };

  const fetchMyTopArtists = async () => {
    const res = await spotifyWebApi.getMyTopArtists();
    // console.log(res);

    console.log(res);
    // dispatch({ type: "TOP_ARTISTS", payload: res });
  };

  useEffect(() => {
    fetchUser();
    fetchUserPlaylist();
    fetchMyTopArtists();
  }, []);

  return (
    <div className="profile-container">
      {state.user && state.userPlaylists ? (
        <div className="profile-info-container">
          <div className="profile-image-container">
            <img className="profile-image" src={state.user.images[0].url} />
          </div>
          <div className="profile-name">
            <h1>{state.user.display_name}</h1>
          </div>
          <div className="profile-info">
            <div className="profile-info-followers">
              Followers
              <br />
              {state.user.followers.total}
            </div>
            <div className="profile-info-following"></div>
            <div className="profile-info-playlists">
              Playlists
              <br />
              {state.userPlaylists.total}
            </div>
          </div>
          <div className="profile-logout">
            <button className="profile-logout-button">Logout</button>
          </div>
        </div>
      ) : null}
      <div className="profile-top-container">
        <div className="profile-top-artists">
          <h1>Top Artists of All Time</h1>
        </div>
        <div className="profile-top-tracks">
          <h1>Top Tracks of All Time</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
