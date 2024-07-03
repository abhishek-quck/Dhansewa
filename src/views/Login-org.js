import React, { useState } from 'react'
import { Col, FormGroup, Input, Label, Form, Row, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails }from '../reducers/theReducer'
import axios from 'axios' 
function Login() {
  const dispatch = useDispatch();
  const state= useSelector(state=>state.auth)
  dispatch({type:'AUTH'})
  console.log(state);
  const [fields, setFields] = useState({email:'cCSllWjl5m@example.com',password:'password'})
  const onchange = e => {
    setFields({...fields, [e.target.name]:e.target.value})
  }  
// cCSllWjl5m@example.com
// password 
  const handleLogin = event => {
    event.preventDefault() 
    axios.post(`login`,fields).then(response=>
    {  
        if(response.data.access_token)
        {
            let { data } = response  
            localStorage.setItem('auth-token', data.access_token )
            dispatch({type:'SET_TOKEN', payload:data.access_token })
            axios.defaults.headers.common['Authorization'] = `Bearer `+data.access_token
        }
    })
  }  
  return (
    <Col>
        <div className='d-flex'>
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Col>
                     <Row>
                        <Button color='success' onClick={getUserDetails}>Check User Details</Button>
                     </Row>
                     <Row>
                        <Col>
                            <Label>
                                Email
                            </Label>
                            <Input type='text' name='email' onChange={onchange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                            <Label>
                                Password
                            </Label>
                            <Input type='password' name='password' onChange={onchange} />
                        </Col>
                     </Row>
                     <Row>
                        <button type='submit' className='btn btn-success'>Submit</button>
                     </Row>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    </Col>
  )
}

export default Login