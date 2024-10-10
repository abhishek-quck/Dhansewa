import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
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
  Button,
  Tooltip,
} from "reactstrap";
import { useSearchEnrollmentsQuery } from "../../../features/centerSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { usePermissions } from "../../../hooks/usePermissions";
import { EDIT_ENROLL } from "../../../constansts/permission";

const EditEnrollment = () => {
	const dispatch = useDispatch()
	const { hasPermission } = usePermissions()
	const [branches , setBranches] = useState([])
	const [searched, hitSearch]= useState(false)
	const [showSearch, setSearch] = useState(false)
	const [reviewList, setReviewList] = useState([])
	const {enrollTerm, branchNames}= useSelector( state => state.auth )
	const [fields, setFields] = useState({ term:enrollTerm||'',branch:'' })
	const searchRef = useRef(null)
	const { data, error, isLoading } = useSearchEnrollmentsQuery(fields, {
		skip:enrollTerm === null
	})
    const [tooltipOpen, setTooltip] = useState(false)

    const toggle = () => setTooltip(!tooltipOpen)

	if(error)
	{
		toast.error('An error occurred')
		console.log(error);
	}
	const handleSearch = ev => {
		ev.preventDefault()
		hitSearch(a=>!a)
		setSearch(true);
		dispatch({ type:'SEARCH_ENROLLED', payload:fields })
	}

	const fetchReSubmit = () => {
		setSearch(false)
		dispatch({ type:'LOADING' })
		axios.get('get-review-clients').then(({data}) => {
			let obj = {}
			data.forEach( item => {
				obj[item.id] = item.remarks
			});
			// console.log(obj)
			dispatch({ type:'SET_REVIEW_CLIENTS', payload: obj });
			setReviewList(data);

		}).catch(e=>{}).finally(() => dispatch({ type:'STOP_LOADING' }))
	}

	useEffect(() => {

		axios.get('get-branches').then(({data})=> {
			setBranches(data) 
			$('#editEnrolls').trigger('click')
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
						{  branches.map((option,i)=> <option key={i} value={option.id}>{option.name}</option> ) } 
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
							<button type="submit" id="editEnrolls" ref={searchRef} className="btn btn-primary">
								<i className="fa fa-search" />
							</button>
						</div>
					</Col>
					<Col xs="6" >
						<Button 
							type="button" 
							className={`btn mt-4 offset-8 ${showSearch?'resubmit':'btn-primary'}`}
							onClick={showSearch? fetchReSubmit: ()=>searchRef.current.click()}
						>
							{showSearch? 'Re-submit List':'Show Updated'}
						</Button>
						{showSearch &&
							(<>
								<i className='ms-2 fa-regular fa-circle-question' id='tooltip' />
								<Tooltip
									placement={'top'}
									isOpen={tooltipOpen}
									target={'tooltip'}
									toggle={toggle}
								>
									Clients which are sent back for improvement while Credit Appraisal.
								</Tooltip>
							</>)
						}
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
						<th> {showSearch? 'Center ID':'Branch'} </th>
						<th> Aadhaar </th>
						<th> {showSearch? 'Type':'Remarks'} </th>
					</tr>
				</thead>
				<tbody> 
				{ showSearch ?
					(isLoading?  <tr> <td colSpan={9} className="text-center"><Spinner/></td></tr> :
					(data.length ? data.map((row,index)=>{
						return (<tr key={index}>
							<td>
                               {hasPermission(EDIT_ENROLL,'edit') ? <button className="btn-primary btn-sm btn">
                                    <Link 
										to={'/edit-enrolled/'+row.id} 
										className="text-decoration-none text-white"
									> 
										Manage 
									</Link>
                                </button> : null }
                            </td>
							<td><span>{index+1}</span></td>
							<td><span>{row.applicant_name}</span></td>
							<td><span>{row.district??'N/A'}</span></td>
							<td><span>{row.phone}</span></td>
							<td><span>{row.village??'N/A'}</span></td>
							<td><span>{row.center_id??'N/A'}</span></td>
							<td><span>{row.aadhaar}</span></td>
							<td><span>{row.type??'N/A'}</span></td> 
						</tr>)
					}):
					searched && <tr>
						<td colSpan={6} className="text-center text-danger">
							<span>No records found!</span>
						</td>
					</tr>))
					: (
						reviewList.map( (row,i) => {
							return (<tr key={row.id} className="reviewList">
							<td>
                               {hasPermission(EDIT_ENROLL,'edit') && <button className="btn-primary btn-sm btn">
                                    <Link 
										to={'/edit-enrolled/'+ row.id} 
										className="text-decoration-none text-white"
									> 
										Manage 
									</Link>
                                </button> }
                            </td>
							<td>{i+1}</td>
							<td>{row.applicant_name}</td>
							<td>{row.district??'N/A'}</td>
							<td>{row.phone}</td>
							<td>{row.village??'N/A'}</td>
							<td>{branchNames[row.branch_id]??'N/A'}</td>
							<td>{row.aadhaar}</td>
							<td>{row.remarks??'N/A'}</td> 
							</tr>)
						})
					)
				}
				{
					!showSearch && reviewList.length === 0 ? (
					<tr>
						<td colSpan={9} className="text-center text-danger">
							<h5> No records found! </h5>
						</td>	
					</tr>
				) : null }
				</tbody>
				</Table> 
			</div>
		</CardBody>
		</Card> 
	</div>
	);
};

export default EditEnrollment;
