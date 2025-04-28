import React from "react";
// add bootstrap styling (match green theme)
const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} autoComplete="off">
      {!isLogin && (
        <>
          <div className="mb-3">
            <label htmlFor="first-name-input" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              value={user.firstName}
              onChange={onChange}
              name="firstName"
              placeholder="First name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last-name-input" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              value={user.lastName}
              onChange={onChange}
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
        </>
      )}

      <div className="mb-3">
        <label htmlFor="email-input" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email-input"
          value={user.email}
          onChange={onChange}
          name="email"
          placeholder="Email address"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password-input" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password-input"
          value={user.password}
          onChange={onChange}
          name="password"
          placeholder="Password"
          required
        />
      </div>

      <div className="col align-items-center">
        <button type="submit" className="btn btn-outline-success">
          {isLogin ? "Login" : "Register"}
        </button>
      </div>

      {/* Forgot Password link */}
      {isLogin && (
        <div className="text-center mt-3">
          <a href="/reset-password" className="text-decoration-none">Forgot Password?</a>
        </div>
      )}
    </form>
  );
};

export default AuthForm;
