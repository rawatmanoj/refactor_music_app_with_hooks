import React, { useContext, useEffect } from "react";
import "./TopArtists.scss";
import { token } from "../../spotify/spotify";
import axios from "axios";
import Spotify from "spotify-web-api-js";

import { Context } from "../../store/store";
const spotifyWebApi = new Spotify();

const TopArtists = () => {
  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchMyTopArtistsShort = async () => {
      const res = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
        {
          headers,
        }
      );

      console.log(res);
      dispatch({ type: "TOP_ARTISTS_SHORT", payload: res.data });
    };

    const fetchMyTopArtistsMedium = async () => {
      const res = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
        {
          headers,
        }
      );

      console.log(res);
      dispatch({ type: "TOP_ARTISTS_MEDIUM", payload: res.data });
    };

    const fetchMyTopArtistsLong = async () => {
      const res = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
        { headers }
      );
      console.log(res);
      dispatch({ type: "TOP_ARTISTS_LONG", payload: res.data });
    };

    fetchMyTopArtistsShort();
    fetchMyTopArtistsMedium();
    fetchMyTopArtistsLong();
  }, []);

  return (
    <div className="topartists-container">
      <div>TopArtists</div>
      {state.topArtistsLong ? (
        <div className="topartists">
          <div>manoj</div>
        </div>
      ) : null}
    </div>
  );
};

export default TopArtists;
