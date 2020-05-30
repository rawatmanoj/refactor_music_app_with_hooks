import React, { useContext, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import { token } from "../../spotify/spotify";
import { Context } from "../../store/store";
import axios from "axios";
import "./Profile.scss";

const spotifyWebApi = new Spotify();
const Profile = () => {
  spotifyWebApi.setAccessToken(token);
  const [state, dispatch] = useContext(Context);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const fetchUser = async () => {
    const res = await axios.get("https://api.spotify.com/v1/me", { headers });

    dispatch({ type: "USER", payload: res.data });
  };

  const fetchUserPlaylist = async () => {
    const res = await spotifyWebApi.getUserPlaylists();

    dispatch({ type: "USER_PLAYLIST", payload: res });
  };

  const fetchFollowedArtists = async () => {
    const res = await spotifyWebApi.getFollowedArtists();
    console.log(res);
    dispatch({ type: "FOLLOWED_ARTISTS", payload: res });
  };

  useEffect(() => {
    fetchUser();
    fetchUserPlaylist();
    fetchFollowedArtists();
  }, []);

  return (
    <div className="profile-container">
      {state.user && state.userPlaylists ? (
        <div className="profile-info-responsive">
          <div className="profile-info-container">
            <div className="profile-image-container">
              <img className="profile-image" src={state.user.images[0].url} />
            </div>
            <div className="profile-name">
              <h1>{state.user.display_name}</h1>
            </div>
            <div className="profile-info">
              <div className="profile-info-followers">
                <div className="profile-info-total">
                  {state.user.followers.total}
                </div>

                <div className="profile-info-heading"> Followers</div>
              </div>
              <div className="profile-info-following">
                <div className="profile-info-total">
                  {state.followedArtists.artists.total}
                </div>

                <div className="profile-info-heading"> Following</div>
              </div>
              <div className="profile-info-playlists">
                <div className="profile-info-total">
                  {state.userPlaylists.total}
                </div>

                <div className="profile-info-heading"> Playlists</div>
              </div>
            </div>
            <div className="profile-logout">
              <button className="profile-logout-button">LOGOUT</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
