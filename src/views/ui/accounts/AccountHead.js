import $ from 'jquery'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import {  Card, CardBody, CardFooter, CardHeader, Col, Form, Input, Label, Row, Table } from 'reactstrap'
import { validate } from '../../../helpers/utils';

function AccountHead() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [group_name, setGroup] = useState('')
    const [type, setType] = useState('')
    const [submitState, trigger] = useState(false)
    const typeRef=  useRef('')
    const groupRef=  useRef('')
    const [data, fillData] = useState([])
    const natureOptions = [
        {value:'Assets',label:'Assets'},
        {value:'Liabilities',label:'Liabilities'},
        {value:'Income',label:'Income'},
        {value:'Expenditure',label:'Expenditure'},
        {value:'Equity',label:'Equity'},
    ]

    const groups = [
        {value:'Branch & Division',label:'Branch & Division'},
        {value:'Capital Accounts',label:'Capital Accounts'},
        {value:'Loans',label:'Loans'},
        {value:'Suspense Account',label:'Suspense Account'},
        {value:'Current Liabilities',label:'Current Liabilities'},
        {value:'Fixed Assets',label:'Fixed Assets'},
        {value:'Investments',label:'Investments'},
        {value:'Sales Accounts',label:'Sales Accounts'},
        {value:'Indirect Expenses',label:'Indirect Expenses'},
        {value:'Indirect Income',label:'Indirect Income'},
        {value:'Misc. Expenses',label:'Misc. Expenses'},
        {value:'Direct Income',label:'Direct Income'},
        {value:'Direct Expenses',label:'Direct Expenses'},
        {value:'Reserves & Surplus',label:'Reserves & Surplus'},
        {value:'Duties & Taxes',label:'Duties & Taxes'},
        {value:'Deposits',label:'Deposits'},
        {value:'Stock in Hand',label:'Stock in Hand'},
        {value:'Secured Loans',label:'Secured Loans'},
        {value:'Equity',label:'Equity'},
    ]
    const changeName = e => {
        e.target.style.border=''
        setName(e.target.value)
    }
    const changeType = e => {
        if(e?.value) {
            setType(e.value)
        }
        $('.type').css('border','')
    }
    function changeGroup (e) {
        if(e?.value) {
            setGroup(e.value) 
        }
        $('.group_name').css('border','')
    }
    const [errors, setErrors] = useState({name,group_name,type})
    const handleSubmit = e => {
        e.preventDefault();
        const {shouldGo,result} = validate({name,group_name,type})
        if(shouldGo===false)
        {
            setErrors(result)
            for (const el in result) {
                $(`input[name=${el}]`).addClass('placeholder-error').css('1px solid red')
            }
            toast.error('Fill the required fields!')
            console.log(result)
            return 
        }    
        dispatch({type:'LOADING'})
        axios.post('/create-account-head', {
            name,
            group_name,
            type,
        })
        .then(({data})=>{
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
                                    placeholder={errors.name??'Enter Name'}
                                />
                            </Col>
                            <Col md={6}>
                                <Label> A/C Nature </Label>
                                <CreatableSelect 
                                    isClearable
                                    options={natureOptions}
                                    name='type'
                                    ref={typeRef}
                                    defaultValue={type}
                                    onChange={changeType}
                                    className='type'
                                    placeholder={errors.type??'Select Type'}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-3' >
                            <Col md={6}>
                                <Label> Primary Groups </Label>
                                <CreatableSelect 
                                    isClearable
                                    options={groups}
                                    name='group_name'
                                    ref={groupRef}
                                    defaultValue={group_name}
                                    onChange={changeGroup}
                                    className='group_name'
                                    placeholder={errors.group_name??'Select Group'}
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