import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/alert";
import { StickyNavbar } from "./components/navbar";
import {
  PrivateRoute,
  PrivateRoutePrincipal,
  PrivateRouteStudent,
  PrivateRouteTeacher,
} from "./components/privateRoute";
import { AddNewEntry } from "./pages/addNewRecord";
import GetClassAttendance from "./pages/getClassAttendance";

import PageNotFound from "./pages/error";
import Home from "./pages/home";
import { Login } from "./pages/login";
import ViewStudentAttendance from "./pages/viewStudentAttendance";
import ViewTeacherAttendancebyTeacher from "./pages/viewTeacherAttendance";
import ViewTeachersAttendancebyPrincipal from "./pages/viewTeachersAttendance";
function App() {
  
  return (
    <div className="App">
      <Toaster position="top-center" />
      <BrowserRouter>
        <StickyNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PrivateRoutePrincipal />}>
            <Route path="/user/add" element={<AddNewEntry />} />
            <Route
              path="/teachers/attendance"
              element={<ViewTeachersAttendancebyPrincipal />}
            />
          </Route>
          <Route element={<PrivateRouteTeacher />}>
            <Route
              path="/teacher/attendance"
              element={<ViewTeacherAttendancebyTeacher />}
            />
            <Route
              path="/class/attendance"
              element={<GetClassAttendance />}
            />
          </Route>
          <Route element={<PrivateRouteStudent />}>
            <Route
              path="/student/attendance"
              element={<ViewStudentAttendance />}
            />
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
