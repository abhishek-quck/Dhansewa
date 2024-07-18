import { sanitizeFilterModel } from '@mui/x-data-grid/hooks/features/filter/gridFilterUtils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'

function UpdateCIS() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.auth)
    const {id} = useParams()
    const [nomineeDetails, updateNominee] = useState({
        verification_type:null,
        verification:null,
    })
    const [fields, updateFields] = useState({

    })
    const [districts, setDistricts] = useState([])
    const [states, setStates] = useState([])
    const [errors, setErrors] = useState(fields)
    const onChange = e => {
        if(e?.target)
        {
            e.target.style.border = ''
            updateFields({...fields, [e.target.name]:e.target.value})
        }
    }
    const [branches, setBranches] = useState([])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch({type:'LOADING'})
        let formData= new FormData;
        axios.post('/update-enrolled', formData)
        .then(({data})=>{
            console.log(data)
            toast.success(data.message)
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    useEffect(()=>{
        axios.get('get-branches')
        .then(({data})=>setBranches(data))

        return ()=> null
    },[loading])

    return (
    <>
        <div className='d-flex'>
            <div className='col-6'>
                <Card>
                    <CardHeader>
                        <b> Personal Information : {id}</b>
                    </CardHeader>
                    <CardBody >
                        <FormGroup>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="branch">
                                    Enroll Date
                                </Label>
                                <Input
                                    id="branch" 
                                    name="branch"
                                    type="select"
                                    defaultValue={fields.branch}
                                    onChange={onChange}
                                    style={{border:errors.branch ?'1px solid red':''}}
                                >
                                    <option > Select Branch </option>
                                    {branches.map((option,i)=>{
                                        return <option key={i} value={option.id}>{option.name}</option>
                                    })}
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="aadhaar"> Aadhaar </Label>
                                <Input
                                    id="aadhaar" 
                                    name="aadhaar"
                                    type="text" 
                                    onChange={onChange}
                                    value={fields.aadhaar}
                                    placeholder="Enter Aadhaar no"
                                    style={{border:errors.branch ?'1px solid red':''}}
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <div className="col-4">
                                    <select 
                                        type="select" 
                                        className={'xs'} 
                                        style={{width:90,border:errors.verification_type ?'1px solid red':''}}
                                        name="verification_type"
                                        onChange={onChange}
                                        defaultValue={fields.verification_type}
                                    >
                                    <option value={'voterID'}> Voter ID </option>
                                    <option value={'passBook'}> Passbook </option>
                                    <option value={'aadhaar'}> Aadhaar </option>
                                    </select>
                                </div>
                                <Input
                                    id="voterID" 
                                    name="verification"
                                    type="text"
                                    onChange={onChange}
                                    placeholder="Enter other KYC No"
                                    defaultValue={fields.verification}
                                    style={{border:errors.verification ?'1px solid red':''}}
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="name">Member Name</Label>
                                <Input
                                    id="name" 
                                    name="member_name"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.applicant_name}
                                    placeholder="Enter member name"
                                    style={{border:errors.applicant_name ?'1px solid red':''}}
                                /> 
                                    
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="father_name">Father Name</Label>
                                <Input
                                    id="father_name" 
                                    name="father_name"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.applicant_name}
                                    placeholder="Enter father name"
                                    style={{border:errors.applicant_name ?'1px solid red':''}}
                                /> 
                                    
                            </div>
                            </Col > 
                        </Row>
 
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="DOB"> Date of Birth </Label>
                                <Input
                                    id="DOB" 
                                    name="date_of_birth"
                                    type="date"
                                    onChange={onChange}
                                    defaultValue={fields.date_of_birth}
                                    placeholder="Enter Date of Birth"
                                    style={{border:errors.date_of_birth ?'1px solid red':''}}
                                />
                            </div>
                            </Col > 
                        </Row>
                        
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="phone"> Mobile </Label>
                                <Input
                                    id="phone" 
                                    name="phone"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.phone}
                                    placeholder={"Enter phone"}
                                    style={{border:errors.phone ?'1px solid red':''}}
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="alt_phone"> ALT Mobile </Label>
                                <Input
                                    id="alt_phone" 
                                    name="alt_phone"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.alt_phone}
                                    placeholder={"Enter alternate phone number"}
                                    style={{border:errors.alt_phone ?'1px solid red':''}}
                                />
                            </div>
                            </Col > 
                        </Row> 
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="gender"> Gender </Label>
                                <Input
                                    id="gender" 
                                    name="gender"
                                    type="select"
                                    onChange={onChange}
                                    defaultValue={fields.gender}
                                    style={{border:errors.gender ?'1px solid red':''}}
                                >
                                    <option > Choose </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option> 
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="marital_status"> Marital Status </Label>
                                <Input
                                    id="marital_status" 
                                    name="marital_status"
                                    type="select"
                                    onChange={onChange}
                                    defaultValue={fields.marital_status}
                                    style={{border:errors.marital_status ?'1px solid red':''}}
                                >
                                    <option > Choose </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option> 
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="village"> 
                                    Village/City Name 
                                </Label>
                                <Input
                                    id="village" 
                                    name="village"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.village}
                                    placeholder="Enter village/city name" 
                                    style={{border:errors.village ?'1px solid red':''}}
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="district"> District </Label>
                                <Input
                                    id="district" 
                                    name="district"
                                    type="select"
                                    onChange={onChange}
                                    defaultValue={fields.district}
                                    style={{border:errors.district ?'1px solid red':''}}
                                >
                                    <option > Select District </option>
                                    {districts.map((opt,i)=>{
                                        return <option key={i} value={opt.value} >{opt.label}</option>
                                    })}
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="state"> State </Label>
                                <Input
                                    id="state" 
                                    name="state"
                                    type="select"
                                    onChange={onChange}
                                    defaultValue={fields.state}
                                    style={{border:errors.state ?'1px solid red':''}}
                                >
                                    <option> Select State </option>
                                    {states.map((opt,i)=>{
                                    return <option key={i} value={opt.value}> {opt.label} </option> 
                                    })}
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="exampleEmail"> Group </Label>
                                <Input
                                    id="group" 
                                    name="group"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.group}
                                    style={{border:errors.group?'1px solid red':''}}
                                    placeholder="Enter group no"
                                />
                            </div>
                            </Col > 
                        </Row> 
                    </FormGroup> 
                </CardBody>
                </Card>            
            </div>
            <div className='col-6'>
                <Card>
                    <CardHeader>
                        <b> Nominee Information </b>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="aadhaar"> Aadhaar </Label>
                                    <Input
                                        id="aadhaar" 
                                        name="aadhaar"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.phone}
                                        placeholder={"Enter Aadhaar"}
                                        style={{border:errors.phone ?'1px solid red':''}}
                                    />
                                </div>
                                </Col > 
                            </Row> 
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <div className="col-4">
                                        <select 
                                            type="select" 
                                            className={'xs'} 
                                            style={{width:90,border:errors.verification_type ?'1px solid red':''}}
                                            name="verification_type"
                                            onChange={onChange}
                                            defaultValue={nomineeDetails.verification_type}
                                        >
                                        <option value={'voterID'}> Voter ID </option>
                                        <option value={'passBook'}> Passbook </option>
                                        <option value={'aadhaar'}> Aadhaar </option>
                                        </select>
                                    </div>
                                    <Input
                                        id="voterID" 
                                        name="verification"
                                        type="text"
                                        onChange={onChange}
                                        placeholder="Enter other KYC No"
                                        defaultValue={nomineeDetails.verification}
                                        style={{border:errors.verification ?'1px solid red':''}}
                                    />
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="phone"> Nominee Name </Label>
                                    <Input
                                        id="nominee_name" 
                                        name="nominee_name"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={nomineeDetails.nominee_name}
                                        placeholder={"Enter nominee name"}
                                        style={{border:errors.nominee_name ?'1px solid red':''}}
                                    />
                                </div>
                                </Col > 
                            </Row> 
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="nominee_dob"> Nominee DOB </Label>
                                    <Input
                                        id="nominee_dob" 
                                        name="nominee_dob"
                                        type="date"
                                        onChange={onChange}
                                        defaultValue={nomineeDetails.nominee_dob}
                                        style={{border:errors.nominee_dob ?'1px solid red':''}}
                                    />
                                </div>
                                </Col > 
                            </Row> 
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="nominee_rel"> 
                                        Nominee Relationship 
                                    </Label>
                                    <Input
                                        id="nominee_rel" 
                                        name="nominee_rel"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={nomineeDetails.nominee_rel}
                                        style={{border:errors.nominee_rel ?'1px solid red':''}}
                                    />
                                </div>
                                </Col> 
                            </Row> 
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="rel_proof"> 
                                        Relationship Proof 
                                    </Label>
                                    <Input
                                        id="rel_proof" 
                                        name="rel_proof"
                                        type="select"
                                        onChange={onChange}
                                        style={{border:errors.rel_proof ?'1px solid red':''}}
                                    >
                                        <option></option>
                                    </Input>
                                </div>
                                </Col> 
                            </Row> 
                        </FormGroup>
                        <CardHeader>

                        </CardHeader>
                    </CardBody>
                </Card>        
            </div>
        </div>
    </>
    )
}

export default UpdateCIS