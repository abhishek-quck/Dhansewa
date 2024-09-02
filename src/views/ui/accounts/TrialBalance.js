import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardHeader, Container, Table } from 'reactstrap'

function TrialBalance() {

    const dispatch = useDispatch();
    const [balances, setBalance] = useState([]);

    useEffect(()=>{

        dispatch({ type:"LOADING" })
        axios.get('trial-balance').then(({data}) => setBalance(data))
        .catch(err=>console.log(err.message)).finally(()=> dispatch({ type:"STOP_LOADING" }));

    },[]);
    
    return (
    <Container>
        <Card>
            <CardHeader>
                Trial Balance ( <em> Till Date </em>) 
                <button style={{float:'right'}} className='btn btn-primary'>
                    <i className='fa-solid fa-download' /> Export 
                </button>
            </CardHeader>
            <CardBody>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th> Group Name </th>
                            <th> Head Name </th>
                            <th> Account Name </th>
                            <th> Balance(DR) </th>
                            <th> Balance(CR) </th> 
                        </tr>
                    </thead>
                    <tbody>
                        {balances.map( bal => {
                            return (<tr key={bal.id}>
                                <td>{bal.id}</td>
                                <td> {bal.group_name} </td>
                                <td> {bal.head_name} </td>
                                <td> {bal.account_name} </td>
                                <td> {0} </td>
                                <td> {bal.cr_amount} </td>
                            </tr>)})
                        }
                    </tbody>
                </Table> 
            </CardBody>
        </Card>  
    </Container> 
    )
}

export default TrialBalance