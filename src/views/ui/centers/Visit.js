import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import $ from 'jquery';
import { validate } from "../../../helpers/utils";
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import toast from 'react-hot-toast';

function Visit() {
    const dispatch = useDispatch()
    const [branches, setBranches]= useState([])
    const [fields, setFields] = useState({
        branch:null,
        centerName:null,
        groupLeader:null,
        address:null,
        phone:null,
        visitingTime:null,
        activeLoan:null,
        group:null,
        visitingOfficer:null,
        groupLeaderPhone:null,
    })
    
    const [errors, setErrors]=useState(fields)
    const change = e => {
        if(e.target)
        {
            e.target.style.border = '';
            setFields({...fields, [e.target.name]:e.target.value})
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        let {shouldGo, result} = validate(fields)
        if(shouldGo===false)
        {
            for (const el in result) {
                $(`input[name=${el}]`).addClass('placeholder-error').css('border','1px solid red')
            }
            toast.error('Fill the required fields!')
            setErrors(result)
            return 
        }
        dispatch({type:'LOADING'})
        axios.post('')
        .then(({data})=>{
            console.log(data)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    useEffect(()=>{
        axios.get('get-branches')
		.then(({data})=>{
			setBranches(data)
		})
        return ()=> null
    },[])
    return (
        <div> 
          <Card className="col-7">
          <Form onSubmit={handleSubmit}>
            <CardHeader className="d-flex">
              <b> VISIT REPORTING </b>
            </CardHeader>
            <CardBody className="bg-gray-300">
                  <FormGroup>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for="branch">Branch Name</Label>
                            <Input
                                id="branch" 
                                name="branch"
                                type="select"
                                onChange={change}
                            >
                                <option> Benipur </option>
                                {branches.map((opt,i)=>{
                                    return (<option key={i} value={opt.id}>{opt.name}</option>)
                                })}
                            </Input>
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for="centerName">Center Name</Label>
                            <Input
                                id="centerName" 
                                name="centerName"
                                type="text"
                                onChange={change}
                                placeholder={errors.centerName??"Enter other KYC No"}
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
                                onChange={change}
                                placeholder={errors.address}
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
                            <Label className="col-4"  size={'sm'} for="fieldStaff"> Field Staff </Label>
                            <Input
                                id='fieldStaff'
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
                            <Label className="col-4"  size={'sm'} for="meetingTime"> Meeting Time </Label>
                            <Input
                                id='meetingTime'
                                name="meetingTime"
                                type="text"
                                disabled
                                onChange={change}
                                placeholder={errors.name}
                            />   
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="groupLeader"> Group Leader </Label>
                            <Input
                                id='groupLeader'
                                name="groupLeader"
                                type="text"
                                onChange={change}
                                disabled
                                placeholder={errors.groupLeader}
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="groupLeaderPhone"> Group Leader Phone </Label>
                            <Input 
                                id='groupLeaderPhone'
                                name="groupLeaderPhone"
                                type="text"
                                onChange={change}
                                disabled
                                placeholder={errors.groupLeaderPhone}
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="activeLoan"> Active Loan </Label>
                            <Input
                                id="activeLoan" 
                                name="activeLoan"
                                onChange={change}
                                type="text"
                                placeholder={errors.activeLoan??"Enter PIN"}
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for='loanDetails'> Loan Details </Label>
                            <Input 
                                id='loanDetails'
                                name="loanDetails"
                                onChange={change}
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
                            <Label className="col-4" size={'sm'} for='visitingOfficer'> Visiting Officer </Label>
                            <Input 
                                id='visitingOfficer'
                                name="visitingOfficer"
                                onChange={change}
                                type="select"
                                placeholder={errors.visitingOfficer}
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
                            <Label className="col-4" size={'sm'} for='visitingTime'> Visitin Time </Label>
                            <Input 
                                id='visitingTime'
                                name="visitingTime"
                                onChange={change}
                                type="time"
                                placeholder={errors}
                            />
                        </div>
                     </Col > 
                    </Row>
                    <Row className="mt-2">
                     <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for='visitOutTime'> Visit Out Time </Label>
                            <Input 
                                id='visitOutTime'
                                name="visitOutTime"
                                onChange={change}
                                type="time"
                                placeholder={errors} 
                            />
                        </div>
                     </Col > 
                    </Row>
                  </FormGroup> 
              <div className="mt-3" id="resultArea">  
              </div>
            </CardBody>
            <CardFooter>
              <Row className="d-flex" style={{justifyContent:'space-between'}}>
                <button type='submit' className="col-3 btn btn-success" style={{marginLeft:'5px'}}> Save & Process </button>
                <button className="col-2 btn bg-gray-300" style={{marginRight:'5px'}}> Home </button>
              </Row>
            </CardFooter>
            </Form>
          </Card>
           
        </div>
    );
}

export default Visit