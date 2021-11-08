export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authentication: user.token };
  } else {
    return {};
  }
}
