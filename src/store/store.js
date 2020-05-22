import React, { createContext, useReducer } from "react";
import Reducer from "./reducers";

const initialState = {
  posts: [],
  error: null,
  user: null,
  followedArtists: null,
  topArtists: null,
  topTracks: null,
  token: "",
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
