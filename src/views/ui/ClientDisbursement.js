import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'

function ClientDisbursement() {
    const dispatch = useDispatch()
    const [responseData,setResponse] = useState([])
    const [fields,setFields] = useState({
        branch:'',
        center:'',
        from:'',
        to:'',
        name:''
    })

    const handleSearch = e => {
        e.preventDefault();
        dispatch({type:'LOADING'})
        axios.post('search-client-disbursements',fields)
        .then(({data})=>{
            console.log(data)
            if(data){
                setResponse(data)
            }
        }).finally(()=>{
            dispatch({type:'STOP_LOADING'})
        })
    }
    const centerOptions=[
        {value:'all',label:'All'}
    ]
    const branchOptions=[
        {value:'benipur',label:'Benipur'},
        {value:'madhubani',label:'Madhubani'}
    ]
    return (
    <div>
        <Col md={12}>
            <Card>
                <CardHeader>
                    <div className='hstack' style={{justifyContent:'space-between'}}>
                        <b> CLIENT DISBURSEMENT </b>
                        <div>
                        <button className='btn btn-primary btn-sm'>
                            <i className='fa fa-download'/>  MCD Data
                        </button>
                        <button className='btn btn-primary btn-sm mx-1'> 
                            <i className='fa fa-download'/> Download
                        </button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSearch}> 
                    <Row>
                        <Col md={3}>
                            <Label>Branch Name</Label>
                            <ReactSelect
                                options={branchOptions}
                                onChange={e=>setFields({...fields, branch:e.value})}
                            />
                        </Col>
                        <Col md={3}>
                            <Label>Center Name</Label>
                            <ReactSelect 
                                options={centerOptions}
                                onChange={e=>setFields({...fields, center:e.value})}
                            />
                        </Col>
                        <Col md={2}>
                            <Label> From Date</Label>
                            <Input type='date'></Input>
                        </Col>
                        <Col md={2}>
                            <Label> To Date</Label>
                            <Input type='date'></Input>
                        </Col>
                        <Col md={2}>
                            <Label> Name</Label>
                            <div className='hstack'>
                                <Input 
                                    type='text' 
                                    placeholder='Search Name'
                                />
                                <button className='btn btn-primary'><i className='fa fa-search' /></button>
                            </div>
                        </Col>
                    </Row>
                    </Form>
                    <Table bordered hover style={{fontSize:'small',marginTop:'20px'}}>
                        <thead>
                            <tr>
                                <th> SRN </th>
                                <th> Branch </th>
                                <th> Center Name </th>
                                <th> Client ID </th>
                                <th> Loan ID </th>
                                <th> Center ID </th>
                                <th> Client Name </th>
                                <th> Phone </th>
                                <th> DB Date </th>
                                <th> DB Amount </th>
                                <th> Loan Fee </th>
                                <th> Insurance </th>
                                <th> GST </th>
                                <th> P.OUTS </th>
                            </tr>
                        </thead>
                        <tbody>
                            {responseData.map((row,index)=>{
                                return (
                                    <tr key={index}>
                                        {Object.keys.map((td,key)=>{
                                            return <td key={key}>{row[td]}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        </Col>
    </div>
    )
}

export default ClientDisbursement