import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL


const getUser = () =>{
  if(!getAuthenticationStatus()) return '{}'
  return JSON.stringify(jwtDecode(Cookies.get('Authorization') || ""))
}

const getAuthenticationStatus = () =>{
  return Cookies.get('Authorization')!=undefined
}

export { API_URL, getUser, getAuthenticationStatus }
