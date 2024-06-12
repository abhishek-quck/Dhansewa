import React from 'react'
import { Card, CardBody, CardHeader, Container, Table } from 'reactstrap'

function TrialBalance() {
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
                        <tr>
                            <td>1</td>
                            <td> Captial Accounts </td>
                            <td> Equity fund </td>
                            <td> Lalit </td>
                            <td> 0 </td>
                            <td> 8100000 </td>
                        </tr>
                    </tbody>
                </Table> 
            </CardBody>
        </Card>  
    </Container> 
  )
}

export default TrialBalance