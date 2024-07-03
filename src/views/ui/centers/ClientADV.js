import React, { useEffect,useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Spinner, Table } from 'reactstrap'
import $ from 'jquery'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { FormControl } from '@mui/material'
import ReactSelect from 'react-select'

function ClientADV() {
    //eslint-disable-next-line
    const getInfo = ()=>{}
	const dispatch = useDispatch()
	const [searchFields, setSearchFields] = useState({
		branch:'',
		center:'',
		keyword:''
	})

	const setChange = e =>{
		console.log('setChange');
		setSearchFields({...searchFields, [e.target.name]:e.target.value})
	}
	
    const [responseData, setResponse] = useState([])
    const [Option, setOption] = useState('')
    const [branches, setBranches] = useState([])
    const [centers, setCenters] = useState([])
    const [transferLoading, setLoading] = useState(false)
    const init = () => {
        dispatch({type:'LOADING'})
        axios.get('get-options/all')
		.then(({data})=>{
		    
            if(data.centers) setCenters(data.centers)
            if(data.branches) setBranches(data.branches)
                
		}).finally(()=>{
            dispatch({type:'STOP_LOADING'})
        }) 	
    }
    useEffect(()=>{
        [...document.getElementsByClassName('select2')].forEach(element => {  
            $(element).select2({
                placeholder:element.getAttribute('placeholder'),
                width:'100%'
            })            
        });
        init()
		return ()=>null
    },[Option])

	const handleSearch = e => {
		// here it comes baeibee
		dispatch({type:'LOADING'})
		e.preventDefault()
		axios.post('/get-client-details', searchFields)
		.then(({data})=>{
			setResponse(data)
		})
		.catch((err)=>console.log(err))
		.finally(()=>dispatch({type:'STOP_LOADING'}))	
	}

    return (
        <>
        <Card>
            <CardHeader> 
				<b> CLIENTS ADVANCE UPDATE </b>
			</CardHeader>

            <CardBody>
                <Col>
                    <Row className='d-flex'>
                        <Col md={6} >
							<Form onSubmit={handleSearch}>
                            <Row> 
                                <Col >
									<FormControl sx={{ m: 2, minWidth: 440 }} size='xs'>
										{/* <Label for="branch"> Branch Name </Label> */}
										<ReactSelect
											id='branch'
											placeholder='Select Branch'
											onChange={e=>setSearchFields({...searchFields, branch:e.value})}
											options={branches}
										/> 
									</FormControl>
                                </Col>
                              
                            </Row>
                            <Row> 
                                <Col >
								<FormControl sx={{ m: 2, minWidth: 440 }} size='small'>
                                    {/* <Label for="center"> Center Name</Label> */}
                                        <ReactSelect  
                                            id='center'
											placeholder='Select Center'
											options={centers}
											onChange={e=>setSearchFields({...searchFields, center:e.value})}
                                        />
								</FormControl>
                                </Col>
                            </Row>
                            <Row> 
                                <Col >
								<FormControl sx={{ m: 2, minWidth: 440 }} size='small'>

                                    {/* <Label for='name'> Search Name</Label> */}
                                    <div className='d-flex'>
                                        <Input
											id='name' 
											name='keyword' 
											type='text' 
											placeholder='Search Center by name or Center ID last 3 digits'
											onChange={setChange}
										/>
                                        <Button type="submit" color='primary'> 
											<i className='fa fa-search'/>
                                        </Button>
                                    </div>
								</FormControl>
                                </Col>
                            </Row>
							</Form>
                            <Row>
								<Col>
                                <div className="mt-1 mx-3" id="resultArea">
								<Table bordered hover style={{fontSize:'small'}}>
									<thead>
										<tr>
											<th> Client ID </th>
											<th> Client Name </th>
											<th> <i className='fa fa-ellipsis-vertical'/> </th>
										</tr>
									</thead>
									<tbody>
										{responseData.length ?
											responseData.map((row,index)=>{
												return (<tr key={index}>
                                                    <td> {row.id} </td>
                                                    <td> {row.name} </td>
                                                    <td> 
                                                        <i className='fa fa-pencil'/>
                                                    </td>
												</tr>)
											})
										:null
										}
									</tbody>
								</Table>  
								</div> 
								</Col>
                            </Row>
                        </Col>
                        <Col md={6} >
                            <Card>
                                <CardHeader>
									<b className={'mt-1'}> CLIENT DETAILS </b>
                                </CardHeader>
                                <CardBody className="bg-gray-300">
                                  <Form>
                                    <FormGroup> 
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="exampleEmail"> Center ID </Label>
                                                <Input 
                                                    name="centerID"
                                                    type="text"
                                                />
                                            </div>
                                        </Col > 
                                        </Row> 
                                        
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="exampleEmail"> Client Name </Label>
                                                <Input 
                                                    name="centerID"
                                                    type="text"
                                                />
                                            </div>
                                        </Col > 
                                        </Row> 

                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="exampleEmail"> Center Name </Label>
                                                <Input
                                                    id="exampleSelectMulti" 
                                                    name="selectMulti"
                                                    type="select"
                                                    className='select2'
                                                    placeholder='try a placeholder'
                                                >
                                                    <option></option>
                                                    <option> Benipur </option>
                                                    <option> Madhubani </option> 
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                      
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for='suspendDate'>
                                                    Suspend Date
                                                </Label>
                                                <Input 
                                                    name="suspendDate"
                                                    id="suspendDate"
                                                    type="text" 
                                                    disabled
                                                />
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for='option'>
                                                    Option
                                                </Label>
                                                <Input 
                                                    name="option"
                                                    id="option"
                                                    type="select" 
                                                    onChange={e=>setOption(e.target.value)}
                                                >
                                                    <option value={''}> --SELECT-- </option>
                                                    <option value={'active'}> Active </option>
                                                    <option value={'suspend'}> Suspend </option>
                                                    <option value={'client-switch'}>
                                                        Client Switching 
                                                    </option>
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                        { Option ==='client-switch' ?
                                        <>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for='groupID'>
                                                    Group ID <span className='text-danger'>*</span>
                                                </Label>
                                                <Input 
                                                    name="groupID"
                                                    id="groupID"
                                                    type="select" 
                                                    className='select2'
                                                >
                                                    <option> --SELECT-- </option> 
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for='option'>
                                                    Listed Position <span className='text-danger'>
                                                        optional
                                                    </span>
                                                </Label>
                                                <Input 
                                                    name="option"
                                                    id="option"
                                                    type="select" 
                                                    placeholder='Keep blank for Auto ID'
                                                    className='select2'
                                                > 
                                                </Input>
                                            </div>
                                        </Col> 
                                        </Row>
                                        </> : null
                                        }
                                 
                                        <Row className="mt-2">
                                            <Col md="12">
                                                <button type='button'
                                                className='btn btn-danger btn-sm btn-rounded w-100 mt-2' 
                                                onClick={()=>setLoading(!transferLoading)}
                                                > 
                                                { transferLoading? <Spinner size={'sm'} /> :'Transfer Now' }
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
            </CardBody>
        </Card>
        </>
      )
}

export default ClientADV