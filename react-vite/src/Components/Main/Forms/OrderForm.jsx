import { useState } from "react";
import "../CSS/order.css";

const OrderForm = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted for:", email);
    alert(`Order submitted for ${email}. Check your inbox!`);
    setEmail(""); // Clear input after submission
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Order Sonic Merch</h2>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </label>
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;