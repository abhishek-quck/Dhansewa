import { useNavigate, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import axios from "axios";  
import { useEffect } from "react";
import { useSelector } from "react-redux"; 
import ShowError from "./components/errorHandling/ShowError";
import "react-datepicker/dist/react-datepicker.css";

axios.defaults.baseURL='https://demoapi.dhanseva.co.in/public/api';
// axios.defaults.baseURL='http://localhost/Dhansewa-API/public/api';
axios.defaults.headers.common = {
  "Accept":"application/json",
  "Content-Type":"application/json", 
  "Authorization":`Bearer ${localStorage.getItem('auth-token')}`
}  

const App = () => {     

    let { userToken } = useSelector(state=>state.auth)
    const { error, errorCode } = useSelector( state=>state.auth )
    let navigate = useNavigate()
    useEffect(()=> {

        if( userToken===null ) {
            navigate('/login')
        } 
        return () => {}

    },[ userToken, navigate ])
    const routing = useRoutes(Themeroutes);

    if(error) {
        if(errorCode===500) {
            return <ShowError error={error}/>
        }
    }
    return <div>{routing}</div>;
    
};

export default App;
