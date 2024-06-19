import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

function Visit() {
    return (
        <div> 
          <Card className="col-7">
            <CardHeader className="d-flex">
              <b> VISIT REPORTING </b>
            </CardHeader>
            <CardBody className="bg-gray-300">
                <Form>
                  <FormGroup>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for="exampleEmail">Branch Name</Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="selectMulti"
                                type="select"
                            >
                                <option> Benipur </option>
                                <option> Basti </option> 
                                <option> Ajamgadh </option> 
                                <option> Firozabad </option> 
                                <option> Rampur </option> 
                                <option> Allahabad </option> 
                            </Input>
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail">Center Name</Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="selectMulti"
                                type="text"
                                placeholder="Enter other KYC No"
                            />
                        </div>
                     </Col > 
                    </Row>

                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Address </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="address"
                                type="text" 
                                disabled
                            />
                        </div>
                     </Col > 
                    </Row>
                    <CardText className="mt-2">
                        Operation Details
                    </CardText>
                    <hr/>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Field Staff </Label>
                            <Input
                                name="fieldStaff"
                                type="text"
                                disabled
                            /> 
                             
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Meeting Time </Label>
                            <Input
                                name="name"
                                type="text"
                                disabled
                            />   
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Group Leader </Label>
                            <Input
                                name="groupLeader"
                                type="text"
                                disabled
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Group Leader Phone </Label>
                            <Input 
                                name="groupLeaderPhone"
                                type="text"
                                disabled
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Active Loan </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="selectMulti"
                                type="text"
                                placeholder="Enter PIN"
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'}> Loan Details </Label>
                            <Input 
                                name="loanDetails"
                                type="checkbox" 
                            />
                        </div>
                     </Col > 
                    </Row>
                    <CardText className='mt-3'>
                        Visit Report 
                    </CardText>
                    <hr/>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'}> Visiting Officer </Label>
                            <Input 
                                name="visitingOfficer"
                                type="select"
                            >
                                <option> Darbhanga </option>
                                <option> Gonda </option> 
                            </Input>
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'}> Visitin Time </Label>
                            <Input 
                                name="visitingTime"
                                type="time"
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} > Visit Out Time </Label>
                            <Input 
                                name="visitOutTime"
                                type="time" 
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} > Phone </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="selectMulti"
                                type="text"
                                placeholder="Enter phone"
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Group </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="selectMulti"
                                type="text"
                                placeholder="Enter group no"
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Bank & Others (YES/NO) </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="bank"
                                type="checkbox" 
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Advance Details </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="advanceDetails"
                                type="checkbox" 
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Nominee Details </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="nomineeDetails"
                                type="checkbox" 
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="exampleEmail"> Credit Report & Upload </Label>
                            <Input
                                id="exampleSelectMulti" 
                                name="creditReport"
                                type="checkbox" 
                            />
                        </div>
                     </Col > 
                    </Row>
                  </FormGroup> 
                </Form>
              <div className="mt-3" id="resultArea">  
              </div>
            </CardBody>
            <CardFooter>
              <Row className="d-flex" style={{justifyContent:'space-between'}}>
                <button className="col-3 btn btn-success" style={{marginLeft:'5px'}}> Save & Process </button>
                <button className="col-2 btn bg-gray-300" style={{marginRight:'5px'}}> Home </button>
              </Row>
            </CardFooter>
          </Card>
           
        </div>
      );
}

export default Visit