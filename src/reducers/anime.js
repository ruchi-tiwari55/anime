import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SET_ANIMES,
} from "../actions/types";

const initialState = {
  animes: [],
  wishlist: [],
};

const animeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMES: {
      return {
        ...state,
        animes: action.data,
      };
    }
    case ADD_TO_WISHLIST: {
      return {
        ...state,
        wishlist: [...state.wishlist, action.data],
      };
    }
    case REMOVE_FROM_WISHLIST: {
      let updatedList = state.wishlist.filter(
        (item) => item.mal_id !== action.data.mal_id
      );
      return {
        ...state,
        wishlist: updatedList,
      };
    }
    default: {
      return state;
    }
  }
};

export default animeReducer;
