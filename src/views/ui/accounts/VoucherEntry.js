import React, { useEffect, useState } from 'react'
import { Card, CardBody,  CardHeader , Col, Form, Input, Label, Row } from 'reactstrap'
import { validate } from '../../../helpers/utils'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import toast from 'react-hot-toast';

function VoucherEntry() {
    const dispatch = useDispatch()
    const [branches, setBranches] = useState([])
    const [fields, setFields] = useState({
        branch:'',
        date:'',
        type:'',
        narration:'',
        credit:'',
        debit:'',
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
            setErrors(result)
            return toast.error('Fill the required fields!') 
        }
        dispatch({ type:'LOADING' })
        axios.post('/add-voucher', fields)
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
                        <b> Voucher Entry Gateway </b>
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
                                    <Label className="col-4"  size={'sm'} for="date"> Date </Label>
                                    <Input 
                                        name="date"
                                        id="date"
                                        type="date" 
                                        onChange={change}
                                    /> 
                                </div>
                            </Col > 
                        </Row> 
                        <Row className='mt-3' >
                            <Col md="12">
                                <div className="d-flex">
                                    <Label className="col-4"  size={'sm'} for="branch"> Branch </Label>
                                    <Input
                                        id="branch" 
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
                                    <Label className="col-4"  size={'sm'} for="voucher_type"> Voucher Type </Label>
                                    <Input 
                                        id='voucher_type'
                                        name="type"
                                        type="select" 
                                        onChange={change}
                                        defaultValue={fields.voucher_type}
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
                                    <Label className="col-4"  size={'sm'} for="credit"> From (Credit) </Label>
                                    <Input 
                                        name="account"
                                        id="credit"
                                        type="select" 
                                        defaultValue={fields.credit}
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
                                    <Label className="col-4"  size={'sm'} for="debit"> To (Debit) </Label>
                                    <Input 
                                        id="debit"
                                        name="account"
                                        type="select" 
                                        defaultValue={fields.debit}
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
                                    <Label className="col-4"  size={'sm'} for="narration"> Narration </Label>
                                    <Input 
                                        id="narration"
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
                                    <Label className="col-4"  size={'sm'} for="amount"> Amount </Label>
                                    <Input 
                                        id="amount"
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
                                <button className='btn btn-success w-100' type='submit'> 
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

export default VoucherEntry