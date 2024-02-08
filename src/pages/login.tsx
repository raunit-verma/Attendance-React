import {
  Alert,
  Button,
  Card,
  Input,
  Spinner,
  Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getAuthenticationStatus } from "../util";
import MyAlert from "../components/dismiss";
  export function Login() {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setIsLoading] = useState(false)
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.target.id == "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    const tryLogIn = async () =>{
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
            if (!data.message){
              navigate('/')
            } else {
                if (response.status == 401){
                    setMessage('Wrong username or password.')
                } else {
                    setMessage('Some error occured.')
                }
                setAlert(true);
                setTimeout(() => {
                    setAlert(false)
                }, 2000);
            }
        } catch(error){
            console.log(error)
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
          <form className="mt-8 mb-2">
            <div className="flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Username
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
            </div>
            <Button className="mt-6" fullWidth onClick={tryLogIn}>
              Log In
            </Button>
          </form>
        </Card>
        {loading && (<div>
            <div className="absolute inset-0 bg-white bg-opacity-75 blur-sm"></div>
            <Spinner color="indigo" className="absolute top-1/2 left-1/2 h-12 w-12 "/>
        </div>) }
        {alert && (<Alert className="absolute w-max top-10 right-5" color="red">{message}</Alert>)}
        <MyAlert/>
      </div>
    );
  }
  