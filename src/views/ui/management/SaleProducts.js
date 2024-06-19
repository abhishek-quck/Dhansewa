import React from 'react' 
import { Button, Card, CardBody, CardTitle, Col, Row, Table } from 'reactstrap'

function SaleProducts() {

  return (
    <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 d-flex" >
          <p style={{padding:"3px"}}> Cross Sale Product </p> 
        </CardTitle>
        <CardBody className="">
            <Row>
                <Col>
                    <Table bordered hover style={{fontSize:'small'}}>
                        <thead>
                            <tr>
                                <th> CATEGORY </th>
                                <th> SALE PRODUCT NAME </th>
                                <th> DESCRIPTION </th>
                                <th> STATUS </th>
                                <th> ACTION </th>
                            </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Button color='primary' className='btn'> SAVE </Button>
                </Col>
            </Row>
          <div className="mt-3" id="resultArea">  
          </div>
        </CardBody>
      </Card>
  )
}

export default SaleProducts