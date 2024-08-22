import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { getCurrentDate } from '../../../helpers/utils';

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
    const currentDate = getCurrentDate()
    useEffect(()=>{
        axios.get('collections').then(({data})=>{setCollections(data)}).catch(err=>alert(err.message))
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
                                <td>{row.name}</td>
                                <td>{row.date??currentDate}</td>
                                <td>{row.dues??0}</td>
                                <td>{row.collected??0}</td>
                                <td>{row.centers_count}</td>
                                <td>{row.clients_count}</td>
                                <td>{row.DBC??0}</td>
                                <td>{row.disb??0}</td>
                                <td><Link to={'/view-center-collections/'+row.id} className='btn btn-primary'> View Center </Link></td>
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