import $ from 'jquery'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import {  Card, CardBody, CardFooter, CardHeader, Col, Form, Input, Label, Row, Table } from 'reactstrap'

function AccountHead() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [group_name, setGroup] = useState('')
    const [type, setType] = useState('')
    const [submitState, trigger] = useState(false)
    const typeRef=  useRef('')
    const groupRef=  useRef('')
    const [data, fillData] = useState([])
    const changeName = e => {
        setName(e.target.value)
    }
    const changeType = e => {
        if(e?.value) setType(e.value)
    }
    const changeGroup = e => {
        if(e?.value) setGroup(e.value)
    }
    const handleSubmit = e => {
        dispatch({type:'LOADING'})
        e.preventDefault();
        axios.post('/create-account-head', {
            name,
            group_name,
            type,
        })
        .then(({data})=>{
            // console.log(data)
            toast.success(data.message??'Record added succesfully!')
            setName(()=>'')
            setGroup(()=>'')
            setType(()=>'')
            typeRef.current.clearValue()
            groupRef.current.clearValue()
        })
        .catch(err=>{
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
        trigger(!submitState)
    }

    const init = () => {
        dispatch({type:'LOADING'})
        axios.get('get-account-heads')
        .then(({data})=>{ 
            if(typeof data==='object')
            {
                fillData(data)
            }
        })
        .catch(err=>{
            toast.error('An error occurred!')
            console.log(err.message|err)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    
    $('input[type=search]').on('keyup search',function () {
        // search logic here        
        $('tbody tr').each((i,row) => {
            if(!row.textContent.toLowerCase().includes(this.value?.toLowerCase()))
            {
                $(row).addClass('d-none')   
            }else{
                $(row).removeClass('d-none')   
            }
        });
    });

    useEffect(()=>{
        init()
        return ()=>null
    },[submitState])
    return (
    <>
        <Col className='d-flex'>
            <Col md={6}>
                <Card>
                <Form onSubmit={handleSubmit} >
                    <CardHeader>
                        <b> ACCOUNT HEAD </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <Label> Account Head Name </Label>
                                <Input 
                                    name='name'
                                    type='text'
                                    onChange={changeName}
                                    value={name}
                                />
                            </Col>
                            <Col md={6}>
                                <Label> A/C Nature </Label>
                                <CreatableSelect 
                                    isClearable
                                    options={[{value:'',label:''}]}
                                    name='type'
                                    ref={typeRef}
                                    defaultValue={type}
                                    onChange={changeType}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-3' >
                            <Col md={6}>
                                <Label> Primary Groups </Label>
                                <CreatableSelect 
                                    isClearable
                                    options={[{value:'',label:'Branch & Division'}]}
                                    name='group'
                                    ref={groupRef}
                                    defaultValue={group_name}
                                    onChange={changeGroup}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <button className='btn btn-success w-100'> Submit </button>
                    </CardFooter>
                    </Form>
                </Card>
            </Col>
            <Col md={6} className='mx-3'>
                <Card>
                    <CardHeader>
                        <div className='d-flex'>
                            <Input 
                                type='search'
                            /> 
                            <button className='btn-primary btn btn-sm mx-1'>
                                <i className='fa fa-search'/>
                            </button>                             
                            <button className='btn-outline-primary btn btn-sm mx-1'>
                                +
                            </button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th> ? </th>
                                    <th> Head Name </th>
                                    <th> Group Name </th>
                                    <th> Type </th>
                                </tr>
                            </thead>
                            <tbody>
                              {data.map((row,i)=>{
                                return <tr key={i}>
                                    <td><Input type='checkbox'/></td>
                                    <td>{row.name}</td>
                                    <td>{row.group_name}</td>
                                    <td>{row.type}</td>
                                </tr>
                              })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        
                    </CardFooter>
                </Card>
            </Col>
        </Col>
    </>
    )
}

export default AccountHead