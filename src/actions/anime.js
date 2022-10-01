import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_ANIMES } from "./types";

export const setAnimes = (data) => {
  return {
    type: SET_ANIMES,
    data: data,
  };
};

export const addToWishlist = (data) => {
  return {
    type: ADD_TO_WISHLIST,
    data: data,
  };
};

export const removeFromWishlist = (data) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    data: data,
  };
};
