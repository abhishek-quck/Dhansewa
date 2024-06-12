import React, { useEffect, useRef } from 'react'
import $ from 'jquery'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'

function ArrearCollection(){
 // eslint-disable-next-line
  const getInfo = () => {}
  const branchRef = useRef(null)
  useEffect(()=>{
    console.log(branchRef.current);
    [...document.getElementsByTagName('select')].forEach(element => {         
        $(element).select2({
            placeholder:'Select an option',
            width:'100%'
        })
    });
  },[])
  return (
    <>
    <Card> 
        <CardBody>
            <Col>
                <Row className='d-flex'>
                    <Col md={8} >
                        <Col md={4}>
                        <Row className='d-flex'> 
                            <Col>
                                <Card color='light'>
                                    <CardHeader>
                                        <CardTitle> ARREAR ENTRY </CardTitle>
                                    </CardHeader>
                                    <CardBody> 
                                    <Row>
                                        <Label for='branch'> Branches </Label>
                                        <Input
                                            type='select'
                                            bsSize={'sm'}
                                            style={{width:'80%',marginLeft:'8%'}}
                                            ref={branchRef}
                                            id='branch'
                                        >
                                            <option> All </option>
                                            <option value={'benipur'}> 01-Benipur </option>
                                            <option value={'madhubani'}> 02-Madhubani </option>
                                        </Input>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Label> Select Centers </Label>
                                        <Input
                                            type='select'
                                            bsSize={'sm'}
                                            style={{width:'80%',marginLeft:'8%'}}
                                        >
                                        </Input>
                                    </Row>
                                    <Row className='mt-2'>
                                        <Label> Search Clients </Label>
                                        <Input
                                            type='select'
                                            bsSize={'sm'}
                                            style={{width:'80%',marginLeft:'8%'}}
                                        >
                                        </Input>
                                    </Row>
                                    </CardBody>
                                </Card>
                            </Col> 
                        </Row> 
                        </Col>
                    </Col>
                    <Col md={4} >
                        <Card> 
                            <CardBody  > 
                              <Col>
                                <Row><Button color='primary' className=''> Center Profile </Button> </Row>
                                <Row><Button color='primary' className='mt-1'> Google Location </Button> </Row>
                                <Row><Button color='primary' className='mt-1'> View Ledger </Button> </Row>
                                <Row><Button color='success' className='mt-1'> Update Collection </Button> </Row>
                                <Row><Button color='warning' className='mt-1'> Skip Collection </Button> </Row>
                              </Col>
                            </CardBody>
                        </Card>
                    
                    </Col>
                </Row>
            </Col>
        </CardBody>
    </Card>
    </>
  )
}

export default ArrearCollection