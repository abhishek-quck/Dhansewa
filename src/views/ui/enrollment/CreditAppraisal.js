import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';

function CreditAppraisal() {
    
    let initial = {};
    const [fields, setFields]   = useState(initial);
    const [clients, setClients] = useState([])

    useEffect(()=>{
        
        axios.get('get-clients-for-appraisal')
        .then(({data}) => {
            console.log(data);
            setClients(data)
        }).catch()

    },[]);

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