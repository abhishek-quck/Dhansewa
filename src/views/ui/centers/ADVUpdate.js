import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

function ADVUpdate() {
	const dispatch = useDispatch()
    //eslint-disable-next-line
    const getInfo = ()=>{}
	const [generalFields,setGeneralFields]=useState({
		centerID:'',
		centerName:'',
		blackList:'',
		centerRating:'',
		centerLeader:'',
		centerLeaderPhone:''
	})
	
	const [financialFields, setFinancialFields]=useState({
		centerID:'',
		collection:'',
		cityName:'',
	})

	const handleGeneralChange = e => {
		setGeneralFields({...generalFields, [e.target.name]:e.target.value })
	}
	 
	const handleFinancialChange = e => {
		setFinancialFields({...financialFields, [e.target.name]:e.target.value })
	}

	const handleGeneralSubmit = e => {
		e.preventDefault()
		dispatch({type:'LOADING'})
		axios.post('/update-center-advance/general',generalFields)
		.then(({data})=>{
			if(data.stauts)
			{
				toast.success(data.message)
			}
		})
		.catch(({data})=>{
			console.log(data)
			toast.error('Something went wrong!')
		})
		.finally(()=>dispatch({type:'STOP_LOADING'}))
	}
	
	const handleFinancialSubmit = e => {
		e.preventDefault()
		dispatch({type:'LOADING'})
		axios.post('/update-center-advance/financial',financialFields)
		.then(({data})=>{
			if(data.stauts)
			{
				toast.success(data.message)
			}
		})
		.catch(({data})=>{
			console.log(data)
			toast.error('Something went wrong!')
		})
		.finally(()=>dispatch({type:'STOP_LOADING'}))
	}
    return (
        <>
        <Card>
            <CardHeader> 
                <CardTitle>
				<b> CENTER ADVANCE UPDATE </b>
                </CardTitle>
            </CardHeader>
            <CardBody>
                <CardText>
                    ADVANCE CENTER UPDATE 
                </CardText>
                <Col>
                    <Row className='d-flex'>
                        <Col md={6} >
                            <Row className='d-flex'> 
                                <Col md={6}>
                                    <Label for={'branch'}> Branch Name </Label>
                                    <Input
                                        id='branch'
										name='branch'
                                        type='select'
                                    >
                                        <option> All </option>
                                    </Input>
                                </Col>
                                <Col md={6}>
                                    <Label> Search Name</Label>
                                    <div className='d-flex'>
                                        <Input
											type='text'
											placeholder='Search Center by name or Center ID last 3 digits'
										/>
                                        <Button color='primary'> 
                                         	<i className='fa fa-search'/>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <div className="mt-3" id="resultArea"/>   
                            </Row>
                        </Col>
                        <Col md={6} >
                            <Card>
							<CardHeader tag="h6" className="border-bottom card-custom-header mb-0 d-flex">
                                    <b className={`mt-1 mb-1`}> General Setting </b>
                                </CardHeader>
                                <CardBody className="bg-gray-300">
                                  <Form onSubmit={handleGeneralSubmit}>
                                    <FormGroup>
                                
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="center"> Center ID </Label>
                                                <Input 
                                                    id="center"
                                                    name="centerID"
                                                    type="text"
                                                    placeholder="Enter new Center ID 3 digit" 
													onChange={handleGeneralChange}
                                                />
                                            </div>
                                        </Col > 
                                        </Row> 

                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="centerName"> Center Name </Label>
                                                <Input
                                                    id="centerName" 
                                                    name="centerName"
                                                    type="select"
													onChange={handleGeneralChange}
                                                >
                                                    <option value={'bihar'}> Bihar </option>
                                                    <option value={'up'}> UP </option> 
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="blackList"> Black List YN </Label>
                                                <Input 
                                                    id="blackList"
                                                    name="blackList"
                                                    type="select" 
													onChange={handleGeneralChange}
                                                >
                                                    <option value={'no'}> No </option>
                                                    <option value={'yes'}> YES </option>
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="centerRating"> Center Rating </Label>
                                                <Input 
                                                    id="centerRating"
                                                    name="centerRating"
                                                    type="select" 
													onChange={handleGeneralChange}
                                                >
                                                    <option value={'good'}> Good </option>
                                                    <option value={'average'}> Average </option>
                                                    <option value={'bad'}> Bad </option>
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row> 
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="centerLeader">
                                                    Center Leader
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input 
                                                    id="centerLeader"
                                                    name="centerLeader"
                                                    type="text" 
                                                    placeholder='Enter center leader name'
													onChange={handleGeneralChange}
                                                />
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="centerLeaderPhone">
                                                    Center Mobile
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input 
                                                    id="centerLeaderPhone"
                                                    name="centerLeaderPhone"
                                                    type="text" 
                                                    placeholder='Enter center leader phone'
													onChange={handleGeneralChange}
                                                />
                                            </div>
                                        </Col > 
                                        </Row>
                                 
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <button type='submit' className='btn btn-primary btn-sm btn-rounded w-100 mt-2'> Update </button>
                                        </Col > 
                                        </Row> 
                                    </FormGroup> 
                                    </Form>
                               
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader tag="h6" className="card-custom-header d-flex"> 
									<b className='mt-1 mb-1'> Financial Setting </b>
                                </CardHeader>
                                <CardBody className="bg-gray-300">
                                  <Form onSubmit={handleFinancialSubmit}>
                                    <FormGroup>
                                
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4"  size={'sm'} for="centerID">
                                                    CDS Create 
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input 
                                                	id="centerID"
                                                    name="centerID"
                                                    type="text"
                                                    placeholder="Enter new Center ID 3 digit" 
													onChange={handleFinancialChange}
                                                />
                                            </div>
                                        </Col > 
                                        </Row> 

                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="collection"> 
                                                    Collection Display 
                                                    <span className='text-danger'>*</span> 
                                                </Label>
                                                <Input
                                                    id="collection" 
                                                    name="collection"
                                                    type="select"
													onChange={handleFinancialChange}
                                                >
                                                    <option> Bihar </option>
                                                    <option> UP </option> 
                                                </Input>
                                            </div>
                                        </Col > 
                                        </Row>
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <div className="d-flex">
                                                <Label className="col-4" size={'sm'} for="exampleEmail"> Arrear Center <span className='text-danger'>*</span> </Label>
                                                <Input 
                                                    name="cityName"
                                                    type="text"
                                                    placeholder="Enter village/city name"
													onChange={handleFinancialChange}
                                                />
                                            </div>
                                        </Col > 
                                        </Row>
                                 
                                        <Row className="mt-2">
                                        <Col md="12">
                                            <button type='submit' className='btn btn-primary btn-sm btn-rounded w-100 mt-2'> Update </button>
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

export default ADVUpdate