import {
    startRegistration,
    startAuthentication,
  } from '@simplewebauthn/browser';
  import axios from 'axios';
  
  export const registerWebAuthn = async (email) => {
    const optionsResponse = await axios.post('/api/webauthn/register-options', { email });
    const attestation = await startRegistration(optionsResponse.data);
    await axios.post('/api/webauthn/register', { email, attestation });
  };
  
  export const authenticateWebAuthn = async (email) => {
    const optionsResponse = await axios.post('/api/webauthn/auth-options', { email });
    const assertion = await startAuthentication(optionsResponse.data);
    await axios.post('/api/webauthn/auth', { email, assertion });
  };