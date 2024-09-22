import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { preview } from '../../../../attachments'
import { validate } from '../../../../helpers/utils'

const AddGRT = () => {

	let {id}= useParams()
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const [docs, setDocuments] = useState([])
    const [doc, setDocument] = useState(null)
    const [visitPhoto, setVisitPhoto] = useState({b64:null,blob:null})
    const [groupPhoto, setGroupPhoto] = useState({b64:null,blob:null})
	const [districts, fillDistricts] = useState([])
	const [centers, fillCenters] = useState([])

	let thisUser = useSelector(state=>state.auth.GRTs[id]??{}) 
	console.log(thisUser)
	const previousDocument = thisUser?.latest_document?.file_name??'' 

    const [fields,setFields] = useState({
        applicant_name:thisUser['applicant_name'] ??'',
		branch:thisUser['branch_id'] ??'',
		center:thisUser['center_id'] ??'',
		aadhaar:thisUser['aadhaar'] ??'',
		verification_type:thisUser['verification_type'] ??'',
		verification:thisUser['verification'] ??'', 
		phone:thisUser['phone'] ??'', 
		district:thisUser['district'] ??'', 
		created_at:thisUser['created_at'] ??'',
    })
    const onChange = e => setFields({...fields, [e.target.name]:e.target.value})
    
    const handleSubmit = e => {
        
		e.preventDefault()
		let { shouldGo,result } = validate(fields)
		if( shouldGo===false)
		{
			console.log(result);
			return toast.error('Fill the required fields!')
		}
        let formData = new FormData()
		formData.append('id', id );
        for(let entry in fields)
        {
            formData.append(entry, fields[entry])
        }
        formData.append('document', doc)
        formData.append('visit_photo', visitPhoto.blob)
        formData.append('group_photo', groupPhoto.blob)
        axios.post('/update-client-details', formData, {
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data}) => {
			if( typeof data === 'object' && Object.keys(data).length )
            {
                dispatch({ type:'UPDATE_GRT', payload:data })
                setTimeout(()=> {
                    toast.success('Record updated successfully!')
                    setTimeout(()=>navigateTo('/client-grt'), 3000 )
                })
            }
        }).catch(({response})=>{
			toast.error( response.data.message )
			console.log( response );
		})
    }

	const init = () => {

		axios.get('get-options/all')
		.then(({data})=>{ 
			if(data.district) fillDistricts(data.district)
		}).catch(err=>console.log(err.message))
	
		let branch_id = fields.branch || fields.branch_id;
		axios.get('get-branch-centers/'+ branch_id )
		.then(({data}) => {
 		    fillCenters(data.map( item => ({value:item.id, label:item.name})))
			axios.get('documents').then(({data})=> setDocuments(data) ).catch(err=>console.log(err))
		}).catch(e=>{})

	}

	const previewDoc = () => {
		let data = thisUser?.latest_document?.data
		let clientID = thisUser?.grt?.enroll_id
		preview( data!==undefined?[data]:false, null, clientID )
	}
	
	const previewImage = (e) => {
		let name = e.target.name; // only 2 options dere
		preview([name==='visit'? visitPhoto.b64 : groupPhoto.b64 ], thisUser?.grt?.enroll_id )
	}

	const uploadPhoto = e => {
		let file = e.target.files[0];
		let name = e.target.name;
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = function() {
			if( name === 'visit_photo') {
				setVisitPhoto({...visitPhoto, b64:reader.result, blob:file});
			} else {
				setGroupPhoto({...groupPhoto, b64:reader.result, blob:file})
			}
        }; 
	}
	
    useEffect(()=>{
		
		if(Object.keys(thisUser).length)
		{
			console.log(thisUser)
		}else{
			axios.post(`get-enrollment-details/${id}`)
			.then(({data})=>{
				if(typeof data==='object' && Object.keys(data).length)
				{
					let object = {}
					object[data.id]=data
					delete data.other_info
					delete data.PAN
					setFields(data)
					dispatch({type:'PUT_GRTs',payload:object})
				}
			})    
		}
		 
		init()

		return ()=>null

    },[])

    return (
        <div> 
		<Card className="col-7">
		<Form onSubmit={handleSubmit}>
		<CardHeader tag="h6" className="mb-0 d-flex" >
			<b className="mb-2 mt-2"> CLIENT INFORMATION: ENROLLMENT </b>
		</CardHeader>
		<CardBody className="bg-gray-300">
			<FormGroup>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="id">
						Enroll ID
					</Label>
					<Input
						id="id" 
						type="text"  
						value={id}
						readOnly
						disabled
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="enrollDate">
						Enroll Date
					</Label>
					<Input
						id="enrollDate" 
						type="text"  
						value={fields.created_at}
						readOnly
						disabled
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4"  size={'sm'} for="aadhaar"> Aadhaar </Label>
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
					<Label className="col-4"  size={'sm'} for="name"> Client Name </Label>
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
					<Label className="col-4"  size={'sm'} for="name"> Center ID </Label>
					<Input
						id="name" 
						name="center"
						type="select"
						value={fields.center_id??fields.center}
						onChange={onChange}
					> 
						<option> Select Center </option>
						{centers.map((option,i)=>{
							return <option value={option.value} key={i}>{option.label}</option>
						})}
					</Input> 
				</div>
				</Col> 
			</Row>
			       
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="district"> Address </Label>
					<Input
						id="district" 
						name="district"
						type="select"
						onChange={onChange}
						value={fields.district}
					>
						{districts.map((option,i)=>{
							return <option key={i} value={option.value}>{option.label}</option>
						})}
					</Input>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<div className="col-3">
						<Input 
							type='select'
							className={''} 
							name='verification_type'
							onChange={onChange}
							value={fields.verification_type}
						>
							<option> Select KYC </option>
							{docs.map((option,i)=>{
								return <option key={i} value={option.id}>{option.name}</option>
							})} 
						</Input>
					</div>
					<Input
						id="verification" 
						name="verification"
						type="text"
						className='form-control offset-1'
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
					<Label className="col-4" size={'sm'} for="doc"> Upload GRT Document </Label>
					<Input
						id="doc" 
						name="document"
						type="file" 
						onChange={e=>setDocument(e.target.files[0])}
					/>
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="visit_photo"> Upload Visit Photo </Label>
					<Input
						id="visit_photo" 
						name="visit_photo"
						type="file" 
						accept='image/*'
						onChange={uploadPhoto}
					/>
					{visitPhoto.b64 && 
					 (
						<>
						<button className='btn' name='visit' type='button' onClick={previewImage} style={{border:'1px dashed'}}
						> Preview </button> 
						<small className='mx-4'> </small>
						</>
					 )
					}
				</div>
				</Col > 
			</Row>
			<Row className="mt-2">
				<Col md="12">
				<div className="d-flex">
					<Label className="col-4" size={'sm'} for="group_photo"> Upload Group Photo </Label>
					<Input
						id="group_photo" 
						name="group_photo"
						type="file" 
						accept='image/*'
						onChange={uploadPhoto}
					/>
					{groupPhoto.b64 && 
					 (
						<>
						<button className='btn' name='group' type='button' onClick={previewImage} style={{border:'1px dashed'}}
						> Preview </button> 
						<small className='mx-4'> </small>
						</>
					 )
					}
				</div>
				</Col > 
			</Row>
			{
				previousDocument ? 
				<Row className="mt-4">
					<Col md="12">
					<div className="d-flex">
						<Label className="col-4" size={'sm'} for="doc"> Previous GRT Document </Label>
						<button className='btn' type='button' onClick={()=>previewDoc()} style={{border:'1px dashed'}}
						> Preview </button>
						<small className='mx-4'>{previousDocument}</small>
					</div>
					</Col > 
				</Row>
				:null
			}
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