const reducers = (state = {}, action) => {
  switch (action.type) {
    case "NEW_MOVIE_DATA":
      return {
        ...state,
        newmoviedata: action.data,
      };
    case "ACTION_ANIME":
      return {
        ...state,
        actionanime: action.data,
      };

    case "CHILD_ANIME":
      return {
        ...state,
        childanime: action.data,
      };
    case "ALL_MOVIE_DATA":
      return {
        ...state,
        allmoviedata: action.data,
      };

    case "ANIME":
      return {
        ...state,
        anime: action.data,
      };

    default:
      return state;
  }
};

export default reducers;
