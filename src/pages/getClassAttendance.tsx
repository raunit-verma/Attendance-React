import { Button, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { toast } from "../components/alert";
import { API_URL } from "../util";

type AttendanceJSON = {
  Username: string;
  FullName: string;
};

const AttendanceTable = ({ data }: { data: AttendanceJSON[] }) => {
  if (!data || data.length === 0) return <></>;
  return (
    <div className="relative w-max py-5 px-5 flex flex-col h-full  text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <table className=" text-center table-auto ">
        <thead>
          <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Username
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Fullname
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((val) => {
              return (
                <tr className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {val.Username}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {val.FullName}
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const GetClassAttendance = () => {
  const months = [
    "Janurary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];
  const dates: number[] = [];
  for (let i = 1; i <= 31; i++) dates.push(i);
  const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [day, setDay] = useState(0);
  const [classs, setClasss] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [flex, setFlex] = useState("flex-row");
  const [attendanceData, setAttendanceData] = useState([]);
  const getTeacherAttendance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (month === 0 || year === 0 || day === 0 || classs === 0) {
      if (!month) toast.error("Please select a month.");
      if (!year) toast.error("Please select a year.");
      if (!day) toast.error("Please select a day.");
      if (!classs) toast.error("Please select a class.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(API_URL + "/class/attendance", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          class: classes[classs - 1],
          day: dates[day - 1],
          month: month,
          year: years[year - 1],
        }),
      });
      const data = await response.json();
      if (data === null) toast.error("No record found.");
      else if (!data.message) {
        toast.success("Record found.");
        setAttendanceData(data);
      } else toast.error(data.message);
    } catch (error) {
      toast.error("Couldn't perform action.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "year") setYear(e.target.selectedIndex);
    else if (e.target.id === "month") setMonth(e.target.selectedIndex);
    else if (e.target.id === "date") setDay(parseInt(e.target.value));
    else if (e.target.id === "class") setClasss(parseInt(e.target.value));
  };

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth <= 800) {
        setFlex("flex-col gap-y-2");
      } else setFlex("flex-row");
    };
    window.addEventListener("resize", handleSize);

    handleSize();
    
  }, []);

  return (
    <div>
      <form
        onSubmit={getTeacherAttendance}
        className={`flex gap-x-4 ${flex} justify-around px-4 py-2`}
      >
        <select
          id="class"
          required
          defaultValue="Choose a Class"
          onChange={onDropDownChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Class</option>
          {classes.map((classs) => {
            return (
              <option key={classs} value={classs}>
                {classs}
              </option>
            );
          })}
        </select>

        <select
          id="date"
          required
          defaultValue="Choose a Date"
          onChange={onDropDownChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Choose Date</option>
          {dates.map((date) => {
            return (
              <option key={date} value={date}>
                {date}
              </option>
            );
          })}
        </select>

        <select
          id="month"
          required
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
          required
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
        <Button ripple={false} type="submit" className="overflow-visible">
          Submit
        </Button>
      </form>
      <div className="flex justify-around flex-row">
        <AttendanceTable data={attendanceData} />
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
    </div>
  );
};

export default GetClassAttendance;
