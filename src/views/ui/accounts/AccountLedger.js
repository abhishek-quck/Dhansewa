import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Spinner, Table } from 'reactstrap'   
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import { validate } from '../../../helpers/utils';
import ErrorMessage from '../../../layouts/error/ErrorMessage';
// import { DataGrid } from '@mui/x-data-grid';
// import Loader from '../../../layouts/loader/Loader'

function AccountLedger() {
	const dispatch = useDispatch()
    let initialState= { branch:'', accountName:'', from:'',to:'' }
	const [fields,setFields] = useState(initialState)
	const [errors,setErrors] = useState(initialState)
    const [branches , setBranches] = useState([])
	const [data, setData] = useState([])
	const handleSubmit = e => {
        e.preventDefault()
        let {result,shouldGo} = validate(fields,[])
        setErrors(result)
        if(shouldGo)
        {
            dispatch({ type:'LOADING' })
            getLedgerData()
        }
	}

	const getLedgerData = () => {
		axios.post('/get-account-ledger', fields )
		.then(({data})=> {
			setData(data);
			dispatch({type:'STOP_LOADING'})
			setload(false)
		})
		.catch(err=>console.log(err))
	}

    useEffect(()=>{
        axios.get('get-branches')
        .then(({data})=>{
            let options = []
            for(let index of data)
            {
                options.push({value:index.id, label:index.name})
            }
            console.log(options)
            setBranches(options)
        })
    },[])

    // Generate EXCEL
    const downloadExcel = async() => {

        dispatch({type:'LOADING'})
        return axios.get('/test',{
            responseType:'blob',
            headers:{
            "Content-Type": "multipart/form-data",
            "Authorization":"Bearer "+localStorage.getItem('auth-token')
        }})
        .then(({data})=>{
            const href= URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = href 
            link.download='_blank.txt' // Don't ignore <3
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))

    }

    const [loading, setload] = useState(false);
    // const getInfo = ()=>{}
    return (
        <>
        <Card> 
            <CardBody>  
                <Col>
                    <Row className='d-flex'> 
                        <Col md={7} >
                            <Card>
                                <CardHeader tag="h6" className="border-bottom mb-0 d-flex" style={{justifyContent:'space-between'}}>
                                    <b className='mt-1'> Ledger Statement </b>
                                    <button className={'btn-sm btn d-flex btn-primary'} onClick={downloadExcel}>
                                        <i className='fa-solid fa-download' /> &nbsp; 
                                        Export 
                                    </button>
                                </CardHeader>
                                <CardBody className="bg-gray-300">
                                  <Form onSubmit={handleSubmit}>
                                    <FormGroup>   
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="exampleEmail">
                                                    Branch Name
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <ReactSelect 
                                                    name='branch'
                                                    className='w-100'
                                                    options={branches}
                                                    onChange={e=>setFields({...fields, branch:e.value})}
                                                />
                                            </div>
                                            <ErrorMessage error={errors.branch} />
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="exampleEmail">
                                                    A/C Name
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input 
                                                    name="accountName"
                                                    type="select"  
													onChange={ e=>
														setFields({...fields, [e.target.name]:e.target.value })
													}
                                                >
                                                  <option>{' '}</option>
                                                  <option> Axis Bank Disbursement </option>
                                                  <option> Electricity Bill </option>
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="exampleEmail">
                                                    From Date
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input 
                                                    name="from"
                                                    type="date" 
													onChange={ e=>
														setFields({...fields, [e.target.name]:e.target.value })
													}
                                                />
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="exampleEmail">
                                                    To Date
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input 
                                                    name="to"
                                                    type="date"  
													onChange={ e=>
														setFields({...fields, [e.target.name]:e.target.value })
													}
                                                />
                                            </div>
                                        </Col > 
                                        </Row>
                                 
                                        <Row className="mt-4">
                                        <Col md="12">
                                            <button type='submit' className='btn btn-danger btn-sm btn-rounded w-100' 
                                            onClick={()=>setload(!loading)}
                                            style={{height:'46px'}}
                                            >
                                               {loading?<Spinner color="light"/>:'Statement'}    
                                            </button>
                                        </Col > 
                                        </Row> 
                                    </FormGroup> 
                                    </Form>
                               
                                </CardBody>
                            </Card> 
                        </Col>
                    </Row>
                </Col>
                <Row>
			 {data.length?
               <Table bordered className="no-wrap mt-3 align-middle" style={{fontSize:'small'}} responsive hover>
                <thead>
                    <tr>
                        <th> S.No </th>
                        <th> Branch No </th>
                        <th> Date </th>
                        <th> V.Type </th>
                        <th> VCH No. </th>
                        <th> Narration </th>
                        <th> Debit </th>
                        <th> Credit </th>
                        <th> Balance </th>
                        <th> Approve </th>
                    </tr>
                </thead>
                <tbody>
					{data.map((row,key)=> {
						return (<tr key={key}>
							{row.map((cell,key)=>{
								return <td key={key}>{cell}</td>
							})}
						</tr>)
					})}
                    <tr>
						<td >1</td>
						<td> 34 </td>
						<td> 01-08-2022 </td>
						<td> Journal </td>
						<td> 20231101010028 </td>
						<td> Collection Benipur </td>
						<td> 29610 </td>
						<td> 0 </td>
						<td> 87257 </td>
						<td> NO </td>
                    </tr> 
                </tbody>
               </Table>
			   : null
			 }

			    {/*
				<div>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
						}}
						pageSizeOptions={[5, 10]}
						checkboxSelection
					/>
				</div>
				*/}
                </Row>
            </CardBody>
        </Card>
        </>
      )
}

export default AccountLedger 