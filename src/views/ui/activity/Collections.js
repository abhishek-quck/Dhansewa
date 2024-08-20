import React, { useEffect, useState } from 'react'
import {  Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

function Collections() {
    const [collections, setCollections] = useState([
        { 
            branch: 'Jacob',
            date: 'Thornton',
            dues : 'Thornton',
            collected: 'Thornton',
            center: 'Thornton',
            client: 'fat',
            DBC: 'fat',
            disb: 'fat',  
        },
        {   
            branch: 'Jacob',
            date: 'Thornton',
            dues : 'Thornton',
            collected: 'Thornton',
            center: 'Thornton',
            client: 'fat',
            DBC: 'fat',
            disb: 'fat' 
        }
    ]);
    useEffect(()=>{

    },[])

    return (
        <Row>
           <Col lg="12">
            <Card>
            <CardHeader>
                <b> BRANCH COLLECTION </b>
            </CardHeader>
            <CardBody className="">
                <Table bordered dashed={''} hover>
                <thead>
                    <tr>
                    <th> S.No </th>
                    <th> Branch Name</th>
                    <th> Date </th>
                    <th> Dues </th>
                    <th> Collected </th>
                    <th> Center </th>
                    <th> Clients </th>
                    <th> DBC </th>
                    <th> DISB </th>
                    <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map( (row,i) => {
                        return (
                            <tr key={i}>
                                <td>{i+1}</td>                    
                                <td>{row.branch}</td>
                                <td>{row.date}</td>
                                <td>{row.dues}</td>
                                <td>{row.collected}</td>
                                <td>{row.center}</td>
                                <td>{row.client}</td>
                                <td>{row.DBC}</td>
                                <td>{row.disb}</td>
                                <td><Button type='button' color='primary'> View Center </Button></td>
                            </tr>
                        )
                    })} 
                </tbody>
                <tfoot>
                   <tr>
                        <td colSpan={2} className='fw-bold'> Total </td>
                        <td>''</td>
                        <td>''</td>
                        <td>''</td>
                        <td>''</td>
                        <td>''</td>
                        <td>''</td>
                        <td>''</td>
                        <td></td>
                    </tr>
                </tfoot>
                </Table>
            </CardBody>
            </Card>
        </Col>
        </Row>
      );
}

export default Collections