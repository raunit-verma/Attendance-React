import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { toast } from "../components/alert";
import { API_URL } from "../util";
import "./calendar.css";

function Home() {
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState({ hour: 0, minute: 0, second: 0 });
  const handleMonthChange = (date: any) => {
    const d = new Date(date.activeStartDate);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  };

  useEffect(() => {
    fetch(API_URL + "/home", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        month: month + 1,
        year: year,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMonthlyAttendance(data.monthly_attendance);
        setStats({
          hour: data.hour,
          minute: data.minute,
          second: data.second,
        });
      })
      .catch(() => {
        toast.error("Some error occured.");
      });
  }, [month, year]);

  const getTileClassName = ({
    date,
  }: {
    date: Date;
    view: string;
  }): string | string[] => {
    const today = new Date();
    if (date.getMonth() != month) return [];
    else if (today < date) return [];
    else if (monthlyAttendance[date.getDate()]) return ["present-date"];
    else if (date.getDay() == 6 || date.getDay() == 0) return [];
    else return ["absent-date"];
  };
  return (
    <div className="flex flex-col">
      <Typography variant="h3" color="green" textGradient>
        Monthly Stats
      </Typography>
      <div className="flex flex-row justify-center space-x-5">
        <Typography variant="h5" color="blue-gray">
          {stats.hour} Hours {stats.minute} Minutes {stats.second} Seconds
        </Typography>
      </div>
      <div className="flex flex-row justify-center">
        <Calendar
          onActiveStartDateChange={handleMonthChange}
          className={"my-5"}
          selectRange={false}
          tileClassName={getTileClassName}
        />
      </div>
    </div>
  );
}

export default Home;
