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
            <Route path="/addnewentry" element={<AddNewEntry />} />
            <Route
              path="/getteachersattendance"
              element={<ViewTeachersAttendancebyPrincipal />}
            />
          </Route>
          <Route element={<PrivateRouteTeacher />}>
            <Route
              path="/getteacherattendance"
              element={<ViewTeacherAttendancebyTeacher />}
            />
            <Route
              path="/getclassattendance"
              element={<GetClassAttendance />}
            />
          </Route>
          <Route element={<PrivateRouteStudent />}>
            <Route
              path="/getstudentattendance"
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
