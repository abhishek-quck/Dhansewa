import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Spinner,
} from "reactstrap";
import { useSearchEnrollmentsQuery } from "../../../features/centerSlice";
import toast from "react-hot-toast";
import axios from "axios";

const EditEnrollment = () => {
	const dispatch = useDispatch()
	const [branches , setBranches] = useState([])
	const [searched, hitSearch]= useState(false)
	const enrollTerm= useSelector(state=>state.auth.enrollTerm)
	const [fields, setFields] = useState({ term:enrollTerm||'',branch:'' })

	const { data, error, isLoading } = useSearchEnrollmentsQuery(fields, {
		skip:enrollTerm === null
	})

	if(error)
	{
		toast.error('An error occurred')
		console.log(error);
	}
	const handleSearch = ev => {
		ev.preventDefault()
		hitSearch(a=>!a)
		dispatch({type:'SEARCH_ENROLLED', payload:fields})
	}
	useEffect(()=>{
		axios.get('get-branches')
		.then(({data})=>{
			setBranches(data)
		})
	},[])
	return (
	<div> 
		<Card>
		<CardHeader className="d-flex" style={{justifyContent:'space-between'}}>
			<b> EDIT ENROLLMENTS </b>  
			<Link to={`/add-enrollment`} className="btn btn-sm btn-rounded btn-primary">
				<i className="fa fa-plus"/> Export 
			</Link> 
		</CardHeader>
		<CardBody>
			<Form onSubmit={handleSearch}>
				<FormGroup>
				<Row>
					<Col xs="3">
					<Label for="branch"> Branch </Label>
					<Input
						id="branch" 
						name="branch"
						type="select"
						onChange={e=>setFields({...fields,branch:e.target.value})}
					>
					<option value={''}> All </option>
					{ 
						branches.map((option,i)=>{
							return <option key={i} value={option.id}>{option.name}</option>
						})
					} 
					</Input>
					</Col >
					<Col xs="3" >
					<Label for="search"> Applicant Name/ Aadhaar </Label>
					<div className="d-flex">
						<Input
							id="search"
							name="term"
							placeholder="Search name/phone/KYC"
							type="text"
							value={fields.term}
							onChange={e=>setFields({...fields,[e.target.name]:e.target.value})}
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
                        <th> Action </th>
						<th> SR </th>
						<th> Applicant Name </th>
						<th> Address </th>
						<th> Phone </th>
						<th> Village </th>
						<th> Center ID </th>
						<th> Aadhaar </th>
						<th> Type </th>
					</tr>
				</thead>
				<tbody> 
				{isLoading? <tr><td colSpan={6} className="text-center"><Spinner/></td></tr> :
					data?.length ? data.map((row,index)=>{
						return (<tr key={index}>
							<td>
                                <button className="btn-primary btn-sm btn">
                                    <Link 
										to={'/edit-enrolled/'+row.id} 
										className="text-decoration-none text-white"
									> 
										Manage 
									</Link>
                                </button> 
                            </td>
							<td>{index+1}</td>
							<td>{row.applicant_name}</td>
							<td>{row.district??'N/A'}</td>
							<td>{row.phone}</td>
							<td>{row.village??'N/A'}</td>
							<td>{row.center_id??'N/A'}</td>
							<td>{row.aadhaar}</td>
							<td>{row.type??'N/A'}</td> 
						</tr>)
					}):
					searched && <tr>
						<td colSpan={6} className="text-center text-danger">
							No records found!
						</td>
					</tr> 
				}
				</tbody>
				</Table> 
			</div>
		</CardBody>
		</Card> 
	</div>
	);
};

export default EditEnrollment;
