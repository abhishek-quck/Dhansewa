import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, Input, Label, Row, Spinner, Table } from 'reactstrap'

function AccountMaster() {
  const [loading,setLoading] = useState(false)
  const handleAccount = e => { 
    e.preventDefault();
    setLoading(!loading)
  }
  return (
    <>
        <Col className='d-flex'>
            <Col md={6}>
                <Form onSubmit={handleAccount}> 
                <Card>
                    <CardHeader>
                        <b> ACCOUNTS MASTER </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <Label> Account Name </Label>
                                <Input type='text' placeholder='Enter Head Name' />
                            </Col>
                            <Col md={6}>
                                <Label> Mobile </Label>
                                <Input type='text' name='mobile' placeholder='+91 0000000000' />
                            </Col>
                        </Row>
                        <Row className='mt-3' >
                            <Col md={6}>
                                <Label> Head Name </Label>
                                <Input type='select' name='headNature'>
                                    <option> Branch & Division </option>
                                    <option></option>
                                </Input>
                            </Col>
                            <Col md={6}>
                                <Label> Full Address </Label>
                                <Input type='text' name='address' placeholder='Address' />
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
                                <Input type='select' >
                                    <option> Dr. </option>
                                    <option> Mr. </option>
                                    <option> Mrs. </option>
                                </Input>
                            </Col>
                            <Col md={4}>
                                <Label> Opening Balance </Label>
                                <Input type='text' name='mobile' placeholder='Opening Balance' />
                            </Col>
                            <Col md={4}>
                                <Label> O.B. Date </Label>
                                <Input type='date' name='obDate' />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col md={4}>
                                <Label> Details </Label>
                                <Input type='select' placeholder='Details' >
                                    <option> Dr. </option>
                                    <option> Mr. </option>
                                    <option> Mrs. </option>
                                </Input>
                            </Col>
                            <Col md={4}>
                                <Label> Key Type </Label>
                                <Input type='select' name='keyType' >
                                    <option >Other</option>
                                    <option ></option>
                                </Input>
                            </Col>
                             
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