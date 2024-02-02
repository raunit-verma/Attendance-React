import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL

const getUserDetailsAPICall = async () => {
  console.log("api call")
  const response = await fetch(API_URL+'/verify',{
    credentials: 'include'
  })
  if (response.ok){
  const data = await response.json()
  window.sessionStorage.setItem('user',JSON.stringify(data))
  }
}

const getUser = () =>{
  if (window.sessionStorage.getItem('user')==null && Cookies.get('Authorization')) getUserDetailsAPICall()
  return window.sessionStorage.getItem('user')!=null ? JSON.parse(window.sessionStorage.getItem('user') || "") : null
}

const getAuthenticationStatus = () =>{
  return getUser()!=null && Cookies.get('Authorization');
}

export { API_URL, getUser, getAuthenticationStatus, getUserDetailsAPICall }
