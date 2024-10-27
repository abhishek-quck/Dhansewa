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
    const currentDate = getCurrentDate();
    const [totals, setTotals] = useState({ due:0, collected:0, center:0, client:0, DBC:0, disb:0 })
    useEffect(()=>{
        axios.get('get-collections').then(({data})=>{
            setCollections(data)
            if(data.length)
            {
                let totalDue = data.reduce( (acc,item) => acc + parseFloat(item.due), 0 )
                let totalCollected = data.reduce( (acc,item) => acc + item.collected?? 0 , 0 )
                let totalCenter = data.reduce( (acc,item) => acc + item.total_center, 0 )
                let totalClient = data.reduce( (acc,item) => acc + item.total_client, 0 )
                let totalDBC = data.reduce( (acc,item) => acc + item.dbc, 0 )
                let totalDisb = data.reduce( (acc,item) => acc + item.disb, 0 )

                setTotals({...totals, 
                    due:totalDue,
                    collected: totalCollected, 
                    center:totalCenter, 
                    client:totalClient, 
                    dbc:totalDBC, 
                    disb:totalDisb 
                })
                
            }
        }).catch(err=>alert(err.message))
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
                                <td>{row.branch.name}</td>
                                <td>{row.date??currentDate}</td>
                                <td>{row.due??0}</td>
                                <td>{row.collected??0}</td>
                                <td>{row.total_center}</td>
                                <td>{row.total_client}</td>
                                <td>{row.dbc??0}</td>
                                <td>{row.disb??0}</td>
                                <td><Link to={'/view-center-collections/'+row.branch_id} className='btn btn-primary'> View Center </Link></td>
                            </tr>
                        )
                    })} 
                    {collections.length === 0 ? <tr><td colSpan={10}><h6 className='text-center text-danger'>Day not initialized yet!</h6></td> </tr>: null}
                </tbody>
                <tfoot>
                   <tr>
                        <td colSpan={2} className='fw-bold'> </td>
                        <td> <h6 className='float-end'> Total </h6> </td>
                        <td> <h6>{ totals.due+' ₹' }</h6> </td>
                        <td> <h6>{ isNaN(totals.collected) ? 0 : totals.collected }</h6> </td>
                        <td> <h6>{ totals.center }</h6> </td>
                        <td> <h6>{ totals.client }</h6> </td>
                        <td> <h6>{ isNaN(totals.DBC)? 0 : totals.DBC }</h6> </td>
                        <td> <h6>{ isNaN(totals.disb)? 0 : totals.disb }</h6> </td>
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