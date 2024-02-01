import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import { Login } from "./components/login";
import { PrivateRoute } from "./components/privateRoute";
import { API_URL, getUser } from "./util";

export interface User {
  isLoggedIn: boolean;
  username: string;
  fullname: string;
  class: number;
  email?: string;
  role: string;
}

function App() {
  const [user,setUser] = useState<User>({
    isLoggedIn : false,
    username : "",
    fullname : "",
    class:0,
    email : "",
    role:" "
  });

  useEffect(()=>{
    const retrieveUser = getUser()
    if (!retrieveUser || retrieveUser.isLoggedIn == false) {
      const apiCall = async () => {
        const response = await fetch(API_URL+'/verify',{
          credentials: 'include'
        })
        if (response.ok){
        const data = await response.json()
        data.isLoggedIn = true
        window.sessionStorage.setItem('user',JSON.stringify(data))
        setUser(data)
        }
      }
      apiCall()
    }
  })
  
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" Component={Login} />
            <Route
            path="/"
            element={
              <PrivateRoute>
                <Route index element={<Home />} />
              </PrivateRoute>
            }
          />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
