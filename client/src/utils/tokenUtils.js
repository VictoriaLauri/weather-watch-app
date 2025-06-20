import {jwtDecode} from 'jwt-decode';

export const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};