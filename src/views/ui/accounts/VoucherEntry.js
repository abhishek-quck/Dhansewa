import React from 'react'
import { Card, CardBody,  CardHeader , Col, Form, Input, Label, Row } from 'reactstrap'

function VoucherEntry() {
  return (
    <>
        <Col className='d-flex'>
            <Col md={6}>
                <Form> 
                <Card>
                    <CardHeader>
                       <div className='d-flex' style={{justifyContent:'space-between'}}>
                        <b> Multi Voucher Entry Gateway </b>
                        <button type='button' className='btn btn-primary'>
                            <i className='fa-regular fa-eye' />&nbsp;
                            Ledger 
                        </button>
                       </div>
                    </CardHeader>
                    <CardBody>
                       
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Date </Label>
                                    <Input 
                                        name="date"
                                        type="date" 
                                    /> 
                                    
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Branch </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="Branch"
                                        type="select" 
                                    >
                                        <option> 01- Benipur </option>
                                        <option> 02- Ballipur </option>
                                    </Input> 
                                    
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Type </Label>
                                    <Input 
                                        name="type"
                                        type="select"     
                                    >
                                        <option> Debit </option>
                                        <option> Credit </option>
                                    </Input> 
                                    
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Account's </Label>
                                    <Input 
                                        name="account"
                                        type="select" 
                                    >
                                        <option> --SELECT-- </option>
                                        <option> Credit </option>
                                    </Input>   
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Narration </Label>
                                    <Input 
                                        name="narration"
                                        type="textarea"
                                        placeholder="Enter Narration"
                                    />  
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Amount </Label>
                                    <Input 
                                        name="amount"
                                        type="text"
                                        placeholder="Enter amount "
                                    />  
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <button className='btn btn-success w-100'> 
                                + Add Transaction </button>
                            </Col > 
                        </Row> 
                     
                    </CardBody>
                 
                </Card>
                </Form>
            </Col> 
        </Col>
        <Col className='mt-4'>
            <div className='resultArea' />
        </Col>
    </>
  )
}

export default VoucherEntry