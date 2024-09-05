import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';

function CreditAppraisal() {
    
    const dispatch = useDispatch();
    const [clients, setClients] = useState([])

    useEffect(()=>{
        
        dispatch({ type: 'LOADING' })       
        axios.get('get-clients-for-appraisal')
        .then(({data}) => setClients(data) ).catch()
        .finally(()=> dispatch({ type:'STOP_LOADING' }))

    },[dispatch]);

    return (
        <>
            <Card>
                <CardHeader>
                    <b> CREDIT APPRAISAL </b>
                </CardHeader>
                <CardBody>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>ID</th>
                                <th>Applicant Name</th>
                                <th>Branch</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map( (client,i)=> {
                                return (
                                    <tr key={i}>
                                        <td>{++i}</td>
                                        <td>{client.id}</td>
                                        <td>{client.applicant_name}</td>
                                        <td>{client.branch_name}</td>
                                        <td>
                                            <Link to={'/manage-client/'+client.id} className='text-decoration-none text-primary'>
                                                Manage
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            } )}
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        </>
    )
}

export default CreditAppraisal