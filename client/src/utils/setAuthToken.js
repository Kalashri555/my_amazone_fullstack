// utils/setAuthToken.js
import apiClient from "./api-client";

const setAuthToken = (token) => {
  if (token) {
    // ✅ CORRECT way to set the header
    apiClient.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete apiClient.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
