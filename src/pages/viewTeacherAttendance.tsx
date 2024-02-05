import { Button, Input } from "@material-tailwind/react";
import { Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { API_URL } from "../util";

const AttendanceTable = (data:any) =>{
    
    return (<div
        className="relative w-max py-5 px-5 flex flex-col h-full  text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <table className=" text-center table-auto ">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  PunchIn  Date & Time
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  PunchOut  Date & Time
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  John Michael
                </p>
              </td>
              <td className="p-4">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  Manager
                </p>
              </td>
             
            </tr>
            
            
          </tbody>
        </table>
      </div>)
}


const ViewTeacherAttendancebyPrincipal = () => {
  const months = ["Jan", "Feb"];
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const [username,setUsername] = useState('')
  const [month,setMonth] = useState(1)
  const [year,setYear] = useState(2024)
  const [loading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [color, setColor] = useState("red");

  const getTeacherAttendance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(API_URL + "/getTeacherAttendance", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
            id : username,
            month : month,
            year : year
        }),
      });
      setIsLoading(false);
      const data = await response.json();
      if (response.ok) setColor("green");
      else setColor("red");
      console.log(data)
    //   setMessage(data.message);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setUsername(e.target.value)
  }

  const onDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    if (e.target.id == "year")setYear(parseInt(e.target.value))
    else if(e.target.id == "month")setMonth(e.target.selectedIndex)
  }

  return (
    <div>
      <form onSubmit={getTeacherAttendance} className="flex gap-x-4 justify-around flex-row px-10 py-2">
        <Input color="blue" onChange={onInputChange} label="Username" />
        <select
          id="month"
          defaultValue="Choose a Month"
          onChange={onDropDownChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Month</option>
          {months.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>

        <select
          id="year"
          defaultValue="Choose a Year"
          onChange={onDropDownChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Year</option>
          {years.map((year) => {
              return (
                  <option key={year} value={year}>
                {year}
              </option>
            );
        })}
        </select>
        <Button type="submit" className="overflow">Submit</Button>
      </form>
      <div className="flex justify-around flex-row">
      <AttendanceTable/>
      </div>
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
        <Alert
          className="absolute w-max top-10 right-5"
          color={color == "red" ? "red" : "green"}
        >
          {message}
        </Alert>
      )}
    </div>
  );
};

export default ViewTeacherAttendancebyPrincipal;
