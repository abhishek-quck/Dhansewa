import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardBody, CardHeader, CardText, Col, Form, Input, Label, Row, Table } from 'reactstrap'

const BranchMaster = () => {
    const dispatch = useDispatch()

    const [fields,setFields] = useState({
        name:'',
        address:'',
        branch_manager_id:'',
        gps_location:'',
        state_code:'',
        branch_gst_num:'',
        payout_month_and_year:'',
        setup_date:'',
        backdate_allowed:'',
        running_date:'',
        dissolved_date:'',
        multi_loan_allowed:'',
        spml_allowed:'',
        loan_product_id:'',
        bank_account:'',
        cash_account:'',
        branch_account:'',
        loan_charge_auto:'',
        cash_balance:'',
        closing_enabled:'',
        reporting_mail:'',
        aadhaar_verify:'',
        reporting_phone_sms:'',
        mobile_verify:'',
    })

    const inputStyle = {
        fontSize:'14px'
    }

    const handleChange = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }  

    const handleSubmit = e => {
        e.preventDefault() 
        dispatch({type:'LOADING'})

        axios.post('/create-branch', fields )
        .then(({data})=>{
            console.log(data);
        })
        .finally(()=>{
            dispatch({type:'STOP_LOADING'})
        }) 
    }

    useEffect(()=>{},[])

    return (
        <>
      <Row>
      <Col md={6}>
          <Card>
            <Form onSubmit={handleSubmit}>
                <CardHeader>
                    <b> BRANCH INFORMATION </b>
                </CardHeader>
                <CardBody>
                <Row style={{fontSize:'small'}}>
                    <Col>
                        <Label> Branch Name</Label>
                        <Input 
                            onChange={handleChange}
                            name={'name'} 
                            style={inputStyle} 
                            type='select' 
                        />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Address <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'address'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Enter Loan Amount'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> BM ID </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'branch_manager_id'} 
                            style={inputStyle} 
                            type='select'
                        />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> GPS Location <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'gps_location'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Enter Loan Amount'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> State Code</Label>
                        <Input onChange={handleChange} name={'state_code'} style={inputStyle} type='select' />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Branch GST NO <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'branch_gst_num'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Enter Loan Amount'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> Payout Month & Year </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'payout_month_and_year'} 
                            style={inputStyle} 
                            type='date' 
                        />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Setup Date <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'setup_date'} 
                                style={inputStyle} 
                                type='date'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> Back Date Allowed </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'backdate_allowed'} 
                            style={inputStyle} 
                            type='date' 
                        />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Running Date <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'running_date'} 
                                style={inputStyle} 
                                type='date'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2 mb-4'} style={{fontSize:'small'}}>
                    <Col md={6}>
                        <Label> Dissolved Date </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'dissolved_date'} 
                            style={inputStyle} 
                            type='date' />
                    </Col> 
                </Row>
                <CardText style={{backgroundColor:'beige',padding:5}}>
                    <b className='text-primary mx-1'> LOAN & PRODUCT SETTINGS </b>
                </CardText>
                <Row className={'mt-2 mb-3'} style={{fontSize:'small'}}>
                    <Col md={4}>
                        <Label> Multi Loan Allowed <small className='text-danger'>*</small> </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'multi_loan_allowed'} 
                            style={inputStyle} 
                            type='select'
                        >
                            <option value={'yes'}> Yes </option>
                            <option value={'no'}> No </option>
                        </Input> 
                    </Col>
                    <Col md={4}>
                        <Label> SPML Allowed <small className='text-danger'>*</small> </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'spml_allowed'} 
                            style={inputStyle} 
                            type='select'
                        >
                            <option value={'yes'}> Yes </option>
                            <option value={'no'}> No </option>
                        </Input> 
                    </Col>
                    <Col md={4}>
                        <Label> Loan Product ID Allowed </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'loan_product_id'} 
                            style={inputStyle} 
                            type='text' 
                            placeholder='Enter Product No. in 2 digits'
                        />
                    </Col>
                </Row>
                <CardText style={{backgroundColor:'beige',padding:5}}>
                    <b className='text-primary mx-1'> ACCOUNT SETTINGS </b>
                </CardText>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col className='d-flex'>
                        <div>
                            <Label> Bank Account <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'bank_account'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Bank Code'
                            /> 
                        </div>
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Cash Account <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'cash_account'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Cash Code'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2 mb-3'} style={{fontSize:'small'}}>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Branch Account <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'branch_account'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Branch Code'
                            /> 
                        </div>
                    </Col>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Loan Charge Auto <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'loan_charge_auto'} 
                                style={inputStyle} 
                                type='select'
                            >
                                <option value={'yes'}> YES </option>
                                <option value={'no'}> NO </option>
                            </Input> 
                        </div>
                    </Col>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Cash Balance <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'cash_balance'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Current:Cash 0'
                            /> 
                        </div>
                    </Col>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Closing Enable <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'closing_enabled'} 
                                style={inputStyle} 
                                type='select'
                            >
                                <option value={'yes'}> YES </option>
                                <option value={'no'}> NO </option>
                            </Input> 
                        </div>
                    </Col>
                </Row>
                <CardText style={{backgroundColor:'beige',padding:5}}>
                    <b className='text-primary mx-1'> NOTIFICATION SETTINGS </b>
                </CardText>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> Reporting Mail <small className='text-danger'>*</small></Label>
                        <Input 
                            onChange={handleChange} 
                            name={'reporting_mail'} 
                            style={inputStyle} 
                            type='date' />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Aadhaar Verify <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'aadhaar_verify'} 
                                style={inputStyle} 
                                type='date'
                            />
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2 mb-4'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> Reporting Phone SMS <small className='text-danger'>*</small></Label>
                        <Input 
                            onChange={handleChange} 
                            name={'reporting_phone_sms'} 
                            style={inputStyle} 
                            type='date' 
                        />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Mobile Verify <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'name'} 
                                style={inputStyle} 
                                type='date'
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="btn btn-success w-100"> CREATE </button>
                    </Col>
                </Row>
                </CardBody>
            </Form>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardHeader>
                <div className='d-flex'>
                    <Input 
                        onChange={handleChange} 
                        name={'mobile_verify'} 
                        style={{...inputStyle,border:'1px solid'}} 
                        type='text'
                        placeholder='Search By Name..'
                    />
                    <button className='btn btn-sm btn-primary'>
                        <i className='fa fa-search' />
                    </button>
                </div>
            </CardHeader>
            <CardBody>
              <Table bordered hover style={{fontSize:'small'}}>
                <thead className='bg-blue'>
                  <tr> 
                    <th> Branch ID  </th>
                    <th> Branch Name </th>
                    <th> Running Date </th> 
                    <th> Closing Enabled </th>
                    <th> OB Balance </th>
                  </tr>
                </thead>
                <tbody> 
                </tbody>
              </Table> 
            </CardBody>
          </Card>
        </Col> 
      </Row>
    </> 
    )
}

export default BranchMaster