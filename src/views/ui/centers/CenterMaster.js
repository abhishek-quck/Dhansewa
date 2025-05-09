import axios from 'axios';
// eslint-disable-next-line
import $ from 'jquery';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { useGetCentersQuery } from '../../../features/centerSlice';
import { capitalFirst, validate } from '../../../helpers/utils';

function CenterMaster() {
	const dispatch = useDispatch();
	const search = useSelector(state=>state.auth.search);
	const submitStyle = {position:'fixed',maxWidth:'360px',left:'40%',top:'90%',zIndex:'121'}
	const getInfo = (e) => {  
		// dispatch({type:'SEARCH', payload:e.target.value})
		setFields({...fields, branch:e.target.value })
		if(e.target.value ==='') return setCenter([])
		axios.get('get-branch-centers/'+ e.target.value)
		.then(({data})=>setCenter(data))
	}
	// const debouncedSearchQuery = useDebounce(search, 500);
	const { data, isSuccess } = useGetCentersQuery()
	const [fetchcenters, setCenter] = useState([]);
	const [fields, setFields] = useState({
		branch:'',
		center:'',
		localAddress:'',
		district:'',
		state:'',
		staff:'',
		meetingDays:'',
		meetingTime:'',
		formationDate:'',
		cityName:'',
		block:'',
		centerLeader:'',
		centerLeaderPhone:'',
		advisor:''
	});
	// eslint-disable-next-line
	const [states, fillStates] = useState([])
	const [districts, fillDistricts] = useState([])
	const [branches, setBranches] = useState([])
	
	const onChange = e => {
		if(e.target)
		{
			e.target.style.border = '';
			setFields({...fields, [e.target.name]:e.target.value})
		}
	}
	// submit add-form
	const handleSubmit = e => 
	{
		e.preventDefault();
		let {shouldGo,result} = validate(fields,['advisor'])
		if(shouldGo===false)
		{
			for (const el in fields) {
				if (result[el]) {
					$(`input[name=${el}], select[name=${el}], textarea[name=${el}]`).addClass('placeholder-error').attr('placeholder', result[el]).css('border','1px solid red')
				}else{
					$(`input[name=${el}], select[name=${el}], textarea[name=${el}]`).removeClass('placeholder-error').css('border','') // no border on valid inputs
				}
			}
			return toast.error('Fill the required fields')
		}
        if(fetchcenters.some( item =>item.name.toLowerCase()===fields.center.toLowerCase())) return toast.error('Center name already exists!');
		dispatch({ type:'LOADING' })
		axios.post('add-center',fields)
		.then(({data})=> {
			if(data.status) toast.success(data.message);
		})
		.catch(({response})=> {
			console.log(response)
			toast.error(response.message)
		})
		.finally(()=> dispatch({ type:'STOP_LOADING'}))

	}
	const [e,s] = useState(false) // for trying request +1more time in case failed
	useEffect(()=>{
		axios.get('get-options/all')
		.then(({data})=>{
			if(data.state) fillStates(data.state)
			if(data.district) fillDistricts(data.district)
			axios.get('get-branches')
			.then(({data})=>{
				setBranches(data)
			})
		})
		.catch( err => {
			console.log(err.message)
			s(true)
		})
		return () => null
	},[e])

	useEffect(()=> {
		if(isSuccess) setCenter(data)
		return () => null
	},[data, isSuccess])

	return (
	<>
	<Card>
		<CardHeader> 
				<i className='fa-solid fa-arrow-down' /> &nbsp;
				<b> CENTER MASTER </b>
		</CardHeader>
		<CardBody>
			<Col>
				<Row className='d-flex'>
					<Col md={6} >
						<Row className='d-flex'> 
							<Col md={6}>
								<Label>Day</Label>
								<Input
									type='select'
									style={{width:'60%'}}
								>
									<option> All </option>
								</Input>
							</Col>
							<Col md={6}>
								<Label> Search By Name </Label>
								<Input type='text' onChange={getInfo} placeholder='Search Center by name or Center ID last 3 digits' value={search}/>
							</Col>
						</Row>
						<Row>
							<div className="mt-3" id="resultArea"/>   
							<Container className='table-responsive'>
							<Table bordered hover style={{fontSize:'small'}}>
								<thead>
									<tr>
										<th> C.ID </th>
										<th> Center Name </th>
										<th> Day Name </th>
										<th> L.c </th>
										<th> Staff </th>
										<th> Action </th>
									</tr>
								</thead>
								<tbody>
									{ fetchcenters.map( row =>{
										return (<tr key={row.id}>
											<td>{row.id}</td> 
											<td>{row.name}</td> 
											<td>{capitalFirst(row.meeting_days)}</td> 
											<td>{row.lc}</td> 
											<td>{row.staff}</td> 
											<td><i className='fa fa-edit'/></td> 
										</tr>)
									})}
									<tr></tr>
								</tbody>
							</Table>
							</Container>
						</Row>
					</Col>
					<Col md={6} >
						<Form onSubmit={handleSubmit}>
						<FormGroup>
						<Card>
							<CardHeader tag="h6" className="border-bottom d-flex card-custom-header">
								<b className='mt-1 mb-1'>CENTER INFORMATION</b>
							</CardHeader>
							<CardBody >
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="branchName">Branch Name</Label>
											<Input
												id="branchName" 
												name="branch"
												type="select"
												onChange={getInfo}
											>
												<option value={''}> Select Branch </option>
												{branches.map((option,i)=>{
													return <option value={option.id} key={i}>  
														{option.name} 
													</option> 
												})}
 
											</Input>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="center">
												Center Name 
											</Label>
											<Input
												id="center" 
												name="center"
												type="text"
												onChange={onChange}
												cast={'str'}
												min={4}
												placeholder="Enter center name"
											/>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4"  size={'sm'} for="exampleEmail"> State Name </Label>
											<Input 
												name="state"
												type="select"
												onChange={onChange} 
											>
												<option> Select State </option>
												{states.map((option, index)=>{
												 	return (
														<option key={index} value={option.value}>
															{option.label} 
														</option>
													)
												})}
											</Input>   
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4"  size={'sm'} for="district"> District Name</Label>
											<Input 
												name="district"
												type="select"
												onChange={onChange} 
											>   
												<option> Select District </option>
												{districts.map((option, i)=>{
													return (
														<option key={i} value={option.value}>
															{option.label}
														</option>
													)
												})}
												<option value={'basti'}> Basti </option> 
											</Input>
											
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="address">Local Address </Label>
											<Input 
												name="localAddress"
												type="text"
												onChange={onChange}
												placeholder="Enter address"
											/>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="staffName"> Staff Name </Label>
											<Input 
												id='staffName'
												name="staff"
												cast={'str'}
												type="text"
												min={5}
												onChange={onChange}
											/>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="meetingDays"> Meeting Days </Label>
											<Input 
												id="meetingDays"
												name="meetingDays"
												type="select" 
												onChange={onChange}
											>
												<option></option>
												<option value={'monday'}> Monday </option>
												<option value={'tuesday'}> Tuesday </option>
												<option value={'wednesday'}> Wednesday </option>
												<option value={'thursday'}> Thursday </option>
												<option value={'friday'}> Friday </option>
												<option value={'saturday'}> Saturday </option>
											</Input>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4"  size={'sm'} for="meetingTime"> Meeting Time </Label>
											<Input 
												id="meetingTime"
												name="meetingTime"
												type="time" 
												onChange={onChange}
											/>
										</div>
									</Col > 
									</Row>
									</CardBody>
							</Card>
							<Card>
								<CardHeader tag="h6" className="border-bottom d-flex card-custom-header">
									<b className='text-primary mt-1 mb-1'> OTHER INFO </b>
								</CardHeader>
								<CardBody>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4"  size={'sm'} for="formationDate">
												Formation Date 
											</Label>
											<Input 
												id="formationDate"
												name="formationDate"
												type="date"
												onChange={onChange}
											/>
										</div>
									</Col > 
									</Row>
									
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="city"> Village/City </Label>
											<Input 
												id="city"
												name="cityName"
												onChange={onChange}
												min={5}
												type="text"
												placeholder="Enter village/city name"
											/>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4"  size={'sm'} for="block">
												Block Name
											</Label>
											<Input 
												id="block"
												name="block"
												type="text"
												onChange={onChange}
												placeholder="Enter Block Name"
											/>
										</div>
									</Col > 
									</Row> 
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="centerLeader"> 
												Center Leader Name 
											</Label>
											<Input 
												id="centerLeader"
												name="centerLeader"
												type="text" 
												onChange={onChange}
												min={5}
												placeholder='Enter center leader name'
											/>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="centerLeaderPhone"> 
												Center Leader Phone 
											</Label>
											<Input 
												id="centerLeaderPhone"
												name="centerLeaderPhone"
												type="text" 
												cast={'num'}
												min={10}
												max={10}
												onChange={onChange}
												placeholder='Enter center leader phone'
											/>
										</div>
									</Col > 
									</Row>
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4" size={'sm'} for="advisor">
												Advisor / AssociateID 
											</Label>
											<Input 
												id="advisor"
												name="advisor"
												type="text" 
												onChange={onChange}
												placeholder='Enter advisor ID (Optional)'
											/>
										</div>
									</Col > 
									</Row> 
									<Row className="mt-2">
										<Col md="10">
											<Button color='success' className='w-50' style={submitStyle} size='sm'>
												Create
											</Button>
										</Col> 
									</Row> 
							</CardBody>
						</Card>
								</FormGroup> 
								</Form>
							
					
					</Col>
				</Row>
			</Col>
		</CardBody>
	</Card>
	</>
	)
}

export default CenterMaster