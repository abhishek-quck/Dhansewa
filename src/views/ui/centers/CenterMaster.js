import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
// eslint-disable-next-line
import $ from 'jquery';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { useSearchCentersQuery } from '../../../features/centerSlice';

function CenterMaster() {
	const dispatch = useDispatch();
	const search = useSelector(state=>state.auth.search)
	const getInfo = (e) => {  
		dispatch({type:'SEARCH', payload:e.target.value})
	}
 
	const debouncedSearchQuery = useDebounce(search, 500);
	const { data, isLoading } = useSearchCentersQuery(debouncedSearchQuery,{skip:search===''})

	const [fields, setFields] = useState({
		branch:'',
		center:'',
		localAddress:'',
		district:'',
		state:'',
		staff:'',
		meetingDays:'',
		meetingTime:'',
		centerID:'',
		formationDate:'',
		cityName:'',
		block:'',
		centerLeader:'',
		centerLeaderPhone:'',
		advisor:''
	});
	// eslint-disable-next-line
	const [centers, populateCenter] = useState([])
	
	const onChange = e => {
		setFields({...fields, [e.target.name]:e.target.value})
	}
	// submit add-form
	const handleSubmit = e => 
	{
		dispatch({type:'LOADING'})
		e.preventDefault();
		axios.post('/add-center',fields)
		.then(({data})=> {
			console.log(data)
			if(data.status) toast.success(data.message);
		})
		.catch(({response})=> {
			console.log(response)
			toast.error(response.message)
		})
		.finally(()=> dispatch({type:'STOP_LOADING'}))
	}

	useEffect(()=>{
		console.log(data)
	},[search])

	return (
	<>
	<Card>
		<CardHeader className='bg-secondary text-white'> 
			<CardTitle>
				<i className='fa-solid fa-arrow-down' /> &nbsp;
				Centers Master
			</CardTitle>
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
							<Table bordered hover style={{fontSize:'small'}}>
								<thead>
									<tr>
										<th> C.ID </th>
										<th> Center Name </th>
										<th> Day Name </th>
										<th> L.c </th>
										<th> Staff ID </th>
										<th> Action </th>
									</tr>
								</thead>
								<tbody>
									{data?.length ? data.map((row,index)=>{
										return (<tr key={index}>
											{Object.keys(row).map((key,td)=>{
												return (<td key={key}>{row[key]}</td>)
											})}
										</tr>)
									}):null}
									<tr></tr>
								</tbody>
							</Table>
						</Row>
					</Col>
					<Col md={6} >
						<Card>
							<CardHeader tag="h6" className="border-bottom d-flex card-custom-header">
								<b className='mt-1 mb-1'>CENTER INFORMATION</b>
							</CardHeader>
							<CardBody className="bg-gray-300">
								<Form onSubmit={handleSubmit}>
								<FormGroup>
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
												<option value={'benipur'}> Benipur </option>
												<option value={'basti'}> Basti </option> 
												<option value={'ajamgadh'}> Ajamgadh </option> 
												<option value={'firozabad'}> Firozabad </option> 
												<option value={'rampur'}> Rampur </option> 
												<option value={'allahabad'}> Allahabad </option> 
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
												placeholder="Enter center name"
											/>
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
											<Label className="col-4"  size={'sm'} for="district"> District Name</Label>
											<Input 
												name="district"
												type="select"
												onChange={onChange} 
											>   
												<option value={'benipur'}> Benipur </option>
												<option value={'basti'}> Basti </option> 
											</Input>
											
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
												<option value={'bihar'}> Bihar </option>
											</Input>   
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
												type="select"
												onChange={onChange}
											>
												<option> --SELECT-- </option>
											</Input>
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
												<option value={'monday'}> Monday </option>
												<option value={'tuesdays'}> Tuesday </option>
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
									<Row className="mt-2">
									<Col md="12">
										<div className="d-flex">
											<Label className="col-4"  size={'sm'} for="centerID"> New Center ID </Label>
											<Input 
												id="centerID"
												name="centerID"
												type="text"
												onChange={onChange}
												placeholder="Enter new Center ID 3 digit" 
											/>
										</div>
									</Col > 
									</Row>
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
									<Col md="12">
										<button type='submit' className='btn btn-success btn-sm btn-rounded'> Create </button>
									</Col > 
									</Row> 
								</FormGroup> 
								</Form>
							
							</CardBody>
						</Card>
					
					</Col>
				</Row>
			</Col>
		</CardBody>
	</Card>
	</>
	)
}

export default CenterMaster