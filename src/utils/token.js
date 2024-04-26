const TOKEN = 'token'
function getToken() {
  return localStorage.getItem(TOKEN)
}

function setToken(data) {
  return localStorage.setItem(TOKEN, data)
}

function removeToken() {
  return localStorage.removeItem(TOKEN)
}

export { getToken, setToken, removeToken }