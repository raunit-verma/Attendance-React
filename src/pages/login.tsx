import {
  Button,
  Card,
  Input,
  Spinner,
  Typography
} from "@material-tailwind/react";
import { toast } from "../components/alert";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getAuthenticationStatus } from "../util";
  export function Login() {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setIsLoading] = useState(false)
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      e.target.id == "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    const tryLogIn = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
        try{
            setIsLoading(true)
            const response = await fetch(API_URL+"/login",{
                credentials: 'include',
                method : 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json()
            setIsLoading(false)
            if (data.message == undefined ){
              navigate('/')
            } else {
                if (response.status == 401){
                    toast.error("Wrong username or password.")
                } else {
                    toast.error("Some error occured.")
                }
            }
        } catch(error){
          setIsLoading(false)
          toast.error("Couldn't perform action.")
        }
        
    }
    

    useEffect(()=>{
        if (getAuthenticationStatus()) navigate('/')
    },[])

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card style={{backgroundColor:"#F8FAFC"}} className="w-80 sm:w-96 px-5"  shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Log In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form className="mt-8 mb-2" onSubmit={tryLogIn}>
            <div className="flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Username
              </Typography>
              <Input
              id="username"
                size="lg"
                required
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
                required
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Log In
            </Button>
          </form>
        </Card>
        {loading && (<div>
            <div className="absolute inset-0 bg-white bg-opacity-75 blur-sm"></div>
            <Spinner color="indigo" className="absolute top-1/2 left-1/2 h-12 w-12 "/>
        </div>) }
      </div>
    );
  }
  