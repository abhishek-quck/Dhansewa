import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const CGTEntry = () => {
    const [aadhaarVerified, setVerified] = useState(false)
    const [sFields, setFields] = useState({branch_id:'',employee:'',process:'',search:''});
    const [branches, setBranches] = useState([]);
    const processes = [
        {value:'all',label:'ALL'},
        {value:'pending',label:'PENDING'},
        {value:'hold',label:'HOLD'},
        {value:'under_process',label:'UNDER_PROCESS'},
        {value:'approved',label:'APPROVED'},
        {value:'editable',label:'EDITABLE'},
        {value:'reject',label:'REJECT'},
        {value:'forgery',label:'FORGERY'},
        {value:'cgt_entry',label:'CGT_ENTRY'},
        {value:'cgt_revised',label:'CGT_REVISED'},
        {value:'doc_uploaded',label:'DOC_UPLOADED'},
        {value:'grt_complete',label:'GRT_COMPLETE'},
        {value:'cb_approved',label:'CB_APPROVED'},
    ];
    const employeeRef = useRef(null);
    const processRef = useRef(null);
    const searchRef = useRef(null);
    const [employees, setEmployees] = useState([])
    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        setVerified(!aadhaarVerified)
        // dispatch({type:'LOADING'})
        // axios.get('')
        // .then(({data})=>console.log(data)).finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    const updateBranch = e => {
        if(e)
        {
            setFields({...sFields, branch_id:e.value})
            axios.get('get-branch-employees/'+e.value)
            .then(({data}) => {
                console.log(data)
                setEmployees(data)
            }).catch(err=>console.log(err.message)).finally(()=>dispatch({type:'STOP_LOADING'}))
        }
    }
    const updateEmployee = e => {
        if(e)
        {
            setFields({...sFields, employee:e.value });
        }
    }
    const updateProcess = e => {
        if(e)
        {
            setFields({...sFields, process:e.value});
        }
    }
    const updateSearch = e => {
        if(e)
        {
            setFields({...sFields, search:e.value});
        }
    }
    useEffect(()=>{
        axios.get('get-branches')
        .then(({data}) => {
            let options = []
            data.forEach( item => options.push({value:item.id, label:item.name}) );
            setBranches(options)
        }).catch(err=>err.message).finally()
    },[]);

    return (
    <>
    { aadhaarVerified ===false ?
        (<Card>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row style={{borderBottom:'1px dashed black'}}>
                        <h3 style={{fontFamily:'math'}}> Aadhaar Verification </h3>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={6}>
                            <Label for="filter"> Enter Aadhaar Number </Label>
                            <div className='d-flex'>
                                <Input id='filter' type='text' placeholder='Search aadhaar...'/>
                                <Button className='bg-primary w-50'>
                                    Verify & Next
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>)        
        : (
            <Card className="col-12">
                <CardHeader tag="h6" className="d-flex gap-auto" >
                    <span 
                        className="mt-2 mb-2 fa-solid fa-arrow-rotate-left" 
                        onClick={()=>setVerified(!aadhaarVerified)}
                    />
                    <b className="m-2"> CLIENT SOURCING </b>
                    <Link to={`/add-enrolled-cgt`} 
                        className="btn btn-sm btn-rounded btn-primary" 
                        style={{position:'absolute',left:'93%'}}
                    >
                        <i className="fa fa-plus"/> New 
                    </Link> 
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit} name="speedLoan">
                    <FormGroup>
                        <Row className="">
                        <Col md="3">
                            <Label size={'sm'} for="branches"> Branches </Label>
                            <ReactSelect
                                id='branches'
                                onChange={updateBranch}
                                options={branches}
                            />
                        </Col > 
                        <Col md="3">
                            <Label size={'sm'} for="employee"> Employee </Label>
                            <ReactSelect
                                id='employee'
                                onChange={updateEmployee}
                                ref={employeeRef}
                                options={employees}
                            />
                        </Col > 
                        <Col md="3">
                            <Label size={'sm'} for="process"> Process </Label>
                            <div className="d-flex">
                                <ReactSelect
                                    id="process"
                                    isSearchable
                                    options={processes}
                                    ref={processRef}
                                    className="w-100 client"
                                    defaultValue={sFields.process}
                                    onChange={updateProcess}
                                /> 
                            </div>
                        </Col > 
                        <Col md="3">
                            <Label size={'sm'} for="search"> Search </Label>
                            <div className="d-flex">
                                <Input
                                    id="search"
                                    ref={searchRef}
                                    className="w-100 search"
                                    placeholder='Search by name/phone/KYC'
                                    defaultValue={sFields.search}
                                    onChange={updateSearch}
                                /> 
                                <button className='btn btn-primary'><i className='fa fa-search' /></button>
                            </div>
                        </Col > 
                        </Row>   
                    </FormGroup> 
                    </Form>
              </CardBody>
            </Card>
        )
    }
    </>
    )
}
 
export default CGTEntry