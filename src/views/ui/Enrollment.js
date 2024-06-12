import axios from "axios";
import React, { useState } from "react";
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
  CardHeader,
  Table, 
} from "reactstrap";

const Enrollment = () => {  
	const dispatch = useDispatch()
	const [fields, setFields] = useState({term:'',branch:''})
	// eslint-disable-next-line
	const [responseData, setResponse] = useState([])

	const handleChange = e => {
		setFields({...fields,[e.target.name]:e.target.value})
	}
	const handleSearch = ev => {
		ev.preventDefault()
		dispatch({type:'LOADING'})

		axios.post('/search-enrolled',fields )
		.then(({data})=>{ 
			console.log(data);
			setResponse(data) 
		}).catch(({response})=>{
			console.log(response);
		}).finally(()=>{
			dispatch({type:'STOP_LOADING'})
		})
	}
	return (
	<div> 
		<Card>
		<CardHeader className="d-flex" style={{justifyContent:'space-between'}}>
			<b> TARGET ENTRY </b>  
			<Link to={`/add-enrollment`} className="btn btn-sm btn-rounded btn-primary">
				<i className="fa fa-plus"/> New 
			</Link> 
		</CardHeader>
		<CardBody>
			<Form onSubmit={handleSearch}>
				<FormGroup>
				<Row>
					<Col xs="3">
					<Label for="branch">Branch Name</Label>
					<Input
						id="branch" 
						name="branch"
						type="select"
						onChange={handleChange}
					>
						<option value={'all'}>All</option>
						<option value={'0'} >2</option> 
					</Input>
					</Col >
					<Col xs="3" >
					<Label for="search"> Search Targets </Label>
					<div className="d-flex">
						<Input
							id="search"
							name="term"
							placeholder="Search name/phone/KYC"
							type="text"
							onChange={handleChange}
						/>
						<button type="submit" className="btn btn-primary">
							<i className="fa fa-search" />
						</button>
					</div>
					</Col>
				</Row>
				</FormGroup> 
			</Form>
			<div className="mt-3" id="resultArea">  
				<Table
					bordered 
					hover
					style={{fontSize:'small'}}
				>
				<thead className='bg-blue'>
					<tr>
						<th> SNo </th>
						<th> ClientID </th>
						<th> Name </th>
						<th> Phone </th>
						<th> Aadhaar </th>
						<th> State </th>
					</tr>
				</thead>
				<tbody> 
				{ responseData.length ? 
					responseData.map((row,key)=>{
						return (<tr key={key} > 
							<td> {key+1} </td>
							{ Object.keys(row).map((td,index) => {
								return <td key={index}> {row[td]??''} </td>
							})
						}
						</tr>)
					})
				: null}
				</tbody>
				</Table> 
			</div>
		</CardBody>
		</Card>
		{/* --------------------------------------------------------------------------------*/}
		{/* Card-2*/}
		{/* --------------------------------------------------------------------------------*/}
		 
	</div>
	);
};

export default Enrollment;
