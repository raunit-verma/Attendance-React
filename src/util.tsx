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

function formateDateTime(dateTimeString: string) {
  if (dateTimeString == "0001-01-01T00:00:00Z" )return "Didn't punch out."
 const inputDate = new Date(dateTimeString);

 const options: Intl.DateTimeFormatOptions = {
   weekday : "short",
   year: "numeric",
   month: "short",
   day: "numeric",
   hour: "numeric",
   minute: "numeric",
   second:'2-digit',
   hour12: true,
   timeZone: 'UTC',
 };

 return inputDate.toLocaleDateString("en-US", options)
}


export { API_URL, getUser, getAuthenticationStatus, formateDateTime }
