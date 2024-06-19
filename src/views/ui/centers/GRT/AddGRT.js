import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const AddGRT = () => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const [doc, setDocument] = useState(null)
    let {id}= useParams()
    let thisUser = useSelector(state=>state.auth.GRTs[id]??{}) 

    const [fields,setFields] = useState({
        applicant_name:thisUser['applicant_name'] ??'',
		branchName:thisUser['branch'] ??'',
		aadhaar:thisUser['aadhaar'] ??'',
		PAN:thisUser['PAN'] ??'',
		phone:thisUser['phone'] ??'',
		date_of_birth:thisUser['date_of_birth'] ??'',
		verification_type:thisUser['verification_type'] ??'',
		verification:thisUser['verification'] ??'',
		village:thisUser['village'] ??'',
		district:thisUser['district'] ??'',
		state:thisUser['state'] ??'',
		relation:thisUser['relation'] ??'',
		relative_name:thisUser['relative_name'] ??'',
		gender:thisUser['gender'] ??'',
		group:thisUser['group'] ??'',
		postal_pin:thisUser['postal_pin'] ??'',
		advance_details:thisUser['advance_details'] ??'',
		nominee_details:thisUser['nominee_details'] ??'',
		credit_report:thisUser['credit_report'] ??'',
    })

    const onChange = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        let formData = new FormData()
		formData.append('id', id );
        for(let entry in fields)
        {
            formData.append(entry, fields[entry])
        }
        formData.append('document', doc)
        axios.post('/update-client-details', formData, {
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data})=>{
            console.log(data)
            if(typeof data === 'object' && Object.keys(data).length)
            {
                dispatch({type:'UPDATE_GRT',payload:data})
                setTimeout(()=>{
                    toast.success('Record updated successfully!')
                    setTimeout(()=>navigateTo('/client-grt'),3000)
                })
            }
        }).catch(({response})=>{
			toast.error( response.data.message )
			console.log( response );
		})
    }

    useEffect(()=>{
        if(Object.keys(thisUser).length)
        {
            thisUser = thisUser[id]
        }else{
            axios.get(`get-client-details/${id}`)
            .then(({data})=>{
				if(typeof data==='object' && Object.keys(data).length)
				{
					let object = {}
                    object[data.id]=data
                    setFields(data)
                    dispatch({type:'PUT_GRTs',payload:object})
                }
            })    
        }
    },[fields])

    return (
        <div> 
		<Card className="col-7">
		<Form onSubmit={handleSubmit}>
		<CardHeader tag="h6" className="mb-0 d-flex" >
			<b className="mb-2 mt-2"> BASIC INFORMATION </b>
		</CardHeader>
		<CardBody className="bg-gray-300">
			<FormGroup>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="branch">
						Branch Name
					</Label>
					<Input
						id="branch" 
						name="branchName"
						type="select" 
						onChange={onChange}
						defaultValue={fields.branchName}
					>
						<option value='benipur'> Benipur </option>
						<option value='Basti' > Basti </option> 
						<option value='azamgarh'> Azamgarh </option> 
						<option value='firozabad'> Firozabad </option> 
						<option value='rampur'> Rampur </option> 
						<option value='allahabad'> Allahabad </option> 
					</Input>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4"  size={'sm'} for="aadhaar">Aadhar (UID)</Label>
					<Input
						id="aadhaar" 
						name="aadhaar"
						type="text" 
						value={fields.aadhaar}
						onChange={onChange}
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
							type='select'
							className={''} 
							name='verification_type'
							onChange={onChange}
							defaultValue={fields.verification_type}
							style={{width:90}}
						>
							<option value={'voterID'}> Voter ID </option>
							<option value={'passBook'}> Passbook </option>
							<option value={'aadhaar'}> Aadhaar </option>
						</Input>
					</div>
					<Input
						id="verification" 
						name="verification"
						type="text"
						value={fields.verification}
						onChange={onChange}
						placeholder="Enter other KYC No"
					/>
				</div>
				</Col> 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4"  size={'sm'} for="name">Applicant Name</Label>
					<Input
						id="name" 
						name="applicant_name"
						value={fields.applicant_name}
						type="text"
						onChange={onChange}
						placeholder="Enter applicant name"
					/> 
				</div>
				</Col> 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<div className="col-4">
						<Input 
							type='select'
							name="relation" 
							className={''} 
							defaultValue={fields.relation}
							style={{width:90}}
						>
							<option value={'S/O'}> S/O </option>
							<option value={'W/O'}> W/O </option>
						</Input>
					</div>
					<Input
						id="relation" 
						name="relative_name"
						value={fields.relative_name}
						type="text"
						onChange={onChange}
						placeholder="Enter name"
					/>   
				</div>
				</Col> 
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
					>
						<option value="male">Male</option>
						<option value="female">Female</option> 
					</Input>
				</div>
				</Col> 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="pan">PAN</Label>
					<Input
						id="pan" 
						name="PAN"
						type="text"
						value={fields.PAN}
						onChange={onChange}
						placeholder="Enter PAN No"
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="pin">Postal PIN</Label>
					<Input
						id="pin" 
						name="postal_pin"
						type="text"
						value={fields.postal_pin}
						onChange={onChange}
						placeholder="Enter PIN"
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="village">Village/City Name</Label>
					<Input
						id="village" 
						name="village"
						type="text"
						value={fields.village}
						onChange={onChange}
						placeholder="Enter village/city name" 
					/>
				</div>
				</Col> 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="district">Districts </Label>
					<Input
						id="district" 
						name="district"
						type="select"
						onChange={onChange}
						defaultValue={fields.district}
					>
						<option value={'darbhanga'}> Darbhanga </option>
						<option value={'gonda'}> Gonda </option> 
						<option value={'ballia'}> Ballia </option> 
						<option value={'Basti'}> Basti </option> 
					</Input>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="exampleEmail">State Name </Label>
					<Input
						id="state" 
						name="state"
						type="select"
						onChange={onChange}
						defaultValue={fields.state}
					>
						<option value={'bihar'}> Bihar </option>
						<option value={'Uttar-Pradesh'}> UP </option> 
					</Input>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="DOB"> Date of Birth (Today) </Label>
					<Input
						id="DOB" 
						name="date_of_birth"
						type="date"
						onChange={onChange}
						value={fields.date_of_birth}
						placeholder="Enter Date of Birth"
					/>
				</div>
				</Col> 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="phone"> Phone </Label>
					<Input
						id="phone" 
						name="phone"
						type="text"
						value={fields.phone}
						onChange={onChange}
						placeholder="Enter phone"
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="exampleEmail"> Group </Label>
					<Input
						id="group" 
						name="group"
						type="text"
						onChange={onChange}
						value={fields.group}
						placeholder="Enter group no"
					/>
				</div>
				</Col> 
			</Row>
			
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="advance_details"> Advance Details </Label>
					<Input
						id="advance_details" 
						name="advance_details"
						type="checkbox" 
						defaultChecked={fields.advance_details}
						onChange={onChange}
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="nominee_details"> Nominee Details </Label>
					<Input
						id="nominee_details" 
						name="nominee_details"
						type="checkbox" 
						defaultChecked={fields.nominee_details}
						onChange={onChange}
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="credit_report"> Credit Report & Upload </Label>
					<Input
						id="credit_report" 
						name="credit_report"
						type="checkbox" 
						defaultChecked={fields.credit_report}
						onChange={onChange}
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="doc"> Upload Document </Label>
					<Input
						id="doc" 
						name="document"
						type="file" 
						onChange={e=>setDocument(e.target.files[0])}
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
				<button className="col-3 btn btn-success" style={{marginLeft:'5px'}}> Save & Process </button>
				<Link to={`/dashboard`} className="col-2 btn bg-gray-300" style={{marginRight:'5px'}}> Home </Link>
			</Row>
		</CardFooter>
		</Form>
		</Card>
		{/* --------------------------------------------------------------------------------*/}
		{/* Card-2*/}  
	</div>
    )
}

export default AddGRT