import { useEffect, useState } from "react"
import PrincipalHome from "./principalHome"
import { getUser } from "../util"
import StudentTeacherHome from "./studentTeacherHome"

const Home = () =>{
    const [role,setRole] = useState('')

    useEffect(()=>{
        setRole(JSON.parse(getUser()).role)
    })
    
    return (
        <div>
            {role ==="principal" && <PrincipalHome/>}
            {role ==="teacher" && <StudentTeacherHome/>}
            {role ==="student" && <StudentTeacherHome/>}
        </div>
    )
}

export default Home;