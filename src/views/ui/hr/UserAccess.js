import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { validate } from '../../../helpers/utils'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { navigation } from '../../../layouts/SidebarData';
function UserAccess() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [fields, setFields] = useState({})
    const [menuItems, setMenus] = useState([])
    const boxStyled = { border:'1px solid lightgray',padding: '8px 0 0 19px'}

    const populateForm = id => {
        dispatch({type:'LOADING'})
        axios.get('get-employee/'+id)
        .then(({data})=>{
            console.log(data)
            setUser(data)
        }).catch(err=>err.message)
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    const change = e=>{
        if(e?.target)
        {
            setFields({...fields, [e.target.name]:e.target.value })
            e.target.style.border = ''
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        const {shouldGo, result} = validate(fields)
        if(shouldGo===false)
        {
            console.log(result)
            toast.error('Fill the required fields!')
            return 
        }
        dispatch({type:'LOADING'})
        axios.post('update-access',fields).
        then(({data})=>{
            console.log(data)
        }).catch(err=>console.log(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    useEffect(()=>{
        console.log(navigation)
        let menus = [];
        navigation.forEach(item=>{
            menus.push(item.title)
            if(item.sub)
            {
                menus = [...menus, ...item.sub.map(row=>row.title)]
            }
        })
        setMenus(menus)
        axios.get('employees').then(({data})=>{
            console.log(data)
            setUsers(data)
        }).catch(err=>console.log(err.message))
    },[])

    return (
        <>
           <Col className='d-flex'>
            <Col md={5}>
                <Card>
                <Form onSubmit={handleSubmit} >
                    <CardHeader>
                        <b> Users List </b>
                    </CardHeader>
                    <CardBody>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th> ? </th>
                                    <th> Empl.ID </th>
                                    <th> Name </th>
                                    <th> Desig. </th>
                                    <th> BranchID </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map( (row,i)=>{
                                    return <tr key={i}>
                                        <td className={`${row.id===user.id?'selected':''}`}> 
                                            <Button 
                                                className='bg-white btn-sm text-dark' 
                                                type='button' 
                                                style={{fontSize:''}}
                                                onClick={()=>populateForm(row.id)}><i className='fa fa-upload'/>
                                            </Button> 
                                        </td>
                                        <td className={`${row.id===user.id?'selected':''}`}>{row.id}</td>
                                        <td className={`${row.id===user.id?'selected':''}`}>
                                            {row.first_name+' '+row.last_name}
                                        </td>
                                        <td className={`${row.id===user.id?'selected':''}`}>
                                            {row.designation}
                                        </td>
                                        <td className={`${row.id===user.id?'selected':''}`}>
                                            {row.branch}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        
                    </CardFooter>
                    </Form>
                </Card>
            </Col>
            <Col md={7} style={{fontSize:''}}  className='ms-4'>
                <Card>
                    <CardHeader>
                        <b>User Access Setup </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={4} style={{fontSize:'14px'}}>
                                <p> User Details </p> 
                                <FormGroup> 
                                    <Label>Employee ID</Label>
                                    <Input type='text' value={user.id} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Name </Label>
                                    <Input type='text' value={user.first_name!==undefined ? user.first_name+' '+user.last_name:''} disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Designation </Label>
                                    <Input type='text' placeholder='Designation' value={user?.designation??''} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Report Access Code </Label>
                                    <Input type='text' disabled />
                                </FormGroup>
                            </Col>    
                            <Col md={8}>
                                <p> Report Access </p>
                                <hr/>
                                <Container>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 1. General </Label>
                                            </div>
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 2. HR & Payroll </Label>
                                            </div> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 3. Members </Label>
                                            </div>  
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 4. Accounts </Label>
                                            </div>   
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 5. Loan </Label>
                                            </div>    
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 6. Banking </Label>
                                            </div>     
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 7. Collections </Label>
                                            </div>      
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 8. NPA </Label>
                                            </div>       
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox'/>
                                                <Label className='ms-2'> 9. Advance </Label>
                                            </div>        
                                        </Col>
                                    </Row>
                                </Container>
                               
                            </Col>                            
                            <Container>
                                <h5> Function's: User System Access </h5>
                                <hr/>
                                <Row >
                                    <div className='col-5 ms-3 bg-dark text-white' 
                                    style={{borderRadius:'5px'}} >
                                        Center Collection Page Setup
                                    </div>
                                    <p style={{paddingLeft:'20px'}}>
                                        Insert=Add Next Installment, Edit=Row Value Edit, Delete=Skip Collection, Loan Show=Loan Settel 
                                    </p>
                                </Row>
                            </Container>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Form>
                            <Table className='table-bordered table-hover '>
                                <thead style={{backgroundColor:'lightblue'}}>
                                    <tr style={{background:'blue'}}>
                                        <th><Input type='checkbox' /></th>
                                        <th> PRNT </th>
                                        <th> TITLE </th>
                                        <th> DETAILS </th>
                                        <th> VIEW </th>
                                        <th> ADD </th>
                                        <th> EDIT </th>
                                        <th> DEL </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.id ? 
                                     menuItems.map( (row,i)=>{
                                        return (
                                            <tr key={i}>
                                                <td>{++i}</td>
                                                <td>0</td>
                                                <td>{row}</td>
                                                <td>{row}</td>
                                                <td><Input type='checkbox'/></td>
                                                <td><Input type='checkbox'/></td>
                                                <td><Input type='checkbox'/></td>
                                                <td><Input type='checkbox'/></td>
                                            </tr>
                                        )
                                    }) 
                                    :''}
                                </tbody>
                            </Table>
                        </Form>          
                    </CardFooter>
                </Card>
            </Col>
            </Col>
        </>
    )
}

export default UserAccess