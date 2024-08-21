import $ from 'jquery';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, Input, Label, Row, Table } from 'reactstrap'
import { validate } from '../../../helpers/utils';
import toast from 'react-hot-toast';
let initial = {
    emp_type:'',
    designation:'',
    first_name:'',
    last_name:'',
    phone:'',
    branch:'',
    access_branch:'',
    address:'',
    login_id:'',
    password:'',
    married:'',
    gender:'',
    motorization:'',
    dashboard:'',
    approval_limit:'',
    dob:'',
    app_login:'',
    exit_date:'',
    join_date:'',
    email:'',
    pan:'',
    aadhaar:'',
    bank:'',
    bank_branch:'',
}
const EmployeeMaster = () => {
    const dispatch = useDispatch();
    const [fields, setFields] = useState(initial)
    const [employees, setEmployees] = useState([])
    const inputStyle = {fontSize:14}
    const [designations, setDesignations] = useState([])
    const [branches, setBranches] = useState([])
    const [reload, setReload] = useState(false)
    const [set , settingUp ] = useState(false)
    const [selectedEmp, selectEmp] = useState(null)
    const change = e => {
        if(e?.target)
        {
            setFields({...fields, [e.target.name]:e.target.value})
            e.target.style.border=''
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        let unrequired = ['motorization','married','email','pan','bank','exit_date','bank_branch']
        if(selectedEmp) {
            unrequired.push('password')
        } else {
            unrequired.splice(unrequired.indexOf('password'),1);
        }
        let {shouldGo,result} = validate(fields,unrequired)
        if(shouldGo===false)
        {
            toast.error('Fill the required fields!')
            console.log(result)
            return
        }
        dispatch({type:'LOADING'})
        let url = selectedEmp ? 'update-employee/'+selectedEmp :'add-employee';  
        axios.post( url,fields ).then(({data})=>{
            console.log(data)
            if(data.status)
            {
                toast.success(data.message);
                setFields(()=>initial)
            }
        })
        .catch(err=>{
            console.log(err.message)
            toast.error(err.message)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    const selectRow = e => {
        let empID = $(e.target).parents('tr:first').find('td.emp_id').text()
        if(selectedEmp && empID!==selectedEmp) return 
        $(e.target).parents('tr:first').find('td').each(function(k,va){
            $(va).toggleClass('selected')
        })
        selectEmp(()=> ($(e.target).is(':checked')? empID : null))
        if(!$(e.target).is(':checked'))
        {
            setFields(initial)
        }
    }

    const populateForm = e => {
        if(set===true && selectedEmp)
        {
            dispatch({type:'LOADING'})
            axios.get('get-employee/'+ selectedEmp)
            .then(({data})=>{
                setFields(data)
                setReload(!reload)
            }).catch()
            .finally(()=>dispatch({type:'STOP_LOADING'}))
        }
        settingUp(!set)
    }
    useEffect(()=>{
        axios.get('employees').then(({data})=> setEmployees(data)).catch(err=>console.log(err.message))
        axios.get('designations').then(({data})=>setDesignations(data)).catch(err=>console.log(err.message))
        axios.get('get-branches').then(({data})=>setBranches(data)).catch(err=>console.log(err.message))
    },[reload])
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
                                    <option></option>
                                    <option value={'field'}> FIELD </option>
                                    <option value={'office'}> OFFICE </option>
                                </Input>
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Designation <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'designation'} 
                                        style={inputStyle} 
                                        type='select'
                                        value={fields.designation??''} 
                                    >
                                        <option> Choose </option>
                                        {designations.map(item=>{
                                            return <option key={item.abbr} value={item.abbr}>{item.name}</option>
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
                                    name={'first_name'} 
                                    value={fields.first_name}
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
                                    name={'phone'} 
                                    value={fields.phone}
                                    style={inputStyle} 
                                    min={10}
                                    max={10}
                                    cast="num"
                                    type='text' 
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Posting Branch <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'branch'} 
                                        style={inputStyle} 
                                        type='select'
                                        value={fields.branch??''}
                                        placeholder='Enter Address'
                                    >
                                        {branches.map( branch => {
                                            return <option key={branch.id} value={branch.id}>{branch.name}</option>
                                        })}
                                    </Input> 
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
                                    value={fields.married??''}
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
                                        value={fields.gender??''}
                                    > 
                                        <option > Choose </option>
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
                                    value={fields.motorization??''}
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
                                        value={fields.dashboard??''} 
                                    > 
                                        <option></option>
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
                                    type='text' 
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
                                    <Label> Exit Date </Label>
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
                                        type='text'
                                        value={fields.email??''}
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
                                    value={fields.pan??''}
                                    style={inputStyle} 
                                    type='text' 
                                    placeholder='Enter PAN number'
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Aadhaar No. <small className='text-danger'>*</small> </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'aadhaar'} 
                                        style={inputStyle} 
                                        type='text'
                                        value={fields.aadhaar}
                                        placeholder='Enter aadhaar'
                                        min={12}
                                        max={12}
                                        cast='num'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col>
                                <Label> Bank Name </Label>
                                <Input 
                                    onChange={change}
                                    name={'bank'} 
                                    value={fields.bank??''}
                                    style={inputStyle} 
                                    type='text' 
                                    placeholder='Enter Bank Name'
                                />
                            </Col>
                            <Col className='d-flex'>
                                <div>
                                    <Label> Bank Branch </Label>
                                    <Input 
                                        onChange={change} 
                                        name={'bank_branch'} 
                                        style={inputStyle} 
                                        type='text'
                                        value={fields.bank_branch??''}
                                        placeholder='Enter Bank Branch'
                                    /> 
                                </div>
                            </Col>
                        </Row>
                        <CardFooter>
                            <Button color='success' className='w-100 mt-4'> Submit </Button>
                        </CardFooter>
                    </CardBody> 
                    </Form>
                </Card>
            </Col>
            <Col md={7} style={{fontSize:''}} className='ms-4'>
                <Card>
                    <CardBody>
                        <Row  >
                            <div className='d-flex'>
                                <Button type='button' className='bg-white text-dark' onClick={populateForm} >
                                    <i className={`${set===false?'fa-solid fa-bars':'fa fa-upload'}`}></i>
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
                                {employees.map( (row,i)=>{
                                    return <tr key={i}>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>
                                            {set || selectedEmp ? <Input type='checkbox' checked={selectedEmp==row.id} onClick={selectRow}/> :++i}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected emp_id':'emp_id'}>{row.id}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.first_name+' '+row.last_name}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.branch??''}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.emp_type??''}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.designation??''}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.phone??''}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected loginID':'loginID'}>{row.login_id??''}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.dashboard??''}</td>
                                        <td className={row.id===parseInt(selectedEmp)?'selected':''}>{row.app_login??''}</td>
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