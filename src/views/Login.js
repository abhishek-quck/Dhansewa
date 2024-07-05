import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Form } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch(); 
  const [justifyActive, setJustifyActive] = useState('login');;
  const [fields, setFields] = useState({email:'',password:''})
  const [signupFields, regFields] = useState({email:'',password:'',name:'',username:''})
  
  const state= useSelector(state=>state.auth)  

  const onchange = e => {
    setFields({...fields, [e.target.name]:e.target.value})
  }  
  
  const handleJustifyClick = value => {
    if (value === justifyActive) {
      return;
    } 
    setJustifyActive(value);
  };

  const onInputChange = e => {
    regFields({...signupFields, [e.target.name]:e.target.value })
  }

  const handleRegister = event => {
    event.preventDefault()
    axios.post('register', signupFields).then(response=>
    {
      let {data} = response
      console.log(data)
      setJustifyActive('login')
    })
  } 

  
  useEffect(()=>{ 
    if(state.userToken)
    {
      navigate('/landing')
    } 
  },[ state.userToken, navigate ])

  const handleLogin = event => {
    event.preventDefault() 
    dispatch({ type:'LOADING' })
    try {
      axios.post(`login`,fields).then(response=>
      {  
        if( response.status!==200 )
        {
          console.log(response)
          alert(response.statusText) 
          dispatch({type:'STOP_LOADING'})
        }
        if( response.data.access_token )
        {
          let { data } = response  
          localStorage.setItem('auth-token', data.access_token )
          dispatch({type:'SET_TOKEN', payload:data.access_token })
          axios.defaults.headers.common['Authorization'] = `Bearer `+data.access_token;
          navigate('/landing')
        }
      }).catch(err=> {
        console.log(err)
        alert(err.response.statusText) 
        dispatch({type:'STOP_LOADING'})
      })
    } catch (error) {
      alert(error.message)
      console.log(error)
    }
  }  

  return (
    <>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {/* HEADER */}
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('register')} active={justifyActive === 'register'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent> 
        <MDBTabsPane open={justifyActive === 'login'}>
         <Form onSubmit={handleLogin}>          
            <MDBInput wrapperClass='mb-4 mt-5' label='Email address' id='form1' type='email' name='email' onChange={onchange}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='password' onChange={onchange}/> 

            <div className="d-flex justify-content-center mx-4 mb-4"> 
                <a href="!#" className='text-decoration-none' >Forgot password?</a>
            </div>

            <button className="btn btn-primary mb-4 w-100">Sign in</button>
            <p className="text-center">Not a member? <Link href="#" onClick={() => handleJustifyClick('register')}>Register</Link></p>
            </Form>
        </MDBTabsPane>

        <MDBTabsPane open={justifyActive === 'register'}>
 
        <Form onSubmit={handleRegister}>

          <MDBInput wrapperClass='mb-4 mt-4' label='Name' name='name' type='text' onChange={onInputChange}/>
          <MDBInput wrapperClass='mb-4' label='Username' name='username' type='text' onChange={onInputChange}/>
          <MDBInput wrapperClass='mb-4' label='Email' name='email' type='email' onChange={onInputChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={onInputChange}/>

          <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <button className="btn btn-primary mb-4 w-100">Sign up</button>

        </Form>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>

    </>
  );
}

export default Login;