import { useEffect, useState } from 'react';
import './calendar.css';

import Calendar from 'react-calendar';
import { API_URL } from '../util';
import { toast } from '../components/alert';


function Home() {

    const [monthlyAttendance,setMonthlyAttendance] = useState([])
    const [month,setMonth] = useState((new Date()).getMonth())
    const [year,setYear] = useState((new Date()).getFullYear())

    const handleMonthChange = (date:any) =>{
      const d = new Date(date.activeStartDate)
      setMonth(d.getMonth())
      setYear(d.getFullYear())
    }

  useEffect(()=>{
    fetch(API_URL+'/home',{
      credentials:'include',
      method:'POST',
      body: JSON.stringify({
        month: month+1,
        year: year
      })
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      setMonthlyAttendance(data.monthly_attendance)
    }).catch(()=>{
      toast.error("Some error occured.")
    })
  },[month,year])

  const getTileClassName = ({ date }: { date: Date; view: string }): string | string[] => {
    const today = new Date()
    if(date.getMonth()!=month)return []
    else if(today<date) return []
    else if (monthlyAttendance[date.getDate()]) return ['present-date'];
    else if(date.getDay() == 6 || date.getDay() == 0) return []
    else return ['absent-date']
  };
  return (
    <div className='flex flex-row justify-center'>
      <Calendar onActiveStartDateChange={handleMonthChange} className={"my-10"} selectRange={false} tileClassName={getTileClassName} />
    </div>
  );
}

export default Home;