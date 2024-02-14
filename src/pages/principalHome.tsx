import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { toast } from "../components/alert";
import { API_URL } from "../util";
import "./calendar.css";

function PrincipalHome() {
    const [students,setStudents] = useState({
        present:0,
        total:0
    })
    const [teachers,setTeachers] = useState({
        present:0,
        total:0
    })

  const chartConfigTeacher = {
    width: 300,
    height: 300,
    series: [teachers.present,teachers.total-teachers.present],
    
  };

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#55DD33", "#FF0000"],
    legend: {
      show: true,
    },
    labels:["Present","Absent"]
  };

  const chartConfigStudent = {
    width: 300,
    height: 300,
    series: [students.present,students.total-students.present],
    
  };

  useEffect(() => {
    const today = new Date()
    fetch(API_URL + "/home", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        date: today.getDate(),
        month:today.getMonth()+1,
        year:today.getFullYear()
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStudents({
            total:data.totalStudent,
            present:data.totalStudentPresent
        })
        setTeachers({
            total:data.totalTeacher,
            present:data.totalTeacherPresent
        })
      })
      .catch(() => {
        toast.error("Some error occured.");
      });
  }, []);

  return (
    <div className="flex flex-col">
      <Typography variant="h3" color="green" textGradient>
        Daily Stats
      </Typography>

      <div className="flex flex-row justify-center">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            
            <div className="justify-center min-w-full">
              <Typography variant="h6" color="blue-gray">
                Teacher Attendance
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart type="pie" {...chartConfigTeacher} options={options} />
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-row justify-center py-2">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            
            <div className="justify-center min-w-full">
              <Typography variant="h6" color="blue-gray">
                Student Attendance
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart type="pie" {...chartConfigStudent} options={options} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default PrincipalHome;
