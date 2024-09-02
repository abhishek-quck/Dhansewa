import $ from 'jquery'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardHeader, CardText, Col, Form, Input, Label, Row, Table } from 'reactstrap';
import { validate } from '../../../helpers/utils';

const BranchMaster = () => {
    const dispatch = useDispatch();
    const [stateCodes , setCodes]= useState([]);
    const [branches, setBranches]= useState([]);
    var initial ={}
    const [fields,setFields] = useState( initial = {
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

    const inputStyle = { fontSize:'14px' }

    const handleChange = e => {
        e.target.style.border=''
        setFields({...fields, [e.target.name]:e.target.value})
    }  

    const handleSubmit = e => {
        e.preventDefault() 
        let {shouldGo, result} = validate(fields,['branch_account','payout_month_and_year','dissolved_date','cash_account','bank_account','branch_account','loan_charge_auto','cash_balance','closing_enabled','reporting_mail','reporting_phone_sms','aadhaar_verify', 'mobile_verify','multi_loan_allowed','spml_allowed','loan_product_id'])
        if(shouldGo===false)
        {
            for (const el in fields) {
                if (result[el]) {
                    $(`input[name=${el}], select[name=${el}], textarea[name=${el}]`).addClass('placeholder-error').attr('placeholder', result[el]).css('border','1px solid red')
                } else {
                    $(`input[name=${el}], select[name=${el}], textarea[name=${el}]`).css('border','')
                    // no border at valid inputs
                }
            }
            toast.error('Fill the required fields!')
            return 
        }
        dispatch({type:'LOADING'})
        axios.post('/create-branch', fields )
        .then(({data})=>{
            toast.success(data.message)
            setFields(initial)
        })
        .catch(err=>{
            console.log(err)
            toast.error('Something went wrong')
        })
        .finally(()=> dispatch({type:'STOP_LOADING'}) ) 
    }

    $('input[name=search]').on('keyup search',function () {
        $('tbody tr').each((i,row) => {
            if(!row.textContent.toLowerCase().includes(this.value?.toLowerCase()))
            {
                $(row).addClass('d-none')   
            } else {
                $(row).removeClass('d-none')   
            }
        });
    });

    useEffect(() => {

        dispatch({ type:'LOADING' })
        axios.get('/get-state-codes') // state
        .then(({data}) => setCodes(data)).catch(err=>err.message)
        axios.get('get-branch-info') // table-fill
        .then(({data}) => setBranches(data)).catch(err=> console.log(err.message))
        .finally(()=> dispatch({ type : 'STOP_LOADING' }));

    },[])

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
                            value={fields.name}
                            style={inputStyle} 
                            type='text' 
                            cast={'str'}
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
                                value={fields.address}
                                placeholder='Enter Address'
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
                            type='text'
                            value={fields.branch_manager_id}
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
                                value={fields.gps_location}
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> State Code</Label>
                        <Input 
                            onChange={handleChange} 
                            name={'state_code'} 
                            style={inputStyle} 
                            type='select'
                            defaultValue={fields.state_code}
                        >
                            <option> Select State-Code </option>
                            {stateCodes.map((option,i)=>{
                                return <option key={i} value={option.value}>{option.label}</option>
                            })}
                        </Input> 
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Branch GST NO <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'branch_gst_num'} 
                                style={inputStyle} 
                                type='text'
                                value={fields.branch_gst_num}
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
                            noreq={'true'}
                            value={fields.payout_month_and_year}
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
                                value={fields.setup_date}
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
                            type='select' 
                            defaultValue={fields.backdate_allowed}
                        >
                            <option> Choose </option>
                            <option value={1}> YES </option>
                            <option value={0}> NO </option>
                        </Input>
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Running Date <small className='text-danger'>*</small> </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'running_date'} 
                                style={inputStyle} 
                                type='date'
                                value={fields.running_date}
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
                            type='date'
                            value={fields.dissolved_date}
                        />
                    </Col> 
                </Row>
                <CardText style={{backgroundColor:'beige',padding:5}}>
                    <b className='text-primary mx-1'> LOAN & PRODUCT SETTINGS </b>
                </CardText>
                <Row className={'mt-2 mb-3'} style={{fontSize:'small'}}>
                    <Col md={4}>
                        <Label> Multi Loan Allowed  </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'multi_loan_allowed'} 
                            style={inputStyle} 
                            type='select'
                            defaultValue={fields.multi_loan_allowed}
                        >
                            <option> Choose </option>
                            <option value={1}> YES </option>
                            <option value={0}> NO </option>
                        </Input> 
                    </Col>
                    <Col md={4}>
                        <Label> SPML Allowed </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'spml_allowed'} 
                            style={inputStyle} 
                            type='select'
                            defaultValue={fields.spml_allowed}
                        >
                            <option> Choose </option>
                            <option value={1}> YES </option>
                            <option value={0}> NO </option>
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
                            value={fields.loan_product_id}
                        />
                    </Col>
                </Row>
                <CardText style={{backgroundColor:'beige',padding:5}}>
                    <b className='text-primary mx-1'> ACCOUNT SETTINGS </b>
                </CardText>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col className='d-flex'>
                        <div>
                            <Label> Bank Account  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'bank_account'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Bank Code'
                                value={fields.bank_account}
                            /> 
                        </div>
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Cash Account  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'cash_account'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Cash Code'
                                value={fields.cash_account}
                            /> 
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2 mb-3'} style={{fontSize:'small'}}>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Branch Account  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'branch_account'} 
                                style={inputStyle} 
                                type='text'
                                placeholder='Branch Code'
                                value={fields.branch_account}
                            /> 
                        </div>
                    </Col>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Loan Charge Auto  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'loan_charge_auto'} 
                                style={inputStyle} 
                                type='select'
                                defaultValue={fields.loan_charge_auto}
                            >
                                <option> Choose </option>
                                <option value={1}> YES </option>
                                <option value={0}> NO </option>
                            </Input> 
                        </div>
                    </Col>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Cash Balance  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'cash_balance'} 
                                style={inputStyle} 
                                type='text'
                                value={fields.cash_balance}
                                placeholder='Current:Cash 0'
                            /> 
                        </div>
                    </Col>
                    <Col md={3} className='d-flex'>
                        <div>
                            <Label> Closing Enable  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'closing_enabled'} 
                                style={inputStyle} 
                                type='select'
                                defaultValue={fields.closing_enabled}
                            >
                                <option> Choose </option>
                                <option value={1}> YES </option>
                                <option value={0}> NO </option>
                            </Input> 
                        </div>
                    </Col>
                </Row>
                <CardText style={{backgroundColor:'beige',padding:5}}>
                    <b className='text-primary mx-1'> NOTIFICATION SETTINGS </b>
                </CardText>
                <Row className={'mt-2'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> Reporting Mail </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'reporting_mail'} 
                            style={inputStyle} 
                            value={fields.reporting_mail}
                            type='text' />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Aadhaar Verify  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'aadhaar_verify'} 
                                style={inputStyle} 
                                type='select'
                                defaultValue={fields.aadhaar_verify}
                            >
                                <option> Choose </option>
                                <option value={1}> YES </option>
                                <option value={0}> NO </option>
                            </Input>
                        </div>
                    </Col>
                </Row>
                <Row className={'mt-2 mb-4'} style={{fontSize:'small'}}>
                    <Col>
                        <Label> Reporting Phone SMS </Label>
                        <Input 
                            onChange={handleChange} 
                            name={'reporting_phone_sms'} 
                            style={inputStyle} 
                            placeholder='Enter phone number'
                            value={fields.reporting_phone_sms}
                            type='text' 
                        />
                    </Col>
                    <Col className='d-flex'>
                        <div>
                            <Label> Mobile Verify  </Label>
                            <Input 
                                onChange={handleChange} 
                                name={'mobile_verify'} 
                                style={inputStyle} 
                                type='select'
                            >
                                <option> Choose </option>
                                <option value={1}> YES </option>
                                <option value={0}> NO </option>
                            </Input>
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
                        name={'search'} 
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
                    { branches.map( branch => {
                        return (
                            <tr key={branch.id}>
                                <td> {branch.id} </td>
                                <td> {branch.name} </td>
                                <td> {branch.running_date} </td>
                                <td> {branch.closing_enabled? 'Yes': 'No'} </td>
                                <td> {branch.cash_balance??0} </td>
                            </tr>
                        )
                    }) }
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