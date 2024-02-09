import {
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  Navbar,
  Typography
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API_URL, getUser } from "../util";
import { toast } from "./alert";

type NavListItem = {
  title: string;
  path: string;
};


const navListStudent = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "My Attendance",
    path: "/getStudentAttendance",
  },
];

const navListTeacher = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "My Attendance",
    path: "/getTeacherAttendance",
  },
  {
    title: "Get Class Attendance",
    path: "/getClassAttendance",
  },
];

const navListPrincipal = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Add New",
    path: "/addNewEntry",
  },
  {
    title: "Get Teacher Attendance",
    path: "/getTeachersAttendance",
  },
];

function NavList({ navBarList }: { navBarList: NavListItem[] }) {
  const data = navBarList;
  const navigate = useNavigate();
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {data.map(({ title, path }) => {
        return (
          <Typography
            as="a"
            href="#"
            key={path}
            variant="h6"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem
              onClick={() => {
                navigate(path);
              }}
              className="flex items-center gap-2 py-2 pr-4"
            >
              {title}
            </ListItem>
          </Typography>
        );
      })}
      {/* <Typography
        as="a"
        href="#"
        variant="h6"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="h6"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography> */}
    </List>
  );
}

export function StickyNavbar() {
  const location = useLocation();
  const excludeStickyNavbar = location.pathname === "/login";

  const [pageTitle, setPageTitle] = useState("Login");
  const [loginLogoutButton, setLoginLogoutButton] = useState("Log In");
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const user = JSON.parse(getUser());
  const [status, setStatus] = useState(false);
  let navList: NavListItem[] = [];
  if (user.role === "student") navList = navListStudent;
  else if (user.role === "teacher") navList = navListTeacher;
  else if (user.role === "principal") navList = navListPrincipal;

  const logoutFn = () => {
    Cookies.remove("Authorization", { path: "/", domain: process.env.REACT_APP_DOMAIN });
    navigate("/login");
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(API_URL + "/fetchstatus", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(data.status);
      }
    } catch (e: any) {
      if (user.role != "principal") toast.error("Cannot find current status.");
    }
  };

  const punchInOutFn = async () => {
      fetch(API_URL + (status ? "/punchout" : "/punchin"), {
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data: any) => {
          console.log(data);
          if (data.code === 8) toast.success(data.message);
          else toast.error(data.message);
          fetchStatus();
        }).catch(()=>{
          toast.error("Couldn't perform action.")
        })
  };

  useEffect(() => {
    const username = user.username;
    if (username != undefined && user.role != "principal") {
      fetchStatus();
    }

    const currentPath = window.location.pathname;

    currentPath != "/login"
      ? setLoginLogoutButton("Log Out")
      : setLoginLogoutButton("Log In");

    if (currentPath === "/login") {
      setPageTitle("Login");
    } else if (currentPath === "/addNewEntry") {
      setPageTitle("Add New Entry");
    } else {
      setPageTitle("Home");
    }
  }, [navigate]);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  if (excludeStickyNavbar) {
    return <></>;
  }

  return (
    // max-w-screen-xl
    <Navbar fullWidth color="transparent" className="mx-auto px-2 py-2">
      <div className="flex items-center justify-between  text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          {pageTitle}
        </Typography>
        <div className="hidden lg:block">
          <NavList navBarList={navList} />
        </div>
        <div className="flex items-center flex-row ">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Welcome{user.fullname ? ", " + user.fullname : ""}
          </Typography>

          <div className="hidden gap-2 lg:flex">
            {/* <Button variant="text" size="sm" color="blue-gray">
            Log In
          </Button> */}
            {user.role && user.role != "principal" && (
              <Button
                variant="gradient"
                color={status ? "green" : "red"}
                onClick={punchInOutFn}
                size="sm"
              >
                {status ? "Punch Out" : "Punch In"}
              </Button>
            )}
            <Button variant="gradient" onClick={logoutFn} size="sm">
              {loginLogoutButton}
            </Button>
          </div>
        </div>

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList navBarList={navList} />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button onClick={logoutFn} variant="gradient" size="sm" fullWidth>
            {loginLogoutButton}
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
