import { useEffect, useState } from "react";
import { getCart, removeItem, updateQty } from "../api/cartApi";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const res = await getCart();
    setCart(res.data.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    await removeItem(productId);
    fetchCart();
  };

  const handleQty = async (productId, qty) => {
    const parsed = parseInt(qty);
    if (!parsed || parsed < 1) return;
    await updateQty(productId, parsed);
    fetchCart();
  };

  const handleDecrement = async (productId, currentQty) => {
    if (currentQty <= 1) return;
    await updateQty(productId, currentQty - 1);
    fetchCart();
  };

  const handleIncrement = async (productId, currentQty) => {
    await updateQty(productId, currentQty + 1);
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="cart-wrapper">
        <div className="cart-loading">Loading your cart…</div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <span className="cart-count">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛍️</span>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-img-wrap">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-img"
                  />
                </div>

                <div className="cart-item-details">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-price">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                  <p className="cart-item-unit">₹{item.product.price} each</p>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrement(item.product.id, item.quantity)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="qty-input"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQty(item.product.id, e.target.value)}
                    />
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrement(item.product.id, item.quantity)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-amount">
                {total.toLocaleString("en-IN",{style:"currency",currency:"INR"})}
              </span>
            </div>
            <button className="checkout-btn">Proceed to Checkout →</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
