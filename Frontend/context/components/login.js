import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { authenticateWebAuthn } from '../utils/webauthn';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const authContext = useContext(AuthContext);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    authContext.login({ email, password });
  };

  const onBiometricLogin = async () => {
    try {
      await authenticateWebAuthn(email);
      authContext.loadUser();
    } catch (error) {
      console.error('Biometric login failed', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={onBiometricLogin}>
        Login with Biometrics
      </button>
    </form>
  );
};

export default Login;