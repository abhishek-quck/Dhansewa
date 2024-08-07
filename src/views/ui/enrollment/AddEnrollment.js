import axios from "axios";
import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { 
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input, 
  Row,
  Col,
  CardText,
  Button
} from "reactstrap";
import { validate } from "../../../helpers/utils";

const AddEnrollment = () => { 
	const dispatch = useDispatch()
	const [submitted, hit]=useState(false)
	const [branches, setBranches] = useState([])
	const [states, fillStates] = useState([])
	const [districts, fillDistricts] = useState([])
	const submitStyle = {position:'fixed',maxWidth:'360px',left:'40%',top:'90%',zIndex:'121'}
	const [advance, addAdvanceDetail] = useState(false)
	const [nominee, addNomineeDetails] = useState(false)
	const [bankDetails, addBankDetails] = useState(false)
	const [fields, setFields] = useState({
		applicant_name:'',
		branch_id:'',
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
		father_name:'',
		marital_status:'',
		education:'',
		religion:'',
		category:'',
		door_num:'',
		crossing:'',
		street:'',
		landmark:'',
		co_applicant_rel:'',
		co_applicant:'',
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
	})

	const [bank, setBank]= useState({
        ifsc:'',
        bank:'',
        bank_branch:'',
        account_num:'',
        is_debit_card:'',
        is_account_active:'',  
	}) 

	const [Nominee, setNominee] = useState({
		nominee:'',
        nominee_dob:'',
        nominee_relation:'',
        nominee_aadhaar:'',
        nominee_kyc_type:'',
        nominee_kyc:'',
	})

	const [advanceDetail, setAdvance] = useState({
		type:'',
        email:'',
        guarantor:'',
	})

	const onChange = e => {
		e.target.style.border=''
		const {name, value} = e.target;
		setFields({...fields, [name]:value})
	}
	const [errors, setErrors] = useState(fields)
	const [KYCtypes, setKYCtypes] = useState([])
	const handleSubmit = ev => {
		ev.preventDefault()
		let finalObj = fields;
		if(bankDetails)
		{
			finalObj = {...finalObj, ...bank }
		}
		if(nominee)
		{
			finalObj = {...finalObj, ...Nominee} 
		}
		if(advance)
		{
			finalObj = {...finalObj, ...advanceDetail} 
		}
		console.log(Object.keys(finalObj).length,finalObj); 
		let {result, shouldGo} = validate(finalObj,['advDetails','nomineeDetails','creditReport'])
		if(shouldGo===false)
		{
			setErrors(result)
			toast.error('Fill the required fields')
			return 
		}
		dispatch({type:'LOADING'})
 
		axios.post('/add-enrollment', fields )
		.then(({data})=>{ 
			toast.success(data.message)
			// reset()
			// hit(!submitted)
		}).catch(({response})=> {
			console.log(response.data);	
			toast.error('Something went wrong')
		}).finally(()=> dispatch({type:'STOP_LOADING'}) )
	}
	const reset = () => {
		let state = fields
		Object.keys(state).forEach(key=>state[key]='')
		setFields(state)
	}

	const handleFile = e => {
		console.log(e.target.files[0])
	}
	useEffect(()=>{
	
		axios.get('get-options/all')
		.then(({data})=>{
			if(data.state) fillStates(data.state)
			if(data.district) fillDistricts(data.district)
			if(data.documents) setKYCtypes(data.documents)
		})

		axios.get('get-branches')
		.then(({data})=>setBranches(data)).catch(err=>{
			console.log(err)
			toast.error('Something went wrong!')
		})

	},[])

	return (
	<>
	<div className="d-flex"> 
		<Form className="w-100 d-flex" onSubmit={handleSubmit}>
		<Card className="col-6">
		<CardBody >
			<CardText  className='mt-2' style={{backgroundColor:'beige',padding:5}}>
				<b className='text-primary mx-1'> BASIC INFORMATION </b>          
			</CardText>
				<FormGroup>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="branch">
							Branch Name
						</Label>
						<Input
							id="branch" 
							name="branch_id"
							type="select"
							defaultValue={fields.branch_id}
							onChange={onChange}
							style={{border:errors.branch_id ?'1px solid red':''}}
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
							min="12"
							max="12"
							cast="num"
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
							<option value={'pan'}> PAN </option>
							</select>
						</div>
						<Input
							id="voterID" 
							name="verification"
							type="text"
							min="12"
							max="12"
							onChange={onChange}
							placeholder="Enter KYC No"
							defaultValue={fields.verification}
							style={{border:errors.verification ?'1px solid red':''}}
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
							style={{border:errors.applicant_name ?'1px solid red':''}}
						/> 
							
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<div className="col-4">
							<select type="select" name="relation" onChange={onChange} className={'xs'} style={{width:90}}
							value={fields.relation}
							>
							<option value={'S/O'}> S/O </option>
							<option value={'H/O'}> H/O </option>
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
							style={{border:errors.relative_name ?'1px solid red':''}}
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
						<Label className="col-4"  size={'sm'} for="pan">PAN</Label>
						<Input
							id="pan" 
							name="PAN"
							type="text"
							onChange={onChange}
							placeholder="Enter PAN No"
							defaultValue={fields.PAN}
							style={{border:errors.PAN ?'1px solid red':''}}
						/>
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
						<Label className="col-4" size={'sm'} for="district">Districts </Label>
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
						<Label className="col-4"  size={'sm'} for="exampleEmail">Village/City Name</Label>
						<Input
							id="exampleSelectMulti" 
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
						<Label className="col-4"  size={'sm'} for="pin">Postal PIN</Label>
						<Input
							id="pin" 
							name="postal_pin"
							type="text"
							onChange={onChange}
							defaultValue={fields.postal_pin}
							placeholder="Enter PIN"
							style={{border:errors.postal_pin ?'1px solid red':''}}
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
							req="true"
							placeholder="Enter Date of Birth"
							style={{border:errors.date_of_birth ?'1px solid red':''}}
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
							placeholder={"Enter phone"}
							min="10"
							max="10"
							cast="num"
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
						<Label className="col-4"  size={'sm'} for="father_name"> Father Name</Label>
						<Input
							id="father_name" 
							name="father_name"
							type="text"
							onChange={onChange}
							defaultValue={fields.father_name}
							placeholder="Enter father name"
							style={{border:errors.father_name ?'1px solid red':''}}
						/> 
							
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
							style={{border:errors.marital_status ?'1px solid red':''}}
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
							style={{border:errors.education ?'1px solid red':''}}
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
							style={{border:errors.religion ?'1px solid red':''}}
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
							style={{border:errors.category ?'1px solid red':''}}
						>
							<option> </option>
							<option value={'Gen'}> General </option>
							<option value={'OBC'}> OBC(other backward category) </option>
							<option value={'SC/ST'}> SC/ST </option>
						</Input>
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
							onChange={()=>addAdvanceDetail(!advance)}
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
							onChange={()=>addNomineeDetails(!nominee)}
							defaultChecked={fields.nomineeDetails}
						/>
					</div>
					</Col > 
				</Row>
				<Row className="mt-2">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="nomineeDetails"> Bank Details </Label>
						<Input
							id="nomineeDetails" 
							name="nomineeDetails"
							type="checkbox" 
							onChange={()=>addBankDetails(!bankDetails)} 
						/>
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
							style={{border:errors.door_num?'1px solid red':''}}
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
							style={{border:errors.crossing?'1px solid red':''}}
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
							style={{border:errors.street?'1px solid red':''}}
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
							style={{border:errors.landmark?'1px solid red':''}}
							placeholder="Enter landmark"
						/>
					</div>
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
											style={{width:90,border:errors.co_applicant_rel ?'1px solid red':''}}
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
										style={{border:errors.co_applicant ?'1px solid red':''}}
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
									req="true"
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
			<div className="mt-3" id="resultArea">  
			</div>
		</CardBody>
		</Card>
		<div className='col-6'>
			<Card>
				<CardBody >
					<FormGroup>
					{
						bankDetails && 
						(<>
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
									onChange={e=>setBank({...bank, ifsc:e.target.value })}
									defaultValue={bank.ifsc}
									style={{border:errors.ifsc?'1px solid red':''}}
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
									onChange={e=>setBank({...bank, bank:e.target.value })}
									defaultValue={bank.bank}
									style={{border:errors.bank?'1px solid red':''}}
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
									onChange={e=>setBank({...bank, bank_branch:e.target.value })}
									defaultValue={bank.bank_branch}
									style={{border:errors.bank_branch?'1px solid red':''}}
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
									onChange={e=>setBank({...bank, account_num:e.target.value })}
									defaultValue={bank.account_num}
									style={{border:errors.account_num?'1px solid red':''}}
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
									onChange={e=>setBank({...bank, is_debit_card:e.target.value })}
									defaultValue={bank.is_debit_card}
									style={{border:errors.is_debit_card?'1px solid red':''}}
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
									onChange={e=>setBank({...bank, is_account_active:e.target.value })}
									value={bank.is_account_active}
									style={{border:errors.is_account_active?'1px solid red':''}}
								>
									<option>   </option>
									<option value={'yes'}> Yes </option>
									<option value={'no'}> No </option>
								</Input>
							</div>
							</Col > 
						</Row> 
						</>)
					}
					
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
									style={{width:150,border:errors.kyc_type ?'1px solid red':''}}
									name="kyc_type"
									onChange={onChange}
									value={fields.document_id}
								>
								<option></option>
								{KYCtypes.map( opt => {
									return <option key={opt.id} value={opt.id}>{opt.name}</option>
								})} 
								</Input>
							</div>
							<Input
								type="file"
								name='doc'
								onChange={handleFile}
								style={{border:errors.verification ?'1px solid red':''}}
							/>
						</div> 
						</Col > 
					</Row>
					{nominee && 
					(<>
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
									onChange={e=>setNominee({...Nominee, nominee_aadhaar: e.target.value})}
									defaultValue={Nominee.nominee_aadhaar}
									placeholder={"Enter nominee nominee_aadhaar"}
									style={{border:errors.phone ?'1px solid red':''}}
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
										style={{width:150,border:errors.nominee_kyc_type ?'1px solid red':''}}
										name="nominee_kyc_type"
										onChange={e=>setNominee({...Nominee, nominee_kyc_type: e.target.value})}
										value={Nominee.nominee_kyc_type}
									>
									<option value={'voterID'}> Voter ID </option>
									<option value={'aadhaar'}> Aadhaar </option>
									</Input>
								</div>
								<Input 
									name="nominee_kyc"
									type="text"
									onChange={e=>setNominee({...Nominee, nominee_kyc: e.target.value})}
									placeholder="Enter other KYC No"
									defaultValue={Nominee.nominee_kyc}
									style={{border:errors.nominee_kyc ?'1px solid red':''}}
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
									onChange={e=>setNominee({...Nominee, nominee: e.target.value})}
									defaultValue={Nominee.nominee}
									placeholder={"Enter nominee name"}
									style={{border:errors.nominee ?'1px solid red':''}}
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
									onChange={e=>setNominee({...Nominee, nominee_dob: e.target.value})}
									defaultValue={Nominee.nominee_dob}
									style={{border:errors.nominee_dob ?'1px solid red':''}}
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
									onChange={e=>setNominee({...Nominee, nominee_relation: e.target.value})}
									defaultValue={Nominee.nominee_relation}
									style={{border:errors.nominee_relation ?'1px solid red':''}}
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
									onChange={e=>setNominee({...Nominee, rel_proof: e.target.value})}
									style={{border:errors.rel_proof ?'1px solid red':''}}
								>
									<option></option>
								</Input>
							</div>
							</Col> 
						</Row>  
					</>)
					} 

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
						{advance && 
						(<>
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
										onChange={e=>setAdvance({...advanceDetail, type:e.target.value })}
										value={advanceDetail.type}
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
										onChange={e=>setAdvance({...advanceDetail, email:e.target.value })}
										defaultValue={advanceDetail.email}
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
										onChange={e=>setAdvance({...advanceDetail, guarantor:e.target.value })}
										defaultValue={advanceDetail.guarantor}
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
						</>)
						}
				</FormGroup> 
			</CardBody>
			</Card>            
		</div>
		<Button color="success" className="w-100" style={submitStyle}> Add Enrollment </Button>
		</Form>
		 
	</div>
	</>
	);
};

export default AddEnrollment;
