import React, { useContext, useEffect } from "react";
import Spotify from "spotify-web-api-js";
import { token } from "../../spotify/spotify";
import { Context } from "../../store/store";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
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
    dispatch({ type: "LOADING", payload: true });
    const res = await axios.get("https://api.spotify.com/v1/me", { headers });

    dispatch({ type: "USER", payload: res.data });

    dispatch({ type: "LOADING", payload: false });
  };

  const fetchUserPlaylist = async () => {
    dispatch({ type: "LOADING", payload: true });
    const res = await spotifyWebApi.getUserPlaylists();

    dispatch({ type: "USER_PLAYLIST", payload: res });
    dispatch({ type: "LOADING", payload: false });
  };

  const fetchFollowedArtists = async () => {
    //
    dispatch({ type: "LOADING", payload: true });

    const res = await spotifyWebApi.getFollowedArtists();

    dispatch({ type: "FOLLOWED_ARTISTS", payload: res });
    dispatch({ type: "LOADING", payload: false });
  };

  useEffect(() => {
    fetchUser();
    fetchUserPlaylist();

    fetchFollowedArtists();
  }, []);

  return (
    <div className="profile-container">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <>
          {state.user && state.userPlaylists ? (
            <div className="profile-info-responsive">
              <div className="profile-info-container">
                <div className="profile-image-container">
                  <img
                    className="profile-image"
                    src={state.user.images[0].url}
                  />
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
                    {state.followedArtists ? (
                      <div className="profile-info-total">
                        {state.followedArtists.artists.total}
                      </div>
                    ) : null}

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
        </>
      )}
    </div>
  );
};

export default Profile;
