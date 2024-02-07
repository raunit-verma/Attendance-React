import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { StickyNavbar } from "./components/navbar";
import { PrivateRoute, PrivateRoutePrincipal, PrivateRouteTeacher } from "./components/privateRoute";
import { AddNewEntry } from "./pages/addNewRecord";
import GetClassAttendance from "./pages/getClassAttendance";
import Home from "./pages/home";
import { Login } from "./pages/login";
import ViewTeacherAttendancebyTeacher from "./pages/viewTeacherAttendance";
import ViewTeachersAttendancebyPrincipal from "./pages/viewTeachersAttendance";
function App() {


  return (
    <div className="App">
        <BrowserRouter>
        <StickyNavbar/>
          <Routes>
            <Route path="/login"  element={<Login/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Home/>}/>
            </Route>
            <Route element={<PrivateRoutePrincipal/>}>
              <Route path="/addNewEntry" element={<AddNewEntry/>}/>
              <Route path="/getTeachersAttendance" element={<ViewTeachersAttendancebyPrincipal/>}/>
            </Route>
            <Route element={<PrivateRouteTeacher/>}>
              <Route path="/getTeacherAttendance" element={<ViewTeacherAttendancebyTeacher/>}/>
              <Route path="/getClassAttendance" element={<GetClassAttendance/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
