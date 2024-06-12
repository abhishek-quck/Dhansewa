import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'

function DayClose() {
  return (
    <Card>
        <CardHeader className='bg-secondary text-white'>
            <i className='fa-solid fa-arrow-down'/> &nbsp;
            Day Closing:
        </CardHeader>
        <CardBody>
            <Col>
                <Row>
                    <Label>
                        Branch Name
                        <div className='col-12 d-flex'> 
                            <Input 
                                type='select' 
                                className='col-6'
                                style={{width:'50%'}}
                            >
                                <option value={'benipur'}> Benipur </option>
                            </Input>
                            <Button color="primary">Find</Button>
                        </div>
                    </Label>
                </Row>
                <Row className={`d-flex`}>
                    <div className='form-group'>

                    </div>
                </Row>
            </Col>
        </CardBody>
    </Card>
  )
}

export default DayClose