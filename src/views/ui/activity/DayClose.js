import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { formatDate, getCurrentDay, getCurrentTime } from '../../../helpers/utils';

function DayClose() {

    const [branches, setBranches] = useState([]);
    const [collection, setCollection] = useState([]);
    const [checked, setChecked ]= useState(false);
    const [branchID, setBranch ]= useState('');
    const [branchInfo, setBranchInfo ]=useState({})
    const dispatch = useDispatch();
    const containerStyle = {borderTop:'1px dashed',boxShadow:'-20px 0 10px -5px rgba(0, 0, 0, 0.1)'}

    // Submit Form `day-close`
    const closeDay = e => {

        e.preventDefault()
        dispatch({ type:'LOADING' });
        axios.get('day-close/'+branchID)
        .then(({data}) => toast.success(data.message)).catch( e => toast.error(e.response?.data.message?? 'Something went wrong!'))
        .finally(() => dispatch({type:'STOP_LOADING'}));

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

  return (
    <>
    <Card>
        <CardHeader>
            <i className='fa-solid fa-arrow-down'/> &nbsp;
            <b>Day Closing:</b>
        </CardHeader>
        <CardBody>
            <Col>
                <Row>
                    <Label> Branch Name </Label>
                    <div className='col-12 d-flex'> 
                        <Input 
                            type='select' 
                            onChange={getBranchCollection}
                            style={{width:'30%'}}
                        >
                            <option> Select Branch </option>
                            {branches.map(opt => {
                                return <option key={opt.id} value={opt.id}>{opt.name}</option>
                            })}
                        </Input>
                        <Button color="primary"> <i className='fa fa-search'/> </Button>
                    </div>
                </Row>
                <Row className={`d-flex`}>
                    <div className='form-group'>

                    </div>
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
                                collection.map(item=>{
                                    return (<tr key={item.id}>
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
    </>
  )
}

export default DayClose