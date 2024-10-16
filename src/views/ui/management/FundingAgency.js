import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, Input, Label, Row, Spinner, Table } from 'reactstrap';
import $ from 'jquery';
import { validate } from '../../../helpers/utils';

let initial = {
    name:'',
    phone:'',
    email:'',
    address:'',
    leadby:'',
}
function FundingAgency() {
  
  const dispatch = useDispatch();
  const {loading} = useSelector( state => state.auth );
  const [fields, setFields]           = useState(initial);
  const [formSubmitted, trigger]      = useState(false);
  const [funders, setFunders]         = useState([]);

const change = e => {
    if(e?.target) {
        e.target.style.border='';
        setFields({...fields, [e.target.name]:e.target.value});
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    trigger(!formSubmitted);  // use `!` instead `true|false`
    let {result, shouldGo} = validate(fields);
    if(shouldGo===false) { 
        console.log(result)
        return toast.error('Fill the required fields')
    }
    
    dispatch({ type:'LOADING'});
    axios.post('create-funder',fields)
    .then(({data}) => {
        toast.success(data.message);
        setFields(()=> initial ); // reset here
    })
    .catch(err => {
        console.log(err);
        toast.error('Something went wrong!');
    })
    .finally(()=> dispatch({type:'STOP_LOADING'}) )
  }

  useEffect(()=>{
    $('input[type=search]').on('keyup search',function () {
        // search logic here        
        $('tbody tr').each((i,row) => {
            if(!row.textContent.toLowerCase().includes(this.value?.toLowerCase()))
            {
                $(row).addClass('d-none');   
            } else {
                $(row).removeClass('d-none');
            }
        });
    });
    // fetching funders
    axios.get('funders')
    .then(({data})=> setFunders(data))
    .catch( err => {
        toast.error('An error occurred!');
        console.log(err.message|err);
    }).finally(() => dispatch({type:'STOP_LOADING'}))

    return ()=>null

  },[formSubmitted])

  return (
    <>
        <Col className='d-flex'>
            <Col md={6}>
                <Form onSubmit={handleSubmit}> 
                <Card>
                    <CardHeader>
                        <b> FUNDERS </b>
                    </CardHeader>
                    <CardBody>
                       
                        <Row className="mt-2">
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="fullName"> Full Name </Label>
                                    <Input 
                                        id="fullName"
                                        name="name"
                                        type="text"
                                        min={5}
                                        cast={'str'}
                                        placeholder="Enter funder name" 
                                        onChange={change}
                                        value={fields.name}
                                    />
                                </div>
                            </Col > 
                        </Row> 
                        <Row className="mt-2">
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="address"> Address </Label>
                                    <Input 
                                        id="address"
                                        name="address"
                                        type="text"
                                        min={10}
                                        placeholder="Enter full address" 
                                        onChange={change}
                                        value={fields.address}
                                    />
                                </div>
                            </Col > 
                        </Row> 
                        <Row className="mt-2">
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="email"> Mail ID </Label>
                                    <Input 
                                        id="email"
                                        name="email"
                                        type="email"
                                        min={8}
                                        placeholder="Enter mail ID" 
                                        onChange={change}
                                        value={fields.email}
                                    />
                                </div>
                            </Col > 
                        </Row> 
                        <Row className="mt-2">
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="phone"> Phone </Label>
                                    <Input 
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        cast={'num'}
                                        min={10}
                                        max={10}
                                        placeholder="Enter phone" 
                                        onChange={change}
                                        value={fields.phone}
                                    />
                                </div>
                            </Col > 
                        </Row> 
                        <Row className="mt-2">
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="leadby"> Lead By </Label>
                                    <Input 
                                        id="leadby"
                                        name="leadby"
                                        type="text"
                                        min={6}
                                        cast={'str'}
                                        placeholder="Enter lead by name" 
                                        onChange={change}
                                        value={fields.leadby}
                                    />
                                </div>
                            </Col > 
                        </Row> 
                    </CardBody>
                    <CardFooter>
                        <button className='btn btn-success mt-2 w-100 mb-2'> 
                        {loading ? <Spinner size={'sm'} />: 'Submit'} 
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
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th> ? </th>
                                    <th> Name </th>
                                    <th> Phone </th>
                                    <th> Lead By </th>
                                </tr>
                            </thead>
                            <tbody>
                                { funders.map( funder => {
                                    return (<tr key={funder.id}>
                                        <td><Input type='checkbox' onClick={()=>false}/></td>
                                        <td><p> { funder.name } </p></td>
                                        <td><p> { funder.phone } </p></td>
                                        <td><p> { funder.leadby } </p></td> 
                                    </tr>)
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

export default FundingAgency