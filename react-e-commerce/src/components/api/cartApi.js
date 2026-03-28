import api from "./api";

// ✅ Add to Cart
export const addToCart = (productId) => {
  return api.post("/cart/add", null, {
    params: { productId },
  });
};

// ✅ Get Cart
export const getCart = () => {
  return api.get("/cart/my");
};

// ✅ Remove Item
export const removeItem = (productId) => {
  return api.delete("/cart/remove", {
    params: { productId },
  });
};

// ✅ Update Quantity
export const updateQty = (productId, qty) => {
  return api.put("/cart/update", null, {
    params: { productId, qty },
  });
};


