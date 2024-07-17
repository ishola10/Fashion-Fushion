import React, { useState } from "react";
import "../styles/Checkout.css";

const Checkout = ({ cartItems, onOrderPlaced }) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState("door");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleAddressChange = (e) => setDeliveryAddress(e.target.value);
  const handleDeliveryChange = (e) => setDeliveryDetails(e.target.value);
  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      total: cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2),
      items: cartItems
    };
    onOrderPlaced(order);
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <h2>Delivery Address</h2>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={deliveryAddress}
            onChange={handleAddressChange}
            required
          />
        </div>

        <h2>Delivery Details</h2>
        <div className="form-group">
          <label>Delivery Method:</label>
          <div>
            <input
              type="radio"
              id="door"
              name="delivery"
              value="door"
              checked={deliveryDetails === "door"}
              onChange={handleDeliveryChange}
            />
            <label htmlFor="door">Door Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="pickup"
              name="delivery"
              value="pickup"
              checked={deliveryDetails === "pickup"}
              onChange={handleDeliveryChange}
            />
            <label htmlFor="pickup">Pickup Station</label>
          </div>
        </div>

        <h2>Payment Method</h2>
        <div className="form-group">
          <label>Payment Method:</label>
          <div>
            <input
              type="radio"
              id="cash"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="cash">Pay on Delivery (Cash or Transfer)</label>
          </div>
          <div>
            <input
              type="radio"
              id="cards"
              name="payment"
              value="cards"
              checked={paymentMethod === "cards"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="cards">Pay with Cards</label>
          </div>
          <div>
            <input
              type="radio"
              id="bank"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="bank">Bank Transfer</label>
          </div>
          <div>
            <input
              type="radio"
              id="ussd"
              name="payment"
              value="ussd"
              checked={paymentMethod === "ussd"}
              onChange={handlePaymentChange}
            />
            <label htmlFor="ussd">USSD</label>
          </div>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
