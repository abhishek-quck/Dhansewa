import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardText, Col, Form, Input, Label, Row, Table } from 'reactstrap'
import { validate } from '../../../helpers/utils';

const EmployeeMaster = () => {
    const dispatch = useDispatch();
    const [fields, setFields] = useState({})
    const [users, setUsers] = useState([])
    const inputStyle = {fontSize:14}
    const [designations, setDesignations] = useState([])

    const change = e => {
        if(e?.target)
        {
            setFields({...fields, [e.target.name]:e.target.value})
            e.target.style.border=''
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        let {shouldGo,result} = validate(fields)
        if(shouldGo===false)
        {
            console.log(result)
            dispatch({type:'STOP_LOADING'})
        }
        axios.post('',fields).then(({data})=>{
            console.log(data)
        })
        .catch(err=>{
            dispatch({type:'LOADING'})
            console.log(err.message)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    useEffect(()=>{
        axios.get('users').then(({data})=> setUsers(data)).catch(err=>console.log(err.message))
        axios.get('designations').then(({data})=>setDesignations(data)).catch()
    },[])
    return (
    <>
            <Col className='d-flex'>
            <Col md={5}>
                <Card>
                <Form onSubmit={handleSubmit} >
                    <CardHeader>
                        <b> Employee Information </b>
                    </CardHeader>
                    <CardBody style={{fontSize:'small'}}>
                        <Row >
                            <Col>
                                <Label> Employee Type </Label>
                                <Input 
                                    onChange={change}
                                    name={'emp_type'} 
                                    value={fields.emp_type}
                                    style={inputStyle} 
                                    type='select' 
                                >
                                    <option value={'field'}> FIELD </option>
                                    <option value={'office'}> OFFICE </option>
                                </Input>
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Designation <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'address'} 
                                        style={inputStyle} 
                                        type='select'
                                        value={fields.address}
                                        placeholder='Enter Address'
                                    >
                                        <option> Choose </option>
                                        {designations.map(item=>{
                                            return <option value={item.abbr}>{item.name}</option>
                                        })}
                                    </Input> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> First Name <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'name'} 
                                    value={fields.name}
                                    style={inputStyle} 
                                    type='text' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Last Name <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'last_name'} 
                                        style={inputStyle} 
                                        type='text'
                                        value={fields.last_name}
                                        placeholder='Enter Address'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Mobile <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'name'} 
                                    value={fields.name}
                                    style={inputStyle} 
                                    type='text' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Posting Branch <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'address'} 
                                        style={inputStyle} 
                                        type='text'
                                        value={fields.address}
                                        placeholder='Enter Address'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Access Branch <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'access_branch'} 
                                    value={fields.access_branch}
                                    style={inputStyle} 
                                    type='text' 
                                    placeholder='Type All for all'
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Address <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'address'} 
                                        style={inputStyle} 
                                        type='text'
                                        value={fields.address}
                                        placeholder='Enter Address'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> User Login ID <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'login_id'} 
                                    value={fields.login_id}
                                    style={inputStyle} 
                                    type='text' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Password <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'password'} 
                                        style={inputStyle} 
                                        type='text'
                                        value={fields.password}
                                        placeholder='Enter Password'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Married Y/N </Label>
                                <Input 
                                    onChange={change}
                                    name={'married'} 
                                    value={fields.married}
                                    style={inputStyle} 
                                    type='select' 
                                >
                                    <option value={'yes'}> Yes </option>
                                    <option value={'no'}> No </option>
                                </Input>
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Gender <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'gender'} 
                                        style={inputStyle} 
                                        type='select'
                                        value={fields.gender}
                                    > 
                                        <option >  </option>
                                        <option value={'male'}> Male </option>
                                        <option value={'female'}> Female </option>
                                    </Input>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Motorization </Label>
                                <Input 
                                    onChange={change}
                                    name={'motorization'} 
                                    value={fields.motorization}
                                    style={inputStyle} 
                                    type='select' 
                                >
                                    <option value={'yes'}> Yes </option>
                                    <option value={'no'}> No </option>
                                </Input>
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Dashboard <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'dashboard'} 
                                        style={inputStyle} 
                                        type='select'
                                        value={fields.dashboard} 
                                    > 
                                        <option value={'branch'}> BRANCH </option>
                                        <option value={'company'}> COMPANY </option>
                                        <option value={'self'}> SELF </option>
                                    </Input>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Approval Limit <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'approval_limit'} 
                                    value={fields.approval_limit}
                                    style={inputStyle} 
                                    type='number' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> DOB <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'dob'} 
                                        style={inputStyle} 
                                        type='date'
                                        value={fields.dob}
                                        placeholder='Enter DOB'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> App Login Allow <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'app_login'} 
                                    value={fields.app_login}
                                    style={inputStyle} 
                                    type='select' 
                                >
                                    <option value={'yes'}> Yes </option>
                                    <option value={'no'}> No </option>
                                </Input>
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Exit Date <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'exit_date'} 
                                        style={inputStyle} 
                                        type='date'
                                        value={fields.exit_date}
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Join Date <small className='text-danger'>*</small></Label>
                                <Input 
                                    onChange={change}
                                    name={'join_date'} 
                                    value={fields.join_date}
                                    style={inputStyle} 
                                    type='date' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Email ID </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'email'} 
                                        style={inputStyle} 
                                        type='date'
                                        value={fields.email}
                                        placeholder='Email ID'
                                    /> 
                                </div>
                            </Col>
                        </Row>

                        <CardText style={{backgroundColor:'beige',padding:5,marginTop:15}}>
                            <b className='text-primary mx-1'> OTHER INFO </b>
                        </CardText>

                        <Row className='mt-2'>
                            <Col>
                                <Label> PAN  </Label>
                                <Input 
                                    onChange={change}
                                    name={'pan'} 
                                    value={fields.pan}
                                    style={inputStyle} 
                                    type='text' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Aadhaar No. <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'aadhaar'} 
                                        style={inputStyle} 
                                        type='number'
                                        value={fields.aadhaar}
                                        placeholder='Email ID'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Bank Name </Label>
                                <Input 
                                    onChange={change}
                                    name={'pan'} 
                                    value={fields.pan}
                                    style={inputStyle} 
                                    type='text' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Bank Branch </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'aadhaar'} 
                                        style={inputStyle} 
                                        type='number'
                                        value={fields.aadhaar}
                                        placeholder='Email ID'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                    </CardBody> 
                    </Form>
                </Card>
            </Col>
            <Col md={7} style={{fontSize:''}}  className='ms-4'>
                <Card>
                    <CardBody>
                        <Row  >
                            <div className='d-flex'>
                                <Button type='button' className='bg-white text-dark'>
                                    <i class="fa-solid fa-bars"></i>
                                </Button>
                                <Input type='select' style={{width:170}}>
                                    <option value={'active'}> Active </option>
                                    <option value={'exit'}> Exit </option>
                                </Input>
                                <Input type='text' />
                                <Button type='button' color='primary'> Find </Button>
                            </div>
                        </Row>
                        <p> Employee List </p>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th> ? </th>
                                    <th> EMP.ID </th>
                                    <th> EMP.Name </th>
                                    <th> Branch </th>
                                    <th> Type </th>
                                    <th> Post </th>
                                    <th> Mobile </th>
                                    <th> UserID </th>
                                    <th> Display </th>
                                    <th> Access </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map( (row,i)=>{
                                    return <tr>
                                        <td>{++i}</td>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.branch??''}</td>
                                        <td>{row.type??''}</td>
                                        <td>{row.post??''}</td>
                                        <td>{row.phone??''}</td>
                                        <td>{row.login_id??''}</td>
                                        <td>{row.display??''}</td>
                                        <td>{row.allow??''}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
            </Col>
    </>
    )
}

export default EmployeeMaster