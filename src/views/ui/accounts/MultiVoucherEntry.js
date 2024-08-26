import React, { useEffect, useState } from 'react';
import { Card, CardBody,  CardHeader , Col, Form, Input, Label, Row } from 'reactstrap';
import { validate } from '../../../helpers/utils';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

function MultiVoucherEntry() {
    const dispatch = useDispatch()
    const [branches, setBranches] = useState([])
    const [fields, setFields] = useState({
        branch:'',
        date:'',
        type:'',
        narration:'',
        amount:'',
        account:'',
    })
    const change = e => {
        if(e?.target)
        {
            e.target.style.border='' // for removing red border if input me pahle se error tha
            setFields({...fields,[e.target.name]:e.target.value})
        }
    }
    const [errors, setErrors]=useState(fields)

    const handleSubmit = e => {
        e.preventDefault()
        let {result, shouldGo } = validate(fields)
        if(shouldGo===false)
        {
            for (const el in fields) {
                if(result[el])
                {
                    $(`input[name=${el}], textarea[name=${el}], select[name=${el}]`).addClass('placeholder-error').css('border','1px solid red')
                } else {
                    $(`input[name=${el}], textarea[name=${el}], select[name=${el}]`).removeClass('placeholder-error').css('border','')
                }
            }
            setErrors(result)
            return 
        }
        dispatch({type:'LOADING'})
        axios.post('')
        .then(({data})=>{
            console.log(data)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    useEffect(()=>{
        axios.get('get-branches')
		.then(({data})=>{
			setBranches(data)
		})
        return ()=> null
    },[])

    return (
    <>
        <div className='d-flex'>
            <Col md={6}>
                <Form onSubmit={handleSubmit}> 
                <Card>
                    <CardHeader>
                        <div className='d-flex' style={{justifyContent:'space-between'}}>
                        <b> Multi Voucher Entry Gateway </b>
                        <button type='button' className='btn btn-primary'>
                            <i className='fa-regular fa-eye' />&nbsp;
                            Ledger 
                        </button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Date </Label>
                                    <Input 
                                        name="date"
                                        type="date" 
                                        onChange={change}
                                    /> 
                                    
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Branch </Label>
                                    <Input
                                        id="exampleSelectMulti" 
                                        name="branch"
                                        type="select" 
                                        onChange={change}
                                    >
                                        <option> 01- Benipur </option>
                                        {branches.map((opt,i)=>{
                                            return <option key={i} value={opt.id}>{opt.name}</option>
                                        })}
                                    </Input> 
                                    
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Voucher Type </Label>
                                    <Input 
                                        name="type"
                                        type="select" 
                                        onChange={change}
                                    >
                                        <option > --SELECT-- </option>
                                        <option value={`Cash Payment`}> Cash Payment </option>
                                        <option value={`Cash Receipt`}> Cash Receipt </option>
                                        <option value={`Bank Payment`}> Bank Payment </option>
                                        <option value={`Bank Receipt`}> Bank Receipt </option>
                                        <option value={`Contra`}> Contra </option>
                                        <option value={`Journal`}> Journal </option>
                                        <option value={`Suspense`}> Suspense </option>
                                    </Input> 
                                    
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> From (Credit) </Label>
                                    <Input 
                                        name="account"
                                        type="select" 
                                        onChange={change}
                                    >
                                        <option> --SELECT-- </option>
                                        <option value={`credit`}> Credit </option>
                                    </Input>   
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> To (Debit) </Label>
                                    <Input 
                                        name="account"
                                        type="select" 
                                        onChange={change}
                                    >
                                        <option> --SELECT-- </option>
                                        <option value={`credit`}> Credit </option>
                                    </Input>   
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Narration </Label>
                                    <Input 
                                        name="narration"
                                        type="textarea"
                                        placeholder={errors.narration??"Enter Narration"}
                                        onChange={change}
                                    />  
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="exampleEmail"> Amount </Label>
                                    <Input 
                                        name="amount"
                                        type="text"
                                        onChange={change}
                                        placeholder={errors.amount?? "Enter amount "}
                                    />  
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <button type="button" className='btn btn-success w-100'> 
                                + Add Transaction </button>
                            </Col > 
                        </Row> 
                        
                    </CardBody>
                    
                </Card>
                </Form>
            </Col> 
        </div>
        <div className='mt-4'>
            <div className='resultArea' />
        </div>
    </>
    )
}

export default MultiVoucherEntry