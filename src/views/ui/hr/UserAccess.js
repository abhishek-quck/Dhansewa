import $ from 'jquery'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { validate } from '../../../helpers/utils'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
function UserAccess() {
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const [fields, setFields] = useState({})
    const [type, setType] = useState('')
    const typeRef=  useRef('')
    const groupRef=  useRef('')
    const [errors, setErrors] = useState({type})

    const change = e=>{
        if(e?.target)
        {
            setFields({...fields, [e.target.name]:e.target.value })
        }
    }
    const changeType = e => {
        if(e?.value) {
            setType(e.value)
        }
        $('.type').css('border','')
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
                                        <td>{i++}</td>
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
            <Col md={6} style={{fontSize:''}}>
                <Card>
                    <CardHeader>
                        <b>User Access Setup </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={4}>
                                <p> User Details </p> 
                                <FormGroup> 
                                    <Label>Employee ID</Label>
                                    <Input type='text' />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Name </Label>
                                    <Input type='text' />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Designation </Label>
                                    <Input type='text' />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Report Access Code </Label>
                                    <Input type='text' />
                                </FormGroup>
                            </Col>    
                            <Col md={8}>
                                <p> Report Access </p>
                                <hr/>
                            </Col>                            
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