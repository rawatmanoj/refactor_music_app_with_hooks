const Reducer = (state, action) => {
  switch (action.type) {
    case "TOKEN":
      return {
        ...state,
        token: action.payload,
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
    case "TOP_ARTISTS":
      return {
        ...state,
        topArtists: action.payload,
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
    case "RANGE":
      return {
        ...state,
        range: action.payload,
      };

    case "TOP_ARTISTS_SHORT":
      return {
        ...state,
        topArtistsShort: action.payload,
      };
    case "TOP_ARTISTS_MEDIUM":
      return {
        ...state,
        topArtistsMedium: action.payload,
      };
    case "TOP_ARTISTS_LONG":
      return {
        ...state,
        topArtistsLong: action.payload,
      };
    case "TOP_TRACKS_SHORT":
      return {
        ...state,
        topTracksShort: action.payload,
      };
    case "TOP_TRACKS_MEDIUM":
      return {
        ...state,
        topTracksMedium: action.payload,
      };
    case "TOP_TRACKS_LONG":
      return {
        ...state,
        topTracksLong: action.payload,
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
