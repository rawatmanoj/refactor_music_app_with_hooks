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

    // console.log(res);

    dispatch({ type: "USER_PLAYLIST", payload: res });
  };

  const fetchMyTopArtistsShort = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
      {
        headers,
      }
    );

    //  console.log(res);
    dispatch({ type: "TOP_ARTISTS_SHORT", payload: res.data });
  };

  const fetchMyTopArtistsMedium = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
      {
        headers,
      }
    );

    // console.log(res);
    dispatch({ type: "TOP_ARTISTS_MEDIUM", payload: res.data });
  };

  const fetchMyTopArtistsLong = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
      { headers }
    );
    //  console.log(res);
    dispatch({ type: "TOP_ARTISTS_LONG", payload: res.data });
  };

  const fetchTopTracksShort = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
      { headers }
    );

    //  console.log(res);
    dispatch({ type: "TOP_TRACKS_SHORT", payload: res.data });
  };

  const fetchTopTracksMedium = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
      {
        headers,
      }
    );
    //console.log(res);
    dispatch({ type: "TOP_TRACKS_MEDIUM", payload: res.data });
  };

  const fetchTopTracksLong = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
      { headers }
    );

    //  console.log(res);
    dispatch({ type: "TOP_TRACKS_LONG", payload: res.data });
  };

  useEffect(() => {
    fetchUser();
    fetchUserPlaylist();
    fetchMyTopArtistsShort();
    fetchMyTopArtistsMedium();
    fetchMyTopArtistsLong();
    fetchTopTracksShort();
    fetchTopTracksMedium();
    fetchTopTracksLong();
  }, []);

  if (state.topArtistsLong) {
    // console.log(state.topArtistsLong);
  }
  console.log("profile");
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
      {/* {state.topArtistsLong ? (
        <div className="profile-top-container">
          <div className="profile-top-artists">
            <h1>Top Artists of All Time</h1>
            {state.topArtistsLong.items.map((item) => {
              return (
                <div className="profile-topartist-container">
                  <div className="profile-image-container">
                    {
                      <img
                        className="topartist-image"
                        src={item.images[0].url}
                      />
                    }
                  </div>
                  <div>gvsedgvsd</div>
                </div>
              );
            })}
          </div>
          <div className="profile-top-tracks">
            <h1>Top Tracks of All Time</h1>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default Profile;
