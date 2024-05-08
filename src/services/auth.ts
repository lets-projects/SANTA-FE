export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function getIsUser() {
  const role = localStorage.getItem('role');
  return role == 'USER';
}
