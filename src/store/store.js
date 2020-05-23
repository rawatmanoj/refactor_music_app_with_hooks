import React, { createContext, useReducer } from "react";
import Reducer from "./reducers";

const initialState = {
  error: null,
  user: null,
  followedArtists: null,
  topArtists: null,
  topTracks: null,
  token: "",
  userPlaylists: null,
  range: "long_term",
  topArtistsShort: null,
  topArtistsMedium: null,
  topArtistsLong: null,
  topTracksShort: null,
  topTracksMedium: null,
  topTracksLong: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
