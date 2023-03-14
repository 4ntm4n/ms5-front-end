import jwtDecode from "jwt-decode";

/* 
 *
 * this function extracts the timestamp from the refresh token  if it exists.
 * created by simpleJWT on the API. it is coming from the login response payload
 * returned from dj-rest-auth/login
 * 
 * This timestamp is saved in local storage can be used 
 * to see if the token needs to be refreshed based on exp.date,
 * so we can send a token refresh request if it is needed.
*/
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};


// returns true or false based on if refreshTokenTimestamp exists
// in localStorage or not.
export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
  };
  
  //function that removes the timestamp from localStorage
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
  };