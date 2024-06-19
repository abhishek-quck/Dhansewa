import React, { useEffect, useState } from "react"; 
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
  Button, 
} from "reactstrap";
import ReactSelect from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const SpeedLoanDisburse = () => { 
    const dispatch = useDispatch()
    const clientOptions=[];
    const [fields, setFields] = useState({
        
    })

    const centerOptions = [
        {value:'patupur',  label:'Patupur'  },
        {value:'Ajamgarh', label:'Ajamgadh' },
        {value:'Firozabad',label:'Firozabad'},
        {value:'Rampur',   label:'Rampur'   },
        {value:'Allahabad',label:'Allahabad'},
        {value:'Basti',    label:'Basti'    }
    ]

    const handleSubmit = e => {
        dispatch({type:'LOADING'})
        e.preventDefault()
        axios.post('/speed-loan-disburse',fields)
        .then(({data})=>{
            console.log(data) 
            toast.success('Records added successfully!')
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
        .finally((res)=>{
            dispatch({type:'STOP_LOADING'})
            console.log(res)
        })
    }

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
        <CardHeader tag="h6" className=" d-flex" >
          <b className="mt-2 mb-2"> SPEED LOAN DISBURSEMENT SYSTEM </b>
        </CardHeader>
        <CardBody className="bg-gray-300">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Row className="">
                 <Col md="3">
                        <Label size={'sm'} for="branches"> Branches </Label>
                        <Input
                            id="branches" 
                            name="branch"
                            type="select"
                        >
                            <option> --SELECT BRANCH-- </option>
                            <option> Enrollment </option>  
                        </Input>
                 </Col > 
                 <Col md="3">
                        <Label size={'sm'} for="center"> Centers </Label>
                        <ReactSelect
                            options={centerOptions}
                        /> 
                 </Col > 
                 <Col md="5">
                    <Label size={'sm'} for="branchID"> Client ID </Label>
                    <div className="d-flex">
                        <ReactSelect
                            options={clientOptions}
                            className="w-100"
                        /> 
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
              <div className="d-flex"> 
                <div className="col-md-8">
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
                                    <Label size={'sm'} >
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
                            <CardTitle> Other Info </CardTitle>
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
                            <Row className="mt-2 container mb-3">
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
                            <Button type="submit" color="success" className="mt-2 w-100">
                                Save & Disburse
                            </Button>
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
