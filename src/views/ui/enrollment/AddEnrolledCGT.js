import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validate } from '../../../helpers/utils';
import toast from 'react-hot-toast';
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { Form } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import ReactSelect from 'react-select';

function AddEnrolledCGT() {

    let initial = {
        branch_id:'',
        aadhaar : '',
        applicant:'',
        fatherName:'',
        gender:'',
        date_of_birth:'',
        phone:'',
        district:'',
        state:'',
        PIN:'',
        village:'',
    };

    const dispatch = useDispatch();
    const [errors, setErrors]      = useState(initial);
    const [branches , setBranches] = useState([]);
    const [fields, setFields]      = useState(initial);
    const [bankInfo, setBankInfo]  = useState(false);

    const change = (e) => {
        setFields({...fields, [e.target.name]:e.target.value})
    }

    useEffect(()=> {

        axios.get('get-branches')
        .then(({data})=>{
            let options = []
            data.forEach( item => options.push({value:item.id, label:item.name}))
            setBranches(options)
        })

    },[]);

    return (
        <>
        <div> 
          <Card className="col-7">
            <CardHeader className="d-flex">
              <b> BASIC INFORMATION </b>
            </CardHeader>
            <CardBody className="bg-gray-300">
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for="branch">Branch Name</Label>
                            <ReactSelect
                                id="branch" 
                                name="branch"
                                type="select"
                                className="w-100"
                                onChange={e=>setFields({...fields, branch_id:e.value})}
                                options={branches}
                           />
                        </div>
                    </Col > 
                </Row>
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4" size={'sm'} for="aadhaar"> Aadhaar(UID) </Label>
                            <Input
                                id="aadhaar" 
                                name="aadhaar"
                                type="text"
                                onChange={change}
                                placeholder={errors.centerName??"Enter aadhaar no."}
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
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="applicant"> Applicant Name </Label>
                            <Input
                                id='applicant'
                                name="applicant"
                                type="text"
                            /> 
                             
                        </div>
                    </Col > 
                </Row>
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="fatherName"> Father Name </Label>
                            <Input
                                id='fatherName'
                                name="fatherName"
                                type="text"
                                onChange={change}
                                placeholder={errors.fatherName}
                            />   
                        </div>
                    </Col > 
                </Row>
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="gender"> Gender </Label>
                            <Input
                                id='gender'
                                name="gender"
                                type="text"
                                onChange={change}
                                placeholder={errors.gender}
                            />
                        </div>
                    </Col > 
                </Row>
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="date_of_birth"> Date Of Birth </Label>
                            <DatePicker 
                                id='date_of_birth'
                                name="date_of_birth"
                                type="date"
                                className='form-control'
                                maxDate={(new Date())}
                                placeholderText='Date of Birth'
                                onChange={change}
                                placeholder={errors.date_of_birth}
                            />
                        </div>
                    </Col > 
                </Row>
                   
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="phone"> Phone </Label>
                            <Input
                                id='phone'
                                name="phone"
                                type="text"
                                onChange={change}
                                placeholder={errors.phone}
                            />
                        </div>
                    </Col > 
                </Row>
                   
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="village"> Village/City Name </Label>
                            <Input
                                id='village'
                                name="village"
                                type="text"
                                onChange={change}
                                placeholder={errors.village}
                            />
                        </div>
                    </Col > 
                </Row>
                   
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="district"> District </Label>
                            <Input
                                id='district'
                                name="district"
                                type="text"
                                onChange={change}
                                placeholder={errors.district}
                            />
                        </div>
                    </Col > 
                </Row>
                   
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="phone"> Phone </Label>
                            <Input
                                id='phone'
                                name="phone"
                                type="text"
                                onChange={change}
                                placeholder={errors.phone}
                            />
                        </div>
                    </Col > 
                </Row>
                   
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="PIN"> Postal PIN </Label>
                            <Input
                                id='PIN'
                                name="PIN"
                                type="text"
                                onChange={change}
                                placeholder={errors.PIN}
                            />
                        </div>
                    </Col > 
                </Row>
                   
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="state"> State Name </Label>
                            <Input
                                id='state'
                                name="state"
                                type="text"
                                onChange={change}
                                placeholder={errors.state}
                            />
                        </div>
                    </Col > 
                </Row>
                
                <Row className="mt-2">
                    <Col md="12">
                        <div className="d-flex">
                            <Label className="col-4"  size={'sm'} for="bank_info"> Bank Info </Label>
                            <Input
                                id='bank_info'
                                name="bank_info"
                                type="checkbox"
                                onChange={change}
                                placeholder={errors.bank_info}
                            />
                        </div>
                    </Col > 
                </Row>
            </CardBody>
            <CardFooter>
              <Row className="d-flex" style={{justifyContent:'space-between'}}>
                <button  className="col-3 btn btn-success" style={{marginLeft:'5px'}}> Save & Process </button>
                <button className="col-2 btn bg-gray-300" style={{marginRight:'5px'}}> Home </button>
              </Row>
            </CardFooter>
          </Card>
           
        </div>
        </>
    );
}

export default AddEnrolledCGT