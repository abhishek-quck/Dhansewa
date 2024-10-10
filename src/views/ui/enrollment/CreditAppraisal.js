import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Table, Tooltip } from 'reactstrap';

function CreditAppraisal() {
    
    const dispatch = useDispatch();
    const [clients, setClients] = useState([])
    const [tooltipOpen, setTooltip] = useState(false)

    const toggle = () => setTooltip(!tooltipOpen)
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
                    <i className='ms-2 fa-regular fa-circle-question' id='tooltip' />
                    <Tooltip
                        placement={'right'}
                        isOpen={tooltipOpen}
                        target={'tooltip'}
                        toggle={toggle}
                    >
                        After the enrollment, CGT & GRT is completed!
                    </Tooltip>
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