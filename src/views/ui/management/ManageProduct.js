import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, CardHeader,  Col, Container, Form, Input, Label, Row } from 'reactstrap';
import { validate } from '../../../helpers/utils'

function ManageProduct() {
    const dispatch = useDispatch()
    const [fields, setFields] = useState({
        name:'',
        installments:'',
        product_type:'',
        emi_frequency:'',
        intro_date:'',
        flat_rate:'', 
        gst_tax:'',
        risk_fund:'',
        up_front_fee:'',
        linked_ac_number:'',
        cb_check:'',
        reducing_rate:'',
        category:'',
        repay_pattern:'',
        month_tenure:'',
        year_tenure:'',
        removal_date:'',
        comments:'',
    })
    const [errors, setErrors] = useState([])
    const change= e => {
        if(e.target)
        {
            e.target.style.border=''
            setFields({...fields, [e.target.name]:e.target.value})
        }
    }
    const {id} = useParams();
    const handleSubmit = e => {
        e.preventDefault()
        const {shouldGo, result} = validate(fields,['reducing'])
        if(shouldGo===false)
        {
            console.log(result)
            toast.error('Fill the required fields')
            setErrors(result)
            return 
        }
        dispatch({type:'LOADING'})
        axios.post('manage-product/'+id, fields)
        .then(({data})=>{
            toast.success(data.message)
        })
        .catch(err=>toast.error(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    useEffect(()=>{
        if(id)
        {
            axios.get('get-loan-products/'+id).then(({data})=>{
                console.log(data)
                setFields(data)
            })
            .finally(()=>{
                dispatch({type:'STOP_LOADING'})
            })
        } 
    },[])
    return (
    <div>
        <Card>
            <Form onSubmit={handleSubmit}>  
            <CardHeader>
                <b>Product Information </b>
            </CardHeader>
            <CardBody>
                    <Row>
                    <Col xxl="6">
                        <Container className='mt-4'> 
                        {id && <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="id">Product ID</Label>
                                    <Input
                                        id="id" 
                                        name="id"
                                        type="text"
                                        onChange={change}
                                        defaultValue={id}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>}
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="name"> Product Name</Label>
                                    <Input
                                        id="name" 
                                        name="name"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.name}
                                        placeholder="Enter product name"
                                        style={{border:errors.name ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="installments">Total Installments</Label>
                                    <Input
                                        id="installments" 
                                        name="installments"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.installments}
                                        placeholder="0"
                                        style={{border:errors.installments ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="product_type"> Product Type </Label>
                                    <Input
                                        id="product_type" 
                                        name="product_type"
                                        type="select"
                                        onChange={change}
                                        value={fields.product_type}
                                        style={{border:errors.product_type ?'1px solid red':''}}
                                    >
                                        <option></option>
                                        <option value={'amount'}>AMOUNT</option>
                                    </Input> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="emi_frequency"> EMI Frequency</Label>
                                    <Input
                                        id="emi_frequency" 
                                        name="emi_frequency"
                                        type="select"
                                        onChange={change}
                                        value={fields.emi_frequency}
                                        style={{border:errors.emi_frequency ?'1px solid red':''}}
                                    >
                                        <option>  </option>
                                        <option value={'daily'}> Daily </option>
                                    </Input>
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="intro_date"> Intro Date </Label>
                                    <Input
                                        id="intro_date" 
                                        name="intro_date"
                                        type="date"
                                        onChange={change}
                                        defaultValue={fields.intro_date}
                                        style={{border:errors.intro_date ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="flat_rate"> Flat Rate </Label>
                                    <Input
                                        id="flat_rate" 
                                        name="flat_rate"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.flat_rate}
                                        placeholder="0"
                                        style={{border:errors.flat_rate ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="reducing_rate"> Reducing Rate </Label>
                                    <Input
                                        id="reducing_rate" 
                                        name="reducing_rate"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.reducing_rate}
                                        style={{border:errors.reducing_rate ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="up_front_fee"> Up Front Fees </Label>
                                    <Input
                                        id="up_front_fee" 
                                        name="up_front_fee"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.up_front_fee}
                                        style={{border:errors.up_front_fee ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                        
                        </Container>
                    </Col>
                    <Col xxl="6">
                    <Container > 
                            <Row className=" ">
                                <Col md="12" className='mt-4'>
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="risk_fund"> Risk Fund </Label>
                                    <Input
                                        id="risk_fund" 
                                        name="risk_fund"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.risk_fund}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="gst_tax"> GST Tax </Label>
                                    <Input
                                        id="gst_tax" 
                                        name="gst_tax"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.gst_tax}
                                        placeholder="0"
                                        style={{border:errors.gst_tax ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="linked_ac_number"> Link A/C Number </Label>
                                    <Input
                                        id="linked_ac_number" 
                                        name="linked_ac_number"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.linked_ac_number}
                                        placeholder="0"
                                        style={{border:errors.linked_ac_number ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="category"> Product Category </Label>
                                    <Input
                                        id="category" 
                                        name="category"
                                        type="select"
                                        onChange={change}
                                        value={fields.category}
                                        style={{border:errors.category ?'1px solid red':''}}
                                    >
                                        <option></option>
                                        <option value={'Group Loan'}> GROUP LOAN </option>
                                    </Input> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="repay_pattern"> Repay Pattern </Label>
                                    <Input
                                        id="repay_pattern" 
                                        name="repay_pattern"
                                        type="select"
                                        onChange={change}
                                        value={fields.repay_pattern}
                                        style={{border:errors.repay_pattern ?'1px solid red':''}}
                                    >
                                        <option></option>
                                        <option value={'Group Loan'}> LOAN CHART </option>
                                    </Input> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="cb_check"> CB Check </Label>
                                    <Input
                                        id="cb_check" 
                                        name="cb_check"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.cb_check}
                                        style={{border:errors.cb_check ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="month_tenure"> Month Tenure </Label>
                                    <Input
                                        id="month_tenure" 
                                        name="month_tenure"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.month_tenure}
                                        placeholder="0"
                                        style={{border:errors.month_tenure ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="year_tenure"> Year Tenure </Label>
                                    <Input
                                        id="year_tenure" 
                                        name="year_tenure"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.year_tenure}
                                        style={{border:errors.year_tenure ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="removal_date"> Removal Date </Label>
                                    <Input
                                        id="removal_date" 
                                        name="removal_date"
                                        type="date"
                                        onChange={change}
                                        defaultValue={fields.removal_date}
                                        style={{border:errors.removal_date ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                            <Row className="mt-2">
                                <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="comments"> Comments </Label>
                                    <Input
                                        id="comments" 
                                        name="comments"
                                        type="text"
                                        onChange={change}
                                        defaultValue={fields.comments}
                                        style={{border:errors.comments ?'1px solid red':''}}
                                    /> 
                                        
                                </div>
                                </Col > 
                            </Row>
                        
                        </Container>
                    </Col>
                    </Row>
            </CardBody>
            <CardFooter style={{borderTop:'1px solid gray'}}>
                {id  ? (
                    <Row>
                        <Col className='mx-3'>
                            <Button color='primary' type='submit' className=''> Update </Button>                        
                            <Button color='danger' type='submit' className='mx-3'> Delete </Button>                        
                        </Col> 
                    </Row>
                ):(
                    <Row>
                        <Col className='mx-3'>
                            <Button color='success' type='submit' > Create </Button>                        
                        </Col> 
                    </Row>
                )}
            </CardFooter>
            </Form>
        </Card>
    </div>
    )
}

export default ManageProduct