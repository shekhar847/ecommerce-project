import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const VALID_COUPONS = {
  WELCOME10: { type: "percent", value: 10, label: "10% OFF Welcome Discount" },
  SHOP500: { type: "flat", value: 500, label: "₹500 OFF Instant Discount", minOrder: 1000 },
  FESTIVE20: { type: "percent", value: 20, label: "20% Festive Special Discount" },
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("applied_coupon");
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  // --------------------Add to Cart---------------------
  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + (product.qty || 1) } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: product.qty || 1 }]);
    }
  };

  // --------------------Remove Item---------------------
  const removeFromCart = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
  };

  const increaseQty = (_id) => {
    setCart(
      cart.map((item) => (item._id === _id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decreaseQty = (_id) => {
    setCart(
      cart
        .map((item) => (item._id === _id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem("applied_coupon");
  };

  // --------------------Total Price & Coupon Calculations---------------------
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.type === "percent") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === "flat") {
      if (subtotal >= (appliedCoupon.minOrder || 0)) {
        discountAmount = Math.min(appliedCoupon.value, subtotal);
      }
    }
  }

  const totalPrice = Math.max(0, subtotal - discountAmount);

  // --------------------Apply / Remove Coupon---------------------
  const applyCoupon = (code) => {
    const cleanCode = code?.trim().toUpperCase();
    if (!cleanCode) {
      toast.warning("Please enter a valid coupon code");
      return false;
    }

    const coupon = VALID_COUPONS[cleanCode];
    if (!coupon) {
      toast.error("Invalid Promo Code. Try WELCOME10, SHOP500, or FESTIVE20!");
      return false;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      toast.error(`Minimum order amount of ₹${coupon.minOrder} required for ${cleanCode}`);
      return false;
    }

    setAppliedCoupon({ code: cleanCode, ...coupon });
    localStorage.setItem("applied_coupon", JSON.stringify({ code: cleanCode, ...coupon }));
    toast.success(`Coupon '${cleanCode}' Applied! 🎉`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem("applied_coupon");
    toast.info("Coupon removed");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        subtotal,
        discountAmount,
        totalPrice,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};