import jwtDecode from "jwt-decode";

/* 
 *
 * this function extracts the timestamp from the refresh token  if it exists.
 * created by simpleJWT on the API. it is coming from the login response payload
 * returned from dj-rest-auth/login
 * 
 * This timestamp can be used to see if the token needs to be refreshed,
 * and then send a token refresh request if it is needed.
*/
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

