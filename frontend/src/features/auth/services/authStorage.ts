const ACCESS_TOKEN_KEY = 'access_token';

function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

const authStorage = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
};

export default authStorage;
