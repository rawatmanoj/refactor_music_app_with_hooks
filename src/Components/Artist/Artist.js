import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Context } from "../../store/store";

import "./Artist.scss";

const spotifyWebApi = new Spotify();

const Artist = () => {
  const [state, dispatch] = useContext(Context);

  spotifyWebApi.setAccessToken(token);

  const params = new useParams();

  // console.log(params.artistId);

  async function fetchArtist() {
    const res = await spotifyWebApi.getArtist(params.artistId);

    // console.log(res2);

    dispatch({ type: "ARTIST", payload: res });
  }

  async function fetchIsFollowing() {
    const res = await spotifyWebApi.isFollowingArtists([params.artistId]);
    dispatch({ type: "IS_FOLLOWING_ARTIST", payload: res });
  }

  useEffect(() => {
    fetchArtist();
    fetchIsFollowing();
  }, []);

  if (state.isFollowingArtist) {
    //console.log(state.isFollowingArtist[0]);
  }

  const handleClick = async (status) => {
    console.log("yes");
    if (status === "unfollow") {
      await spotifyWebApi.unfollowArtists([params.artistId]);
      fetchIsFollowing();
    } else {
      await spotifyWebApi.followArtists([params.artistId]);
      fetchIsFollowing();
    }
  };

  return (
    <div className="artist-container">
      {state.artist ? (
        <div className="main-artist-div">
          <div className="artist-image-conatiner">
            <img className="artist-image" src={state.artist.images[0].url} />
          </div>
          <div className="artist-name">{state.artist.name}</div>
          <div className="artist-info">
            <div className="artist-followers">
              <div className="artist-info-box">
                {state.artist.followers.total}
              </div>
              <div className="artist-info-heading">Followers</div>
            </div>
            <div className="artist-genres-container">
              {state.artist.genres.map((genre) => {
                return <div className="artist-info-box">{genre}</div>;
              })}
              <div className="artist-info-heading">Genres</div>
              {state.isFollowingArtist ? (
                <div className="follow-button-container">
                  {state.isFollowingArtist[0] === true ? (
                    <button
                      onClick={() => handleClick("unfollow")}
                      className="artist-alreadyfollowing-button"
                    >
                      FOLLOWING
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClick("follow")}
                      className="artist-follow-button"
                    >
                      FOLLOW
                    </button>
                  )}
                </div>
              ) : null}
            </div>

            <div className="artist-popularity">
              <div className="artist-info-box">{state.artist.popularity}%</div>
              <div className="artist-info-heading">Popularity</div>
            </div>
          </div>
          {/* <button className="artist-follow-button">Follow</button> */}
        </div>
      ) : null}
    </div>
  );
};

export default Artist;
