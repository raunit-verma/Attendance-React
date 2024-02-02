import {
  Alert,
  Button,
  Card,
  Input,
  Radio,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { ChangeEventHandler, useEffect, useState } from "react";
import { API_URL } from "../util";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

export function AddNewEntry() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullname: "",
    class: 0,
    email: "",
    role: "student",
  });
  const [loading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const studentClass = ["1", "2", "3"];
  const [selectedClass, setSelectedClass] = useState(0);

const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'radio') {
      const selectedRole = e.target.id === 'role-teacher' ? 'teacher' : 'student';
      
      setNewUser((prevUser) => {
        const updatedUser = { ...prevUser, role: selectedRole };
        return updatedUser;
      });
    } else {
      setNewUser((prevUser) => {
        const updatedUser = { ...prevUser, [e.target.id]: e.target.value };
        return updatedUser;
      });
    }
  };

  const tryAddingNewUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL + "/addNewUser", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newUser),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        console.log("Data",data);
      } else {
        console.log(response.status)
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        style={{ backgroundColor: "#F8FAFC" }}
        className="w-80 sm:w-96 px-5"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Add New User
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the details of new student/teacher.
        </Typography>
        <form className="mt-8 mb-2">
          <div className="flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            <Input
              id="username"
              size="lg"
              onChange={onInputChange}
              placeholder="username"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              id="password"
              type="password"
              onChange={onInputChange}
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              id="name"
              type="text"
              onChange={onInputChange}
              size="lg"
              placeholder="name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              id="email"
              type="email"
              onChange={onInputChange}
              size="lg"
              placeholder="email@devtron.ai"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <div className="flex gap-10">
              <Radio
                id="role-teacher"
                name="type"
                label="Teacher"
                onChange={onInputChange}
              />
              <Radio
                id="role-student"
                name="type"
                label="Student"
                onChange={onInputChange}
                defaultChecked
              />
            </div>

            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex flex-row items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Class{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {studentClass.map((val: string) => {
                  return (
                    <li key={val + "1"}>
                      <a
                        key={val}
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {val}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
          </div>

          
          <Button className="mt-6" fullWidth onClick={tryAddingNewUser}>
            Add
          </Button>
        </form>
      </Card>
      {loading && (
        <div>
          <div className="absolute inset-0 bg-white bg-opacity-75 blur-sm"></div>
          <Spinner
            color="indigo"
            className="absolute top-1/2 left-1/2 h-12 w-12 "
          />
        </div>
      )}
      {alert && (
        <Alert className="absolute w-max top-10 right-5" color="red">
          {message}
        </Alert>
      )}
    </div>
  );
}
