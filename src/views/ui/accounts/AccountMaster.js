import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, Input, Label, Row, Spinner, Table } from 'reactstrap'
import $ from 'jquery'
import { validate } from '../../../helpers/utils'

let initial = {
    name:null,
    phone:null,
    full_address:null,
    ob_type:null,
    ob_date:null,
    ob_balance:null,
    ob_head:null,
    prefix:null,
    key_type:null,
}
function AccountMaster() {
  const dispatch = useDispatch()
  const [fields, setFields] = useState(initial)
  const [formSubmitted, trigger] = useState(false)
  const [heads, setHeads] = useState([])
  const app = useSelector(state=>state.auth)
  const [placeholder, setPlaceHolder]=useState(fields)
  const change = e => {
    if(e?.target)
    {
        e.target.style.border=''
        setFields({...fields, [e.target.name]:e.target.value})
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    trigger(!formSubmitted)  // use `!` instead `true|false`
    let {result, shouldGo} = validate(fields)
    if(shouldGo===false)
    { 
        setPlaceHolder(result)
        return 
    }
    dispatch({type:'LOADING'})
    axios.post('create-account',fields)
    .then(({data})=>{
        console.log(data)
        toast.success(data.message)
        setFields(()=>initial) // reset here
    })
    .catch(err=>{
        console.log(err)
        toast.error('Something went wrong!')
    })
    .finally(()=>{
        dispatch({type:'STOP_LOADING'})
    })
  }

  useEffect(()=>{
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
    // fetching account - heads
    axios.get('get-account-heads')
    .then(({data})=>{ 
        if(typeof data==='object') setHeads(data) 
    })
    .catch(err=>{
        toast.error('An error occurred!')
        console.log(err.message|err)
    })
    .finally(()=>dispatch({type:'STOP_LOADING'}))

    return ()=>null
  },[formSubmitted])

  return (
    <>
        <Col className='d-flex'>
            <Col md={6}>
                <Form onSubmit={handleSubmit}> 
                <Card>
                    <CardHeader>
                        <b> ACCOUNTS MASTER </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <Label> Account Name </Label>
                                <Input 
                                    type='text' 
                                    placeholder={placeholder.name??'Enter Name'}
                                    name='name'
                                    onChange={change}
                                />
                            </Col>
                            <Col md={6}>
                                <Label> Mobile </Label>
                                <Input 
                                    type='text' 
                                    name='phone' 
                                    placeholder={placeholder.phone??'+91 0000000000'} 
                                    onChange={change}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-3' >
                            <Col md={6}>
                                <Label> Head Name </Label>
                                <Input 
                                    type='select' 
                                    name='ob_head'
                                    onChange={change}
                                >
                                    {heads.map( (head,i) => {
                                        return <option key={i} value={head.name}> {head.name} </option>
                                    })}
                                    <option value={`branch_and_division`}> Branch & Division </option>
                                </Input>
                            </Col>
                            <Col md={6}>
                                <Label> Full Address </Label>
                                <Input 
                                    type='text' 
                                    name='full_address' 
                                    onChange={change}
                                    placeholder={placeholder.full_address??'Address'} 
                                />
                            </Col>
                        </Row>
                        <Row className='mt-4 mb-2'>
                            <CardText tag={'h5'} className='justify-contents-center text-center'> 
                                Opening Balance 
                            </CardText>
                        </Row>
                        <hr/>
                        <Row>
                            <Col md={4}>
                                <Label> O.B. Type </Label>
                                <Input 
                                    type='select' 
                                    name='ob_type'
                                    onChange={change}
                                >
                                    <option value={`Dr.`}> Dr. </option>
                                    <option value={`Mr.`}> Mr. </option>
                                    <option value={`Mrs.`}> Mrs. </option>
                                </Input>
                            </Col>
                            <Col md={4}>
                                <Label> Opening Balance </Label>
                                <Input 
                                    type='text' 
                                    name='ob_balance' 
                                    onChange={change}
                                    placeholder={placeholder.ob_balance??'Opening Balance'} 
                                />
                            </Col>
                            <Col md={4}>
                                <Label> O.B. Date </Label>
                                <Input type='date' 
                                    name='ob_date' 
                                    onChange={change}
                                    placeholder={placeholder.ob_date}
                                />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col md={4}>
                                <Label> Details </Label>
                                <Input 
                                    type='select' 
                                    onChange={change}
                                    name='prefix'
                                    placeholder='Details' 
                                >
                                    <option> Choose </option>
                                    <option value={'Dr.'}> Dr. </option>
                                    <option value={'Mr.'}> Mr. </option>
                                    <option value={'Mrs.'}> Mrs. </option>
                                </Input>
                            </Col>
                            <Col md={4}>
                                <Label> Key Type </Label>
                                <Input 
                                    type='select' 
                                    name='key_type' 
                                    onChange={change}
                                >
                                    <option value={`other`}></option>
                                    <option value={`other`}>Other</option>
                                </Input>
                            </Col>
                             
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <button className='btn btn-success mt-2 w-100 mb-2'> 
                        {app.loading ? <Spinner size={'sm'} />: 'Submit'} 
                        </button>
                    </CardFooter>
                </Card>
                </Form>
            </Col>
            <Col md={6} className='mx-3'>
                <Card>
                    <CardHeader>
                        <div className='d-flex'>
                            <Input 
                                type='search'
                                placeholder='Search by Name'
                            /> 
                            <button type='button' className='btn-primary btn btn-sm mx-1'>
                                <i className='fa fa-search'/>
                            </button>                             
                            <button className='btn-outline-primary btn btn-sm'>
                                +
                            </button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th> ? </th>
                                    <th> A/C Name </th>
                                    <th> Head </th>
                                    <th> Type </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Cash in Hand - Benipur </p></td>
                                    <td><p> Assets </p></td>
                                    <td><p> Other </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Loan Disbursement - Benipur  </p></td>
                                    <td><p> Assets </p></td>
                                    <td><p> Other </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Principal Collection - Benipur </p></td>
                                    <td><p> Assets </p></td>
                                    <td><p> Other </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Furniture </p></td>
                                    <td><p> Assets </p></td>
                                    <td><p> Other </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Equity Fund </p></td>
                                    <td><p> Assets </p></td>
                                    <td><p> Other </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Computer & Printer   </p></td>
                                    <td><p> Assets </p></td>
                                    <td><p> Other </p></td> 
                                </tr>
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

export default AccountMaster