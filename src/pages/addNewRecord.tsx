import {
  Button,
  Card,
  Input,
  Radio,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "../components/alert";
import { API_URL } from "../util";

export function AddNewEntry() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullname: "",
    class: -1,
    email: "",
    role: "teacher",
  });
  const [loading, setIsLoading] = useState(false);
  const studentClass = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "radio") {
      const selectedRole =
        e.target.id === "role-teacher" ? "teacher" : "student";

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

  const onDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser((prevUser) => {
      const updatedUser = { ...prevUser, class: parseInt(e.target.value) };
      return updatedUser;
    });
  };

  const tryAddingNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (newUser.role == "teacher") newUser.class = 1;
      const response = await fetch(API_URL + "/addnewuser", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (!data.message || data.code === 8) {
        toast.success("User added successfully.");
        setNewUser({
          username: "",
          password: "",
          fullname: "",
          class: -1,
          email: "",
          role: "teacher",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Couldn't add user.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-1 py-2">
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
        <form onSubmit={tryAddingNewUser} className="mt-8 mb-2">
          <div className="flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            <Input
              id="username"
              size="lg"
              required
              onChange={onInputChange}
              value={newUser.username}
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
              required
              value={newUser.password}
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
              id="fullname"
              type="text"
              onChange={onInputChange}
              size="lg"
              required
              value={newUser.fullname}
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
              value={newUser.email}
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
                defaultChecked
                onChange={onInputChange}
              />
              <Radio
                id="role-student"
                name="type"
                label="Student"
                onChange={onInputChange}
              />
            </div>
            <div>
              {newUser.role === "student" && (
                <select
                  id="class"
                  onChange={onDropDownChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a Class</option>
                  {studentClass.map((myClass) => {
                    return (
                      <option key={myClass} value={myClass}>
                        {myClass}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>

          <Button ripple={false} type="submit" className="mt-6" fullWidth>
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
    </div>
  );
}
