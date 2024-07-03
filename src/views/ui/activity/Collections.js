import React from 'react'
import {  Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

function Collections() {

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