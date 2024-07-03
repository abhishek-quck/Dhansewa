import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'

function LoanProducts() {
  return (
    <Card>
        <CardHeader className=''>
            <i className='fa-solid fa-arrow-down'/> &nbsp;
            <b>LOAN PRODUCTS:</b>
        </CardHeader>
        <CardBody>
            <Col>
                <Row>
                    <Label>
                        Search Name
                        <div className='col-12 d-flex'> 
                            <Input 
                                type='text' 
                                className='col-6'
                                style={{width:'50%'}}
                                placeholder='Search Products'
                            />
                            <Button color="primary">
								<i className='fa fa-search'/>
							</Button>
                        </div>
                    </Label>
                </Row>
                <Col className={`d-flex`}>
                    <table className='table table-bordered hover'>
                        <thead>
                            <tr>
                                <th> S.No </th>
                                <th> Intro Date </th>
                                <th> Removal Date </th>
                                <th> Name </th>
                                <th> Frequency </th>
                                <th> Flat % </th>
                                <th> Reducing % </th>
                                <th> Installments </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> 1 </td>
                                <td> 15-06-2022 </td>
                                <td>  </td>
                                <td> IGL Weekly 12 EMI </td>
                                <td> 7 </td>
                                <td> 0 </td>
                                <td> 0 </td>
                                <td> 12 </td>
                                <td> 
                                    <i className='fa-regular fa-edit'></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </Col>
        </CardBody>
    </Card>
  )
}

export default LoanProducts