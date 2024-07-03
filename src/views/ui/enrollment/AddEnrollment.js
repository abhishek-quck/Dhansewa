import axios from "axios";
import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input, 
  Row,
  Col,
  CardFooter,
  CardHeader 
} from "reactstrap";

const AddEnrollment = () => { 
	const dispatch = useDispatch()
	const [submitted, hit]=useState(false)
	const [branches, setBranches] = useState([])
	const [states, fillStates] = useState([])
	const [districts, fillDistricts] = useState([])
	const [fields, setFields] = useState({
		applicant_name:'',
		branch:'',
		aadhaar:'',
		phone:'',
		district:'',
		state:'',
		date_of_birth:'',
		verification_type:'',
		verification:'',
		relation:'',
		relative_name:'',
		gender:'',
		group:'',
		PAN:'',
		postal_pin:'',
		village:'',
		advDetails:'',
		nomineeDetails:'',
		creditReport:'',
	})
	const onChange = e => {
		const {name, value} = e.target;
		setFields({...fields, [name]:value})
	}

	
	const handleSubmit = ev => {
		ev.preventDefault()
		dispatch({type:'LOADING'})
 
		axios.post('/add-enrollment', fields )
		.then(({data})=>{ 
			toast.success(data.message)
			reset()
			hit(!submitted)
		}).catch(({response})=> {
			console.log(response.data);	
			toast.error('Something went wrong')
		}).finally(()=> {  
			dispatch({type:'STOP_LOADING'}) 
		})
	}
	const reset = () => {
		let state = fields
		Object.keys(state).forEach(key=>state[key]='')
		setFields(state)
	}
	useEffect(()=>{
	
		axios.get('get-options/all')
		.then(({data})=>{
			if(data.state) fillStates(data.state)
			if(data.district) fillDistricts(data.district)
		})

		axios.get('get-branches')
		.then(({data})=>{
			setBranches(data)
		}).catch(err=>{
			console.log(err)
			toast.error('Something went wrong!')
		})

	},[])

	return (
	<div> 
		<Card className="col-7">
		<Form onSubmit={handleSubmit}>
		<CardHeader tag="h6" className="mb-0 d-flex" >
			<b className="mb-2 mt-2">BASIC INFORMATION</b>
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
							name="branch"
							type="select"
							defaultValue={fields.branch}
							onChange={onChange}
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
						<Label className="col-4"  size={'sm'} for="aadhaar">Aadhar (UID)</Label>
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
							<select 
								type="select" 
								className={'xs'} 
								style={{width:90}}
								name="verification_type"
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
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="name">Applicant Name</Label>
						<Input
							id="name" 
							name="applicant_name"
							type="text"
							onChange={onChange}
							defaultValue={fields.applicant_name}
							placeholder="Enter applicant name"
						/> 
							
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<div className="col-4">
							<select type="select" name="relation" className={'xs'} style={{width:90}}>
							<option value={'S/O'}> S/O </option>
							<option value={'W/O'}> W/O </option>
							</select>
						</div>
						<Input
							id="relation" 
							name="relative_name"
							type="text"
							onChange={onChange}
							defaultValue={fields.relative_name}
							placeholder="Enter name"
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
						<Label className="col-4"  size={'sm'} for="pan">PAN</Label>
						<Input
							id="pan" 
							name="PAN"
							type="text"
							onChange={onChange}
							placeholder="Enter PAN No"
							defaultValue={fields.PAN}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="pin">Postal PIN</Label>
						<Input
							id="pin" 
							name="postal_pin"
							type="text"
							onChange={onChange}
							defaultValue={fields.postal_pin}
							placeholder="Enter PIN"
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="exampleEmail">Village/City Name</Label>
						<Input
							id="exampleSelectMulti" 
							name="village"
							type="text"
							onChange={onChange}
							defaultValue={fields.village}
							placeholder="Enter village/city name" 
						/>
					</div>
					</Col > 
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
						<Label className="col-4"  size={'sm'} for="exampleEmail">State Name </Label>
						<Input
							id="state" 
							name="state"
							type="select"
							onChange={onChange}
							defaultValue={fields.state}
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
						<Label className="col-4"  size={'sm'} for="DOB"> Date of Birth (Today) </Label>
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
						<Label className="col-4" size={'sm'} for="phone"> Phone </Label>
						<Input
							id="phone" 
							name="phone"
							type="text"
							onChange={onChange}
							defaultValue={fields.phone}
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
							id="group" 
							name="group"
							type="text"
							onChange={onChange}
							defaultValue={fields.group}
							placeholder="Enter group no"
						/>
					</div>
					</Col > 
				</Row>
				
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="advDetails"> Advance Details </Label>
						<Input
							id="advDetails" 
							name="advDetails"
							type="checkbox" 
							onChange={onChange}
							defaultChecked={fields.advDetails}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="nomineeDetails"> Nominee Details </Label>
						<Input
							id="nomineeDetails" 
							name="nomineeDetails"
							type="checkbox" 
							onChange={onChange}
							defaultChecked={fields.nomineeDetails}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="creditReport"> Credit Report & Upload </Label>
						<Input
							id="creditReport" 
							name="creditReport"
							type="checkbox" 
							onChange={onChange}
							defaultChecked={fields.creditReport}
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
	);
};

export default AddEnrollment;
