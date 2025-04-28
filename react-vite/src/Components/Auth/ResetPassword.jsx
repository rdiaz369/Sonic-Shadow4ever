import React, { useState } from "react";
import Parse from "parse";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      setMessage("Please enter your email.");
      return;
    }

    try {
      await Parse.User.requestPasswordReset(email);
      setMessage("Password reset email sent. Check your inbox.");
      setError(false);
    } catch (error) {
      setMessage("Error: " + error.message);
      setError(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleReset}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Email
          </button>
        </form>

        {/* Conditionally render message */}
        {message && (
          <div className={`mt-3 ${error ? 'text-danger' : 'text-success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
