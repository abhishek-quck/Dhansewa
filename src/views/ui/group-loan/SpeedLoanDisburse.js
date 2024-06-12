import React, { useEffect } from "react"; 
import $ from 'jquery'
import { 
  Card,
  CardBody,
  CardTitle,   
  Form,
  FormGroup,
  Label,
  Input, 
  Row,
  Col,
  CardFooter,
  CardHeader, 
} from "reactstrap";

const SpeedLoanDisburse = () => { 
	useEffect(()=>{
		[...document.getElementsByClassName('select2')].forEach(element => {
			$(element).select2({
				placeholder:element.getAttribute('placeholder')
			})
		});
		
	},[])

  return (
    <div> 
      <Card className="col-12">
        <CardHeader tag="h6" className="border-bottom d-flex" >
          <b className="mt-2 mb-2"> SPEED LOAN DISBURSEMENT SYSTEM </b>
        </CardHeader>
        <CardBody className="bg-gray-300">
            <Form>
              <FormGroup>
                <Row className="">
                 <Col md="3">
                        <Label size={'sm'} for="branches"> Branches </Label>
                        <Input
                            id="branches" 
                            name="branch"
                            type="select"
							className="select2"
                        >
                            <option> --SELECT BRANCH-- </option>
                            <option> Enrollment </option>  
                        </Input>
                 </Col > 
                 <Col md="3">
                        <Label size={'sm'} for="center"> Centers </Label>
                        <Input
                            id="center" 
                            name="center"
                            type="select"
							placeholder="Select center"
							className="select2"
                        >
							<option></option>
                            <option> --SELECT CENTER-- </option>
                            <option> Patupur </option>
                            <option> Basti </option> 
                            <option> Ajamgadh </option> 
                            <option> Firozabad </option> 
                            <option> Rampur </option> 
                            <option> Allahabad </option> 
                        </Input>
                 </Col > 
                 <Col md="5">
                    <Label size={'sm'} for="branchID"> Client ID </Label>
                    <div className="d-flex">
                        <Input
                            id="branchID" 
                            name="branch"
                            type="select"
                            className="col-1 select2" 
							placeholder="Client ID"
                        > 
						<option></option> 
						<option> --SELECT CLIENT-- </option>
                        </Input>
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
              <div className="d-flex"> 
                <div className="col-md-7">
                    <Card>
                        <CardHeader>
                            <CardTitle> New Loan Disbursement For </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className=" container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Loan Date
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="date" 
                                        placeholder="Enter disburse date"
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Loan Products
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Loan Amount(View Chart)
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Loan Fee
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="text" 
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Funding By
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Policy
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Inc. Fee
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="input" 
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        GST
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Utilization
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                    First Installment Date
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="date" 
                                        placeholder="Enter disburse date"
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        No. of EMI collected till
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Payment Mode
                                    </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                    >  
                                    </Input>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div> 
                <div className="col-md-4 mx-1">
                    <Card className="mx-1">
                        <CardHeader>
                            <CardTitle> New Loan Disbursement For </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className="container">
                                <Label size={'sm'} >
                                    Schedule Recurring 
                                </Label>
                                <Input
                                    id="exampleSelectMulti" 
                                    name="branch"
                                    type="text" 
                                    placeholder="Enter Recurring amount"
                                /> 
                            </Row>
                            <Row className="mt-2 container">
                                <Label  size={'sm'} >
                                    Bank Name
                                </Label>
                                <Input
                                    id="exampleSelectMulti" 
                                    name="branch"
                                    type="select" 
                                > 
                                 <option> None </option>
                                </Input>
                            </Row>
                            <Row className="mt-2 container">
                                <Label  size={'sm'} >
                                    Cross Sale Products
                                </Label>
                                <Input
                                    id="exampleSelectMulti" 
                                    name="branch"
                                    type="select" 
                                >  
                                </Input>
                            </Row> 
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <button className="btn btn-primary mt-2 w-100">
                                    Save & Disburse
                                </button>
                            </Row>
                        </CardFooter>
                    </Card>
                </div>
              </div>
            </Form>
        </CardBody>
        <CardFooter>
          <div className="mt-3" id="resultArea">  
          </div> 
        </CardFooter>
      </Card> 
      
    </div>
  );
};

export default SpeedLoanDisburse;
