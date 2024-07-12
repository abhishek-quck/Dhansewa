import { useNavigate, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import axios from "axios";  
import { useEffect } from "react";
import { useSelector } from "react-redux"; 
import ShowError from "./components/errorHandling/ShowError";

axios.defaults.baseURL='https://demoapi.dhanseva.co.in/public/api';
// axios.defaults.baseURL='http://localhost/Dhansewa-API/public/api';
axios.defaults.headers.common = 
{
  "Accept":"application/json",
  "Content-Type":"application/json", 
  "Authorization":`Bearer ${localStorage.getItem('auth-token')}`
}  

const App = () => {     
  let state = useSelector(state=>state.auth)
  const {error} = useSelector(state=>state.auth)
  let navigate = useNavigate()
  useEffect(()=>{
    if(state.userToken===null)
    {
      navigate('/login')
    } 
    return ()=>{}
  },[state.userToken,navigate])
  const routing = useRoutes(Themeroutes);
  if(error)
  {
    return <ShowError/>
  }
  return <div>{routing}</div>;
};

export default App;
