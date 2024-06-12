import axios from "axios";
import React, { useState } from "react"; 
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
  CardHeader, 
} from "reactstrap";

const AddEnrollment = () => { 
	const dispatch = useDispatch()
	const [fields, setFields] = useState({
		name:'',
		branch:'',
		aadhaar:'',
		phone:'',
		district:'',
		state:'',
		dateOfBirth:'',
		voterID:'',
		sonOf:'',
		gender:'',
		group:'',
		pan:'',
		pin:'',
		areaName:'',
		bank:'',
		advDetails:'',
		nomineeDetails:'',
		creditReport:''
	})
	const onChange = e => {
		const {name, value} = e.target;
		setFields({...fields, [name]:value})
	}

	const handleSubmit = ev => {
		ev.preventDefault()
		dispatch({type:'LOADING'})
		axios.post('/add-enrollment', fields)
		.then(({data})=>{ 
			toast.success(data.message)
			for(let field in fields)
			{ 
				setFields({...fields, [field]:''})
			}
		}).catch(({response})=> {
			console.log(response.data);	
			toast.error('Something went wrong')
		}).finally(()=> {  
			// dispatch({type:'STOP_LOADING'}) 
		})
	}
	return (
	<div> 
		<Card className="col-7">
		<Form onSubmit={handleSubmit}>
		<CardHeader tag="h6" className="border-bottom mb-0 d-flex" >
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
							onChange={onChange}
						>
							<option value='benipur'> Benipur </option>
							<option value='basti'> Basti </option> 
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
							onChange={onChange}
							placeholder="Enter Aadhaar no"
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="voterID" > Voter ID </Label>
						<Input
							id="voterID" 
							name="voterID"
							type="text"
							onChange={onChange}
							placeholder="Enter other KYC No"
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
							name="name"
							type="text"
							onChange={onChange}
							placeholder="Enter applicant name"
						/> 
							
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="sonOf">S/O</Label>
						<Input
							id="sonOf" 
							name="sonOf"
							type="text"
							onChange={onChange}
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
						>
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
							name="pan"
							type="text"
							onChange={onChange}
							placeholder="Enter PAN No"
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
							name="pin"
							type="text"
							onChange={onChange}
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
							name="areaName"
							type="text"
							onChange={onChange}
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
						>
							<option value={'darbhanga'}> Darbhanga </option>
							<option value={'gonda'}> Gonda </option> 
							<option value={'ballia'}> Ballia </option> 
							<option value={'basti'}> Basti </option> 
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
						>
							<option value={'bihar'}> Bihar </option>
							<option value={'uttar pradesh'}> UP </option> 
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
							name="dateOfBirth"
							type="date"
							onChange={onChange}
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
							placeholder="Enter group no"
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="bank&others"> 
							Bank & Others (YES/NO) 
						</Label>
						<Input
							id="bank&others" 
							name="bank"
							type="checkbox" 
							onChange={onChange}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="advDetails"> Advance Details </Label>
						<Input
							id="advDetails" 
							name="advDetails"
							type="checkbox" 
							onChange={onChange}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="nomineeDetails"> Nominee Details </Label>
						<Input
							id="nomineeDetails" 
							name="nomineeDetails"
							type="checkbox" 
							onChange={onChange}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4"  size={'sm'} for="creditReport"> Credit Report & Upload </Label>
						<Input
							id="creditReport" 
							name="creditReport"
							type="checkbox" 
							onChange={onChange}
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
