import React from 'react'
import {  Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap'

function AccountHead() {
  return (
    <>
        <Col className='d-flex'>
            <Col md={6}>
                <Card>
                    <CardHeader>
                        <b> ACCOUNT HEAD </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <Label> Account Head Name </Label>
                                <Input type='text' placeholder='Enter Head Name' />
                            </Col>
                            <Col md={6}>
                                <Label> A/C Nature </Label>
                                <Input type='select'  name='headNature'>
                                    <option> Assets </option>
                                    <option></option>
                                </Input>
                            </Col>
                        </Row>
                        <Row className='mt-3' >
                            <Col md={6}>
                                <Label> Primary Groups </Label>
                                <Input type='select'  name='headNature'>
                                    <option> Branch & Division </option>
                                    <option></option>
                                </Input>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <button className='btn btn-success w-100'> Submit </button>
                    </CardFooter>
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
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p>Assets</p></td>
                                    <td><p> Current Assets </p></td>
                                    <td><p> Assets </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Liabilities </p></td>
                                    <td><p> Current Liabilities </p></td>
                                    <td><p> Liabilities </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Expenses </p></td>
                                    <td><p> Direct Expenses </p></td>
                                    <td><p> Expenditure </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Income </p></td>
                                    <td><p> Direct Income </p></td>
                                    <td><p> Income </p></td> 
                                </tr>
                                <tr>
                                    <td><Input type='checkbox' /></td>
                                    <td><p> Equity Fund </p></td>
                                    <td><p> Capital Accounts </p></td>
                                    <td><p> Liabilities </p></td> 
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

export default AccountHead