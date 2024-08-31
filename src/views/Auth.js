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
import toast from 'react-hot-toast';

function Auth() {
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
    if(state.userToken && state.isAdmin)
    {
        navigate('/landing')
    } else {
        navigate('/dashboard')
    }
  },[ state.userToken, navigate, state.isAdmin ])

  const handleLogin = async(event) => {
    event.preventDefault() 
    dispatch({ type:'LOADING' })
    try {
      axios.post(`login`, fields ).then( async ({ data })=>
      {  
        if( data.access_token )
        {
            // set identification to session
            localStorage.setItem('auth-token', data.access_token )
            localStorage.setItem('auth-user', JSON.stringify(data.user) )

            dispatch({type:'SET_TOKEN', payload:data.access_token }) // store token-generated post-login
            dispatch({type:'SET_AUTH', payload:data.user })  // user-info

            axios.defaults.headers.common['Authorization'] = `Bearer `+ data.access_token;
            let mappedPerms = {}
            let permissions = {};
            let response = await axios.get('list-permissions');

            response.data.forEach( item => {
                mappedPerms[item.name] = item.id ;
                permissions[item.id] = item.name ;
            });

            localStorage.setItem('permMap', JSON.stringify(mappedPerms) )
            dispatch({ type:'PERM_MAP', payload:mappedPerms }) // permission name-for-id
            // redirect according to user-type

            if(data.login_type==='User') {

                dispatch({type:'SET_ADMIN_STATUS', payload:true })
                localStorage.setItem('isAdmin', true )
                navigate('/landing')

            } else {

                dispatch({ type:'SET_ADMIN_STATUS',payload:false })
                localStorage.setItem('isAdmin', false )
                dispatch({
                    type:'SET_COMPANY', 
                    payload:{
                        id:data.company.id,
                        name:data.company.name 
                    }
                })
                 
                let havePermissions = {};
                let resp = await axios.get('permissions/'+ data.user.id );

                resp.data.forEach( row => {
                    let { add, edit, view, permission_id } = row;
                    let crud = { view: view===1, add:add===1, edit:edit===1, delete:row.delete===1 } // will convert int to bool
                    let permName = permissions[permission_id];
                    havePermissions[permName] = crud;
                })
                localStorage.setItem('permissions', JSON.stringify(havePermissions) );
                dispatch({
                    type:'SET_PERMISSION',
                    payload:havePermissions??{}
                });
                return 
                // navigate('/dashboard')
            }
        }
      }).catch(()=>{
        toast.error('Invalid credentials!') 
        localStorage.clear()
      })
      .finally(()=>dispatch({type:'STOP_LOADING'}))
    } catch (error) {
      console.log(error)
      localStorage.clear()
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
            <MDBInput wrapperClass='mb-4 mt-5' label='Email address' id='form1' type='email' name='email' onChange={onchange} defaultValue={fields.email}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='password' onChange={onchange} defaultValue={fields.password}/> 

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

export default Auth;