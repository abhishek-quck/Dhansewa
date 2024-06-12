import React from 'react'
import {  Card, CardBody, CardTitle, Col, Row, Table } from 'reactstrap';

function Collections() {

    return (
        <Row>
           <Col lg="12">
            <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                BRANCH COLLECTION
            </CardTitle>
            <CardBody className="">
                <Table bordered hover>
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
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>Thornton</td>
                    <td>Thornton</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                    </tr> 
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
                </tbody>
                </Table>
            </CardBody>
            </Card>
        </Col>
        </Row>
      );
}

export default Collections