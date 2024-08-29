import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Row, Table } from 'reactstrap'

function DayClose() {
    const [branches, setBranches] = useState([]);
    const [collection, setCollection] = useState([]);
    const dispatch = useDispatch();

    const getBranchCollection = e => {
        const branchId = e.target.value;
        dispatch({type:'LOADING'});
        axios.get('get-branch-collection/'+branchId)
        .then(({data})=>{ setCollection(data) }).catch(err=>console.log(err.message)).finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    useEffect(()=>{
        axios.get('get-branches').then(({data})=>setBranches(data)).catch()
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
                    <div className='text-primary'>
                        <b> TODAY COLLECTION </b>
                    </div>
                    <Table striped hover bordered>
                        <thead>
                            <tr>
                                <th> Num Clients </th>
                                <th> Due </th>
                                <th> Total </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                collection.map(item=>{
                                    return (<tr key={item.id}>
                                        <td>{item.total_client}</td>
                                        <td>{item.due_amount}</td>
                                        <td>{item.total_client}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </CardBody>
    </Card>
    <Card>
        <CardBody>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className='text-primary'>
                            <b> Process for Day closing </b>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p> Day closing is process of submit all collection report and disbursement report to the system records. </p>
                    </Col>
                    <Col md={6}>
                        <button className='btn btn-primary' style={{float:'right'}}> Day close now </button>
                    </Col>
                </Row>
            </Container>
        </CardBody>
    </Card>
    </>
  )
}

export default DayClose