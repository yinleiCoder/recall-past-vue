export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}
