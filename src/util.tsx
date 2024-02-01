
const API_URL = process.env.REACT_APP_API_URL

const getUser = () =>{
  return window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user') || "") : null
}

export { API_URL, getUser }
