import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'

function DayClose() {
    const [branches, setBranches] = useState([])
    useEffect(()=>{
        axios.get('get-branches').then(({data})=>setBranches(data)).catch()
    },[])
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
                                {branches.map(opt => {
                                    return <option key={opt.id} value={opt.id}>{opt.name}</option>
                                })}
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