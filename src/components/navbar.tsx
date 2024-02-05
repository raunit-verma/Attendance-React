import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { getUser } from "../util";
import Cookies from "js-cookie";
import { title } from "process";

type NavListItem = {
  title: string;
  path: string;
};

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

const navListStudent = [
  {
    title:"Home",
    path:"/"
  }
]

const navListPrincipal = [
  {
    title:"Home",
    path:"/"
  },
  {
    title: "Add New",
    path : "/addNewEntry"
  },
  {
    title: "Get Teacher Attendance",
    path : "/getTeacherAttendance"
  }
]

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList({navBarList}:{navBarList : NavListItem[]}) {
  const data = navBarList
  const navigate = useNavigate();
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      {data.map(({title,path})=>{
        return <Typography
        as="a"
        href="#"
        variant="h6"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem onClick={()=>{navigate(path)}} className="flex items-center gap-2 py-2 pr-4">{title}</ListItem>
      </Typography>
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
  const [pageTitle, setPageTitle] = useState("Login");
  const [loginLogoutButton, setLoginLogoutButton] = useState("Log In");
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);
  const user = JSON.parse(getUser());

  const logoutFn = () =>{
    Cookies.remove('Authorization',{ path: '/', domain: 'localhost' })
    navigate('/login')
  }
  useEffect(() => {
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
            <NavList  navBarList={user.role == "student" ? navListStudent : navListPrincipal}/>
          </div>
        <div className="flex items-center flex-row ">
          

          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Welcome{user.fullname ? ", " +user.fullname : ""}
          </Typography>

          <div className="hidden gap-2 lg:flex">
            {/* <Button variant="text" size="sm" color="blue-gray">
            Log In
          </Button> */}
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
        <NavList navBarList={user.role == "student" ? navListStudent : navListStudent}/>
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          
          <Button onClick={logoutFn} variant="gradient" size="sm" fullWidth>
            {loginLogoutButton}
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
