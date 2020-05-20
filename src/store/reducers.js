const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "TOP_TRACKS":
      return {
        ...state,
        topTracks: action.payload,
      };
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_PLAYLIST":
      return {
        ...state,
        userPlaylists: action.payload,
      };
    case "FOLLOWED_ARTISTS":
      return {
        ...state,
        followedArtists: action.payload,
      };
    case "TOP_ARTISTS":
      return {
        ...state,
        topArtists: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
