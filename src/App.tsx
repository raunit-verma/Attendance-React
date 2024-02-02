import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StickyNavbar } from "./components/navbar";
import { PrivateRoute, PrivateRoutePrincipal } from "./components/privateRoute";
import Home from "./pages/home";
import { Login } from "./pages/login";
import { AddNewEntry } from "./pages/addNewRecord";
function App() {


  
  return (
    <div className="App">
        <BrowserRouter>
        <StickyNavbar/>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Home/>}/>
            </Route>
            <Route element={<PrivateRoutePrincipal/>}>
              <Route path="/addNewEntry" element={<AddNewEntry/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
