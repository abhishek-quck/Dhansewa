import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { validate } from '../../../helpers/utils'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
function UserAccess() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [fields, setFields] = useState({})
    const boxStyled = { border:'1px solid lightgray',padding: '8px 0 0 19px'}
    const change = e=>{
        if(e?.target)
        {
            setFields({...fields, [e.target.name]:e.target.value })
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
        axios.get('users').then(({data})=>{
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
                                    return <tr>
                                        <td>{++i}</td>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.name}</td>
                                        <td>{row.name}</td>
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
                                    <Input type='text'  disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Name </Label>
                                    <Input type='text' disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Designation </Label>
                                    <Input type='text' placeholder='Designation'  disabled/>
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

                    </CardFooter>
                </Card>
            </Col>
            </Col>
        </>
    )
}

export default UserAccess