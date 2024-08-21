import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap'
import { formatDate, getCurrentDate, getCurrentDay } from '../../../helpers/utils'

function CenterCollection() {
    let {branch_id} = useParams()
    const [branch, setBranchDetail] = useState({})
    const [centers, setCenters] = useState([])
    const headStyle = {fontFamily:'math',fontSize:15}
    useEffect(()=>{
        axios.get('get-branches/'+branch_id).then(({data})=>setBranchDetail(data)).catch(err=>console.log(err))
        axios.get('get-branch-centers/'+branch_id).then(({data})=>{
            setCenters(data)
        })
        return ()=>null;
    },[])

    return (
        <>  
            <div className='container'>
                <Card>
                    <CardHeader>
                        {branch.name}   <b> {formatDate(getCurrentDate(),'dmY') +' - '+ getCurrentDay()} </b>
                    </CardHeader>
                    <CardBody>
                        <Row style={{borderBottom:'1px dashed black'}}>
                            <h3 style={{fontFamily:'math'}}> Center Collection </h3>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={3}>
                                <Label for="filter"> Filter </Label>
                                <div className='d-flex'>
                                    <Input id='filter' type='text' placeholder='Search...'/>
                                    <Button className='bg-danger'><i className='fa fa-filter'/></Button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>        
            </div>
            <div className='container mt-3'>
                <Card>
                    <CardBody>
                        <Table hover striped bordered>
                            <thead>
                                <tr>
                                    <th style={headStyle} colSpan={4} className='text-center'> CENTER INFO  </th>
                                    <th style={headStyle} colSpan={7} className='text-center'> TODAY COLLECTION </th>
                                    <th style={headStyle} colSpan={2} className='text-center'> ALERT </th>
                                </tr>
                                <tr>
                                    <th>:</th>
                                    <th>Center No.</th>
                                    <th>Center Name</th>
                                    <th>Staff Name</th>
                                    <th>PR.Due</th>
                                    <th>PR.COLTD</th>
                                    <th>INT DUE</th>
                                    <th>INT COLTD</th>
                                    <th>TOTAL DUE</th>
                                    <th>OTH COLTD</th>
                                    <th>T.COLTD</th>
                                    <th>STL</th>
                                    <th>T.ARR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {centers.map( item => {
                                    return (
                                        <tr key={item.id}>
                                            <td><Button color='primary'>View</Button></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.name} </span></td>
                                            <td><span> {item.staff} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default CenterCollection