import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { preview } from '../../../attachments'
import { validate } from '../../../helpers/utils'

function UpdateCIS() {
    const {id}      = useParams()
    const dispatch  = useDispatch()
    const {review_clients}          = useSelector( state => state.auth )
    const [showHint, setHint]       = useState(Object(review_clients).hasOwnProperty(id))
    const [doc, setDoc]             = useState({b64:null,blob:null})
    const [relProof, setRelProof]   = useState(null)
    const [districts, setDistricts] = useState([])
    const [KYCtypes, setKYCtypes]   = useState([])
    const [states, setStates]       = useState([])
    const [hitsubmit, setSubmit]       = useState([])
    const submitStyle = { 
        position:'fixed',
        maxWidth:'360px',
        left:'40%',
        top:'90%',
        zIndex:121
    }
    const [fields, updateFields] = useState({
        client_id:'',
        aadhaar:'',
        applicant_name:'',
        father_name:'',
        village:'',
        PAN:'',
        postal_pin:'',
        date_of_birth:'',
        district:'',
        state:'',
        kyc_type:'',
        ifsc:'',
        bank:'',
        bank_branch:'',
        account_num:'',
        is_debit_card:'',
        is_account_active:'',
        enroll_id:id,
        door_num:'',
        crossing:'',
        street:'',
        landmark:'',
        alt_phone:'',
        marital_status:'',
        education:'',
        religion:'',
        category:'',     
        nominee:'',
        nominee_dob:'',
        nominee_relation:'',
        nominee_aadhaar:'',
        nominee_kyc_type:'',
        nominee_kyc:'',
        co_applicant:'',
        co_applicant_rel:'',
        co_applicant_dob:'',
        co_applicant_industry_type:'',
        co_applicant_job_type:'',
        co_applicant_income_freq:'',
        member_in_family:'',
        mature_in_family:'',
        minor_in_family:'',
        earning_person_in_family:'',
        depend_person_in_family:'',
        house_land:'',
        house_type:'',
        durable_access:'',
        is_lpg:'',
        total_land:'',
        allied_activities:'',
        farmer_category:'',
        total_monthly_income:'',
        monthly_expenses:'',
        type:'',
        email:'',
        guarantor:'',
    })

    const onChange = e => {
        if(e?.target) {
            updateFields({...fields, [e.target.name]:e.target.value})
        }
    }

    const handleFile = e => {
        let file = e.target.files[0]
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = function() {
            setDoc({...doc, b64:reader.result,blob:file})
        }; 
    }

    const previewUploaded = () => {
        preview([doc.b64])
    }

    const handleSubmit = e => {
        e.preventDefault()
        delete fields.kyc_document_id
        let unrequired = []
        for (const sfield in fields) {
            if(fields[sfield]==='' || fields[sfield]===null || fields[sfield]==='null') unrequired.push(sfield)
        }
        let {result,shouldGo} = validate(fields,[...unrequired, 'other_info','center_id','branch_id']) // other_info is relationship; center_id is null because GRT of client isn't completed yet
        if( shouldGo===false )
        {
            console.log(result)
            return toast.error('All fields are required!')
        }
        dispatch({ type:'LOADING' })
        let formData= new FormData();
        for (const key in fields) {
            if(!(['latest_document','grt']).includes(key))
            {
                formData.append(key, fields[key]);
            }
        }
        formData.append('kyc_doc', doc.blob);
        if(relProof) formData.append('rel_proof', relProof );
        if(review_clients[(typeof id==='string'? parseInt(id): id)]) {
            formData.append('review', true);
        }
        axios.post('update-additional-enroll-information', formData, {
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        })
        .then(({data})=> {
            let updatedClients = JSON.parse(JSON.stringify(review_clients))
            delete updatedClients[id]
            dispatch({
                type: 'SET_REVIEW_CLIENTS',
                payload: updatedClients
            })
            toast.success(data.message)
            setSubmit(!hitsubmit)
        } )
        .catch(err=> toast.error(err.message) )
        .finally(()=>dispatch({type:'STOP_LOADING'}));

    }

    useEffect(()=>{ 

        dispatch({type:'LOADING'})
        axios.get('get-options/all')
		.then(({ data }) => {
			if(data.state) setStates(data.state)
			if(data.district) setDistricts(data.district)
			if(data.documents) setKYCtypes(data.documents)
                
            axios.post('get-enrollment-details/'+id )
            .then(({ data }) => {
                if(data.other_info)
                {
                    data={...data, ...data.other_info}
                    delete data.other_info
                }
                if(data.grt)
                {
                    data={...data, client_id:data.grt['enroll_id']}
                }
                delete data.grt
                let docID 
                if( data.latest_document?.document_id )
                {
                    setDoc({...doc, b64:data.latest_document?.data})
                    docID = data.latest_document.document_id
                    delete data.kyc_document_id
                }else {
                    docID = ''
                }
                delete data.latest_document
                updateFields({...fields, ...data, document_id:docID, kyc_type:docID }) 

            })
		}).catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
        })
        .finally(()=> dispatch({type:'STOP_LOADING'}) )
		
        return ()=> null
    },[hitsubmit])

    return (
    <>
        {showHint && (
            <div className='text-center hinting'>
                <b className='text-white'>{review_clients[id]}</b>
            </div>
        )}
        <div>
            <Form style={{display:'flex',width:'-webkit-fill-available'}} onSubmit={handleSubmit}>
            <div className='col-6'>
                <Card>
                    <CardBody >
                        <FormGroup>
                        <CardText className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                            <b className='text-primary mx-1'> Personal Information : Client ID - {id} </b>
                        </CardText>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="branch">
                                    Enroll Date
                                </Label>
                                <Input
                                    id="branch" 
                                    name="branch"
                                    type="text"
                                    defaultValue={fields.created_at}
                                    disabled
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="aadhaar"> Aadhaar </Label>
                                <Input
                                    id="aadhaar" 
                                    name="aadhaar"
                                    type="text" 
                                    onChange={onChange}
                                    value={fields.aadhaar}
                                    placeholder="Enter Aadhaar no"
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <div className="col-4">
                                    <Input 
                                        type="select" 
                                        className={'xs'} 
                                        style={{width:120}}
                                        name="verification_type"
                                        onChange={onChange}
                                        value={fields.verification_type}
                                    >
                                    <option></option>
                                    {KYCtypes.map( opt => <option key={opt.id} value={opt.id}>{opt.name}</option> )} 
                                    </Input>
                                </div>
                                <Input
                                    id="voterID" 
                                    name="verification"
                                    type="text"
                                    onChange={onChange}
                                    placeholder="Enter other KYC No"
                                    defaultValue={fields.verification}
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="member_name">Member Name</Label>
                                <Input
                                    id="member_name" 
                                    name="applicant_name"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.applicant_name}
                                    placeholder="Enter member name"
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
                                    defaultValue={fields.father_name}
                                    placeholder="Enter father name"
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
                                    value={fields.gender}
                                >
                                    <option >   </option>
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
                                    value={fields.marital_status}
                                >
                                    <option > </option>
                                    <option value="male"> Single </option>
                                    <option value="female"> Married </option> 
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="education"> 
                                    Education
                                </Label>
                                <Input
                                    id="education" 
                                    name="education"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.education}
                                />
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="religion"> Religion </Label>
                                <Input
                                    id="religion" 
                                    name="religion"
                                    type="select"
                                    onChange={onChange}
                                    value={fields.religion}
                                >
                                    <option > </option>
                                    <option value={'Hindu'}> Hindu </option>
                                    <option value={'Muslim'}> Muslim </option>
                                    <option value={'Christ'}> Christ </option>
                                </Input>
                            </div>
                            </Col > 
                        </Row>
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="category">
                                    Caste Category 
                                </Label>
                                <Input
                                    id="category" 
                                    name="category"
                                    type="select"
                                    onChange={onChange}
                                    value={fields.category}
                                >
                                    <option> </option>
                                    <option value={'Gen'}>  General </option>
                                    <option value={'OBC'}> OBC(other backward category) </option>
                                    <option value={'SC/ST'}>    SC/ST   </option>
                                </Input>
                            </div>
                            </Col > 
                        </Row>

                        <CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                            <b className='text-primary mx-1'> FULL ADDRESS </b>          
                        </CardText>

                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="door_num"> Door No </Label>
                                <Input
                                    id="door_num" 
                                    name="door_num"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.door_num}
                                    placeholder="Enter door no"
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="crossing"> Crossing </Label>
                                <Input
                                    id="crossing" 
                                    name="crossing"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.crossing}
                                    placeholder="Enter crossing"
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4"  size={'sm'} for="street"> Street </Label>
                                <Input
                                    id="street" 
                                    name="street"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.street}
                                    placeholder="Enter street"
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="landmark"> Landmark </Label>
                                <Input
                                    id="landmark" 
                                    name="landmark"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.landmark}
                                    placeholder="Enter landmark"
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="postal_pin"> Postal PIN </Label>
                                <Input
                                    id="postal_pin" 
                                    name="postal_pin"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.postal_pin}
                                    placeholder="Enter postal pin"
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="village"> Village Name </Label>
                                <Input
                                    id="village" 
                                    name="village"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.village}
                                    placeholder="Enter village"
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="state"> State Name </Label>
                                <Input
                                    id="state" 
                                    name="state"
                                    type="select"
                                    onChange={onChange}
                                    value={fields.state}
                                >
                                    <option> </option>
                                    {states.map( opt => <option key={opt.value} value={opt.value}> {opt.label} </option> )}
                                </Input>
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
                                    value={fields.district}
                                >
                                    <option>  </option>
                                    {districts.map( opt => <option key={opt.value} value={opt.value}>{ opt.label }</option> )}
                                </Input>
                            </div>
                            </Col > 
                        </Row> 

                        <CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                            <b className='text-primary mx-1'> BANK INFORMATION </b>          
                        </CardText>

                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="ifsc"> IFSC </Label>
                                <Input
                                    id="ifsc" 
                                    name="ifsc"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.ifsc}
                                />
                            </div>
                            </Col > 
                        </Row> 

                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="bank"> 
                                    Bank Name 
                                </Label>
                                <Input
                                    id="bank" 
                                    name="bank"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.bank}
                                />
                            </div>
                            </Col > 
                        </Row> 
                         
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="bank_branch"> 
                                    Bank Branch 
                                </Label>
                                <Input
                                    id="bank_branch" 
                                    name="bank_branch"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.bank_branch}
                                />
                            </div>
                            </Col > 
                        </Row> 
                        
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="account_num"> 
                                    Account No 
                                </Label>
                                <Input
                                    id="account_num" 
                                    name="account_num"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.account_num}
                                />
                            </div>
                            </Col > 
                        </Row> 

                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="is_debit_card"> 
                                    Is Debit Card 
                                </Label>
                                <Input
                                    id="is_debit_card" 
                                    name="is_debit_card"
                                    type="text"
                                    onChange={onChange}
                                    defaultValue={fields.is_debit_card}
                                />
                            </div>
                            </Col > 
                        </Row> 
                       
                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <Label className="col-4" size={'sm'} for="is_account_active"> 
                                    Is Account Active 
                                </Label>
                                <Input
                                    id="is_account_active" 
                                    name="is_account_active"
                                    type="select"
                                    onChange={onChange}
                                    value={fields.is_account_active}
                                >
                                    <option>   </option>
                                    <option value={'yes'}> Yes </option>
                                    <option value={'no'}> No </option>
                                </Input>
                            </div>
                            </Col > 
                        </Row> 
                        <CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                            <b className='text-primary mx-1'> KYC & OTHER DOCUMENTS </b>          
                        </CardText>

                        <Row className="mt-2">
                            <Col md="12">
                            <div className="d-flex">
                                <div className="col-4">
                                    <Input 
                                        type='select'
                                        className={'xs'} 
                                        style={{width:150}}
                                        name="kyc_type"
                                        onChange={onChange}
                                        value={fields.kyc_type}
                                    >
                                    <option></option>
                                    {KYCtypes.map( opt => <option key={opt.id} value={opt.id}>{opt.name}</option> )} 
                                    </Input>
                                </div>
                                <Input
                                    type="file"
                                    name='doc'
                                    onChange={handleFile}
                                />
                            </div>
                            {doc.b64 && 
                                <button 
                                    type='button'
                                    className='btn btn-light mt-2'
                                    onClick={previewUploaded}
                                    style={{marginLeft:'80%',border:'1px dashed'}}
                                >
                                    Preview <i className='fa fa-eye'/>
                                </button>
                            }
                            </Col > 
                        </Row>
                        <CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                                <b className='text-primary mx-1'> 
                                    CO-APPLICANT EMPLOYMENT 
                                </b>          
                            </CardText>
                  
                            <Row>
                                <Col md="12">
                                    <div className="d-flex">
                                        <div className="col-4">
                                            <Input 
                                                type="select" 
                                                className={'xs'} 
                                                style={{width:90}}
                                                name="co_applicant_rel"
                                                onChange={onChange}
                                                value={fields.co_applicant_rel}
                                            >
                                            <option value={'W/O'}> W/O </option>
                                            <option value={'H/O'}> H/O </option>
                                            <option value={'S/O'}> S/O </option>
                                            </Input>
                                        </div>
                                        <Input
                                            id="voterID" 
                                            name="co_applicant"
                                            type="text"
                                            onChange={onChange}
                                            placeholder="Enter name"
                                            defaultValue={fields.co_applicant}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="co_applicant_dob">
                                        DOB
                                    </Label>
                                    <Input 
                                        id="co_applicant_dob" 
                                        name="co_applicant_dob"
                                        type="date"
                                        onChange={onChange}
                                        defaultValue={fields.co_applicant_dob}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex"> 
                                    <Label className="col-4" size={'sm'} for="co_applicant_industry_type">
                                        Industry Type
                                    </Label>
                                    <Input 
                                        id="co_applicant_industry_type" 
                                        name="co_applicant_industry_type"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.co_applicant_industry_type}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="co_applicant_job_type">
                                        Job Type
                                    </Label>
                                    <Input 
                                        id="co_applicant_job_type" 
                                        name="co_applicant_job_type"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.co_applicant_job_type}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="co_applicant_income_freq">
                                        Income Freq.
                                    </Label>
                                    <Input 
                                        id="co_applicant_income_freq" 
                                        name="co_applicant_income_freq"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.co_applicant_income_freq}
                                    />
                                    </div>
                                </Col>
                            </Row>
                    </FormGroup> 
                </CardBody>
                <Button color='success' className='w-100' style={submitStyle} size='md'>
                    Save Changes
                </Button>
                </Card>            
            </div>
            <div className='col-6'>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <CardText className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                                <b className='text-primary mx-1'> Nominee Information </b>
                            </CardText>
                            <Row >
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="nominee_aadhaar"> Aadhaar </Label>
                                    <Input
                                        id="nominee_aadhaar" 
                                        name="nominee_aadhaar"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.nominee_aadhaar}
                                        placeholder={"Enter nominee nominee_aadhaar"}
                                    />
                                </div>
                                </Col > 
                            </Row> 
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <div className="col-4">
                                        <Input 
                                            type="select" 
                                            className={'xs'} 
                                            style={{width:150}}
                                            name="nominee_kyc_type"
                                            onChange={onChange}
                                            value={fields.nominee_kyc_type}
                                        >
                                        <option></option>
                                        {KYCtypes.map( opt => <option key={opt.id} value={opt.id}>{opt.name}</option> )} 
                                        </Input>
                                    </div>
                                    <Input 
                                        name="nominee_kyc"
                                        type="text"
                                        onChange={onChange}
                                        min={fields.nominee_kyc_type==2?12:10}
                                        max={fields.nominee_kyc_type==2?12:10}
                                        placeholder="Enter other KYC No"
                                        defaultValue={fields.nominee_kyc}
                                    />
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="nominee"> Nominee Name </Label>
                                    <Input
                                        id="nominee" 
                                        name="nominee"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.nominee}
                                        placeholder={"Enter nominee name"}
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
                                        defaultValue={fields.nominee_dob}
                                    />
                                </div>
                                </Col > 
                            </Row> 
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="nominee_relation"> 
                                        Nominee Relationship 
                                    </Label>
                                    <Input
                                        id="nominee_relation" 
                                        name="nominee_relation"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.nominee_relation}
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
                                        type="file"
                                        onChange={e=>setRelProof(e.target.files[0])}
                                    >
                                        <option></option>
                                    </Input>
                                </div>
                                </Col> 
                            </Row> 
                         
                            

                            <CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                                <b className='text-primary mx-1'> FINANCIAL LIABILITIES </b>          
                            </CardText>

                            <Row >
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="member_in_family">
                                        Member In Family
                                    </Label>
                                    <Input 
                                        id="member_in_family" 
                                        name="member_in_family"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.member_in_family}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="mature_in_family">
                                        Mature in Family
                                    </Label>
                                    <Input 
                                        id="mature_in_family" 
                                        name="mature_in_family"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.mature_in_family}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="minor_in_family">
                                        Minor in Family
                                    </Label>
                                    <Input 
                                        id="minor_in_family" 
                                        name="minor_in_family"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.minor_in_family}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="earning_person_in_family">
                                        Earning Person
                                    </Label>
                                    <Input 
                                        id="earning_person_in_family" 
                                        name="earning_person_in_family"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.earning_person_in_family}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="depend_person_in_family">
                                        Depend Person
                                    </Label>
                                    <Input 
                                        id="depend_person_in_family" 
                                        name="depend_person_in_family"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.depend_person_in_family}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="house_land">
                                        House Land
                                    </Label>
                                    <Input 
                                        id="house_land" 
                                        name="house_land"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.house_land}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="house_type">
                                        House Type
                                    </Label>
                                    <Input 
                                        id="house_type" 
                                        name="house_type"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.house_type}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="durable_access">
                                        Durable Access
                                    </Label>
                                    <Input 
                                        id="durable_access" 
                                        name="durable_access"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.durable_access}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="is_lpg">
                                        IsLPG
                                    </Label>
                                    <Input 
                                        id="is_lpg" 
                                        name="is_lpg"
                                        type="select"
                                        onChange={onChange}
                                        value={fields.is_lpg}
                                    >
                                        <option value={'yes'}>Yes</option>
                                        <option value={'no'}>No</option>
                                    </Input>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="total_land">
                                        Total Land
                                    </Label>
                                    <Input 
                                        id="total_land" 
                                        name="total_land"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.total_land}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="allied_activities">
                                        Allied Activities
                                    </Label>
                                    <Input 
                                        id="allied_activities" 
                                        name="allied_activities"
                                        type="select"
                                        onChange={onChange}
                                        value={fields.allied_activities}
                                    >
                                        <option>  </option>
                                        <option value={'yes'}> Yes </option>
                                        <option value={'no'}> No </option>
                                    </Input>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="farmer_category">
                                        Farmer Category
                                    </Label>
                                    <Input 
                                        id="farmer_category" 
                                        name="farmer_category"
                                        type="select"
                                        onChange={onChange}
                                        value={fields.farmer_category}
                                    >
                                        <option>  </option>
                                        <option value={'yes'}> Yes </option>
                                        <option value={'no'}> No </option>
                                    </Input>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="total_monthly_income">
                                        T.Monthly Income
                                    </Label>
                                    <Input 
                                        id="total_monthly_income" 
                                        name="total_monthly_income"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.total_monthly_income}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="monthly_expenses">
                                        Monthly Expenses
                                    </Label>
                                    <Input 
                                        id="monthly_expenses" 
                                        name="monthly_expenses"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.monthly_expenses}
                                    />
                                    </div>
                                </Col>
                            </Row>
                            
                            <CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
                                <b className='text-primary mx-1'> ADVANCE INFORMATION </b>          
                            </CardText>

                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="type">
                                        Type
                                    </Label>
                                    <Input 
                                        id="type" 
                                        name="type"
                                        type="select"
                                        onChange={onChange}
                                        value={fields.type}
                                    >
                                        <option>  </option>
                                        <option value={'group'}> Group </option>
                                    </Input>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="email">
                                        Email
                                    </Label>
                                    <Input 
                                        id="email" 
                                        name="email"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.email}
                                    />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="guarantor">
                                        Guarantor
                                    </Label>
                                    <Input 
                                        id="guarantor" 
                                        name="guarantor"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.guarantor}
                                    />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col md="12">
                                    <div className="d-flex">
                                    <Label className="col-4" size={'sm'} for="PAN">
                                        PAN
                                    </Label>
                                    <Input 
                                        id="PAN" 
                                        name="PAN"
                                        type="text"
                                        onChange={onChange}
                                        defaultValue={fields.PAN}
                                    />
                                    </div>
                                </Col>
                            </Row>


                        </FormGroup>
                    </CardBody>
                </Card>
            </div>
            </Form>
        </div>
    </>
    )
}

export default UpdateCIS