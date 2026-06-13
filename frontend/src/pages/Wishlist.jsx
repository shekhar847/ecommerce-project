import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <div className="container mt-4">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <h4>No Products Added</h4>
      ) : (
        wishlist.map((item) => (
          <div
            key={item._id}
            className="border p-3 my-3 rounded"
          >
            <h5>{item.name}</h5>

            <p>
              ₹ {item.price}
            </p>

            <button
              className="btn btn-danger"
              onClick={() =>
                removeFromWishlist(
                  item._id
                )
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;