import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap'

function LoanChartMaster() {
  return (
    <>
      <Row>
        <Col md={4}>
          <Card>
            <CardHeader>
              Products
            </CardHeader>
            <CardBody>
              <Table bordered hover style={{fontSize:'small'}}>
                <thead className='bg-blue'>
                  <tr> 
                    <th> Product </th>
                    <th> ID </th>
                    <th> Loan </th> 
                    <th> EMI </th>
                    <th> Terms </th>
                  </tr>
                </thead>
                <tbody> 
                </tbody>
              </Table> 
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <CardHeader>
              WIR Setting (<Link className='text-decoration-none'>Download maker</Link>)
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Label>Product Name</Label>
                  <Input type='select' />
                </Col>
                <Col className='d-flex'>
                  <div>
                    <Label> Loan Amount <small className='text-danger'>*</small> </Label>
                    <Input 
                      type='text'
                      placeholder='Enter Loan Amount'
                    /> 
                  </div>
                  <button className='btn btn-primary h-50 ' style={{marginTop:'33px'}}>OK</button>
                </Col>
              </Row>
              <Row className='mt-3' style={{display:'flex',justifyContent:'space-between'}}>
                <Col>
                    <button className="btn btn-success"> Bulk Save </button>
                </Col>
                <Col>
                    <button className="btn btn-danger"> Bulk Delete </button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default LoanChartMaster