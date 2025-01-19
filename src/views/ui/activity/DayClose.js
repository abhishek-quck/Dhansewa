import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import { formatDate, getCurrentDay, getCurrentTime, Warning } from '../../../helpers/utils';

let initial = {
    cashBook: null,
    bankSlip: null,
    meetingPhoto: null
}
function DayClose() {

    const [branches, setBranches] = useState([]);
    const [collection, setCollection] = useState([]);
    const [checked, setChecked ]= useState(false);
    const [branchID, setBranch ]= useState('');
    const [branchInfo, setBranchInfo ]=useState({})
    const dispatch = useDispatch();
    const [centerwise, setCenterWise] = useState(false);
    const [centerCollections, setCenterCollections] = useState([]);
    const [modal, setModal] = useState(false);
    const [ actingCenter, setActingCenter ] = useState({id:'', name:''});

    const [ attachments, setAttachments ] = useState(initial);

    const containerStyle = {borderTop:'1px dashed',boxShadow:'-20px 0 10px -5px rgba(0, 0, 0, 0.1)'}

    // Submit Form `day-close`
    const closeDay = e => {

        e.preventDefault()
        dispatch({ type:'LOADING' });
        axios.get('day-close/'+branchID)
        .then(({data}) => toast.success(data.message)).catch( e => toast.error(e.response?.data.message?? 'Something went wrong!'))
        .finally(() => dispatch({type:'STOP_LOADING'}));

    }

    function getCenterWise(e) {
        if (!centerwise) {
            dispatch({type:"LOADING"})
            axios.get('get-center-wise-collection/'+ branchID)
            .then(({data})=> {
                console.log(Object.values(data))
                setCenterCollections(Object.values(data))
            })
            .catch(err=>{})
            .finally(()=>dispatch({type:"STOP_LOADING"}))
        } else {
            setCenterCollections([])
        }
        setCenterWise(()=>!centerwise);
    }

    const getBranchCollection = e => {
        const branchId = e.target.value;
        setBranch( branchId );
        dispatch({ type:'LOADING' }); //loading
        axios.get('get-branch-collection/'+branchId)
        .then( ({data}) => { 
            setCollection(data); 
            axios.get('get-branches/'+branchId ).then(({ data }) => setBranchInfo(data))
            .catch( err => console.log(err.message))
        }).catch( err =>console.log(err.message))
        .finally( () => dispatch({ type:'STOP_LOADING' }))
    }

    useEffect(() => {
        axios.get('get-branches').then(({data})=>setBranches(data)).catch(e=>console.log(e.message))
    },[])

    const initUpload = e => {
        let {id, name}  = e.target.dataset;
        setActingCenter({id, name});
        setModal(!modal)
    }

    const handleFile = e => {
        let file = e.target.files[0];
		let name = e.target.name;
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = function() {
            setAttachments({...attachments, [name]:file});
        };         
    }

    const handleSubmit = e => {
        e.preventDefault();
        let fd= new FormData();
        if(!attachments.cashBook || !attachments.bankSlip || !attachments.meetingPhoto) {
            return Warning("Upload all the details to proceed")
        }
        dispatch({ type:"LOADING" })
        
        fd.append('cashbook', attachments.cashBook);
        fd.append('bank_slip', attachments.bankSlip);
        fd.append('meeting_photo', attachments.meetingPhoto);
        axios.post('center-day-close/'+actingCenter,  fd, {
            headers: {
                "Accept"       :"application/json",
                "Content-Type" : "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data}) => {
            console.log(data);
            toast.success('Day closed for center '+ actingCenter.name)
            setAttachments(initial);
        }).catch(()=> toast.error('Something went wrong!'))
        .finally(()=>dispatch({ type:"STOP_LOADING" }))
        
    }

  return (
    <>
    <Card>
        <CardHeader>
            <i className='fa-solid fa-arrow-down'/> &nbsp;
            <b>Day Closing:</b>
        </CardHeader>
        <CardBody>
            <Col md={12}>
            <Row>
                <Col md={12}>
                    <Label> Branch Name </Label>
                    <div className='col-12 d-flex'> 
                        <Input 
                            type='select' 
                            onChange={getBranchCollection}
                            style={{width:'30%'}}
                            >
                            <option> Select Branch </option>
                            {branches.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                        </Input>
                        <Button color="primary"> <i className='fa fa-search'/> </Button>
                        <Button disabled={!branchID} className='btn btn-success ms-3' onClick={getCenterWise}>
                            Center-wise
                            <Input type='checkbox' checked={centerwise} name='centerwise' className='ms-2'></Input>
                        </Button>
                    </div>
                </Col>
            </Row>
            </Col>
        </CardBody>
    </Card>
    <Card>
        <CardBody>
            <Row>
                <Col md={6}>
                    <div className='mb-3'>
                        <div className='ribbon'> 
                            <i className="fas fa-search" style={{padding:'inherit'}}/>
                        </div>
                        <b className='text-primary mx-3'> TODAY COLLECTION </b>
                    </div>
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th> NUM CLIENTS </th>
                                <th> PRN DUE </th>
                                <th> INT DUE </th>
                                <th> OTHER DUE </th>
                                <th> TOTAL </th>
                                <th> COLLECTED </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                collection.map( (item, index) => {
                                    return (<tr key={index}>
                                        <td><span>{item.total_client}</span></td>
                                        <td><span>{item.due_amount}</span></td>
                                        <td><span>{0}</span></td>
                                        <td><span>{0}</span></td>
                                        <td><span>{item.due_amount}</span></td>
                                        <td><span>{0}</span></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <div className='mb-3'>
                        <div className='ribbon'> 
                            <i className='fa fa-search' style={{padding:'inherit'}}/> 
                        </div>
                        <b className='text-primary mx-3'> SYSTEM DATE </b>
                    </div>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th> BRANCH-ID / NAME </th>
                                <th> INI DATE </th>
                                <th> DAY NAME </th>
                                <th> TIME </th>
                                <th> END DATE </th>
                                <th> : </th>
                            </tr>
                        </thead>
                        <tbody>
                            { branchID ? <tr>
                                <td><span>{branchInfo.id+'-'+branchInfo.name}</span></td>
                                <td><span>{formatDate(null,'dmY')}</span></td>
                                <td><span>{getCurrentDay()}</span></td>
                                <td><span>{getCurrentTime()}</span></td>
                                <td><span>{branchInfo.sddsf??null}</span></td>
                                <td><span></span></td>
                            </tr> : null}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </CardBody>
    </Card>
    {
        centerwise &&  <Card>
        <CardBody>
            <Row>
            <Col md={6}>
                <Table striped hover bordered>
                    <thead>
                        <tr>
                            <th>Center ID</th>
                            <th>Name</th>
                            <th>Coll. Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centerCollections.map( item => {
                            return (<tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.due+` ₹`}</td>
                                <td>
                                    <Button className={`btn-success`} data-id={item.id} data-name={item.name} onClick={initUpload}> Upload </Button>
                                    <Button className='btn-primary ms-2 btn-rounded'>Day Close</Button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Col>
            </Row>
        </CardBody>
    </Card>
    }
    <Card>
        <CardBody>
            <Row className='mb-3'>
                <Col md={6}>
                    <div className='text-primary'>
                        <b> Process for Day closing </b>
                    </div>
                </Col>
            </Row>
            
            <Container className='p-5' style={containerStyle}>
                <Form onSubmit={closeDay}>
                <Row>
                    <Col md={6}>
                        <p> Day closing is process of submit all collection report and disbursement report to the system records. </p>
                    </Col>
                    <Col md={6}>
                        <button type='submit' className='btn btn-primary' disabled={!branchID || !checked} style={{float:'right'}}> Day close now </button>
                    </Col>
                </Row>
                <Row>
                    <FormGroup>
                        <input 
                            type='checkbox' 
                            id='dayInit' 
                            defaultChecked={checked} 
                            className='mx-3' 
                            onChange={()=>setChecked(!checked)} 
                        />
                        <Label for="dayInit"> Yes I am agree for process of day closing </Label>
                    </FormGroup>
                </Row>
                </Form>
            </Container>
        </CardBody>
    </Card>
    <Modal isOpen={modal} >
        <Form onSubmit={handleSubmit}>
            <ModalHeader>
                <p>Upload Attachments</p>
            </ModalHeader>
            <ModalBody>
                <Row>
                    <FormGroup>
                        <Label>
                            Cashbook
                        </Label>
                        <Input type='file' name='cashbook' onChange={handleFile}/>
                    </FormGroup>
                </Row>
                <Row className='mt-2'>
                    <FormGroup>
                        <Label>
                            Bank Slip
                        </Label>
                        <Input type='file' name='bank_slip' onChange={handleFile}/>
                    </FormGroup>
                </Row>
                <Row className='mt-2'>
                    <FormGroup>
                        <Label>
                            Meeting Photo
                        </Label>
                        <Input type='file' accept='image/*' name='meeting_photo' onChange={handleFile}/>
                    </FormGroup>
                </Row>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-light' onClick={()=>setModal(!modal)}> Close </button>
                <button className='btn btn-success'> Submit </button>
            </ModalFooter>
        </Form>
    </Modal>
    </>
  )
}

export default DayClose