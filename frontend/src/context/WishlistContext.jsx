import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () =>useContext(WishlistContext);

export const WishlistProvider = ({ children,}) => {
  const [wishlist, setWishlist] =
    useState(() => {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved): [];
    });
  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {setWishlist([...wishlist,product,]);
    }
  };
  const removeFromWishlist = (_id) => {setWishlist(wishlist.filter((item) => item._id !== _id));};
  useEffect(() => {localStorage.setItem("wishlist",JSON.stringify(wishlist));}, [wishlist]);
  return (
    <WishlistContext.Provider value={{wishlist,addToWishlist,removeFromWishlist,}}>
      {children}
    </WishlistContext.Provider>
  );
};