import React, { useEffect, useRef, useState } from "react"; 
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Row, Col, CardFooter, CardHeader, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import $ from 'jquery'
import { useDispatch, useSelector } from "react-redux";
import { formatDate, getCurrentDate, validate } from "../../../helpers/utils";
import { Link } from "react-router-dom";
 
const SpeedLoanDisburse = () => { 

    const dispatch = useDispatch()
    const clientRef = useRef(null)
    const [date, setDate]             = useState('');
    const [meetingDay, setMeetingDay] = useState('');
    const [centers, setCenters]       = useState([]);
    const [clients, setClients]       = useState([]);
    const [funders, setFunders]       = useState([{value:'',label:''}]);
    const [loanAmount, setLoanAmount] = useState('')
	const [branches, setBranches]     = useState([])
    const [submitted]     = useState(false)
    const [loanProductOptions, setLoanProducts]= useState([])
    const { loanProducts } = useSelector( state => state.auth )
    
    const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    const [fields, setFields] = useState({
        loan_date:getCurrentDate(),
        loan_product:'',
        loan_amount:'',
        loan_fee:'',
        funding_by:'',
        policy:'',
        insurance_fee:'',
        gst:'',
        utilization:'',
        first_installment:'',
        number_of_emis:'',
        payment_mode:'',
        self_income:0,
        husband_income:0,
        other_income:0,
        direct_income:0,
        total_income:0,
        business_expense:0,
        household_expense:0,
        loan_installment:'',
        total_expense:0, 
    });
    const [sFields, setSearchField] = useState({
        branch:'',
        center:'',
        enroll_id:'',
        loan_id:''
    });
    const [errors, setErrors] = useState({...fields, ...sFields})

    const paymentOptions = [
        {value:'Cash',label:'Cash'},
        {value:'Banking',label:'Banking'}
    ];

    const inputChange = e => {
        if(e.target) {
            e.target.style.border = ''
            setFields({...fields, [e.target.name]:e.target.value})
        }
        
        if(['self_income','husband_income','other_income','business_expense', 'household_expense'].includes(e.target.name)) {
            let currentValue = document.querySelector(`input[name="${e.target.name}"]`).value
            let self = document.querySelector('input[name="self_income"]').value ?? 0
            let other = document.querySelector('input[name="other_income"]').value ?? 0
            let husband = document.querySelector('input[name="husband_income"]').value ?? 0
            let sum = parseInt(self) + parseInt(other) + parseInt(husband)

            document.querySelector('input[name="total_income"]').value = sum

            let business = document.querySelector('input[name="business_expense"]').value
            let household = document.querySelector('input[name="household_expense"]').value

            let totalExpense = parseInt(business) + parseInt(household)

            let direct = sum - totalExpense
            document.querySelector('input[name="total_expense"]').value = totalExpense
            document.querySelector('input[name="direct_income"]').value = direct

            setFields({...fields, [e.target.name]:currentValue, total_income: sum , total_expense:totalExpense , direct_income: direct })
        }
    }

    const getProductInfo = id => {

        let data = loanProducts[id]
            setLoanAmount({value:data.amount, label:data.amount})
            setFields({...fields, 
                gst:data.gst_tax, 
                loan_amount:data.amount,
                loan_product:id
            })

    }
    const loanProductRef = useRef(null)

    const init = () => { // GEt Branches, Centers , loan-products & client info

        dispatch({ type:'LOADING' })
        axios.get('get-options') 
        .then(({data}) => 
        {  
            if(data.branches) setBranches(data.branches)  
            
            if(!Object.keys(loanProducts).length) {
                axios.get('get-product-details').then(({data})=> {
                    let loanProducts = {}
                    data.forEach( _ => {
                        loanProducts[_.id] = _
                    });
                    dispatch({
                        type:'SET_LOAN_PRODUCTS',
                        payload:loanProducts
                    })
                }).catch(e=> {})
            }
            axios.get('funders').then(({data})=> setFunders(data.map( item => ({value:item.id, label: item.name})) )).catch(e => console.log(e))

        })
        .catch(e => dispatch({ type:'ERROR', payload: {code:e.response.status, error:e.message }}))
        .finally(() => dispatch({ type:'STOP_LOADING' }))
        axios.get('/loan-products-options')
        .then(({data})=> setLoanProducts(data) ).catch(e => dispatch({ 
            type:'ERROR', 
            payload: {code:e.response.status, error:e.message }
        }))
    }

    const updateBranch = (e) => {

        clientRef.current.clearValue()
        setSearchField({...sFields, branch:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            setCenters(data.map(item => ({ value: item.id, label: item.name})))
            setClients([])
        }).catch(err=>{
            console.log(err.message)
            setCenters([])
            setClients([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
        
    }

    const updateCenter = (e) => {

        setSearchField({...sFields, center:e.value })
        dispatch({ type:'LOADING' })
        axios.get('get-center-loans/'+ e.value )
        .then(({data})=> setClients(data))
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
            setClients([])
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))
        
    }

    const triggerLoanID = (e) => {
        if(e)
        {
            setSearchField({...sFields, loan_id:e.value })
            getCenterWorkingDay(sFields.center)
            fetchData()
        }
    }

    const fetchData = () => {         

        if(sFields.branch && sFields.center && sFields.loan_id)
        {
            dispatch({type:'LOADING'})
            axios.post('/search-in-loan', sFields)
            .then(({data})=>{
                console.log(data)
            })
            .catch(e => dispatch({ type:'ERROR', payload:{code:e.response.status, error:e.message}}))
            .finally(()=> dispatch({ type:'STOP_LOADING' }) )
        }

    }

    const isOpenDay = date => {
        const day = date.getDay();
        return day===days.indexOf(meetingDay)
    }

    const handleDate = date => {
        setDate(date)
        setFields({...fields, first_installment: formatDate(date) })
    }

    const handleSubmit = async e => {

        e.preventDefault()
        if(!sFields.loan_id)
        {
            return toast('Select a loan ID to get started!',
                {
                  icon: '⚠️',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
            );
        }
        let {shouldGo, result} = validate(fields)
        if(shouldGo===false)
        { 
            console.log(result)
            setErrors(result)
            let keys = Object.keys(result)
            return toast.error(keys.length===1 ? keys[0].replace('_', ' ')+' is missing' :'Fill the required fields!')
        }
        // setting the `enroll-id` in payload 
        let enroll_id = sFields.loan_id.split(':')[0]
        setSearchField({...sFields, enroll_id})

        dispatch({type:'LOADING'})
        const formData = Object.assign({}, fields, sFields);
        axios.post('/speed-loan-disburse',formData)
        .then(({data})=>{
            toast.success('Loan disbursed successfully!')
            // Now Remove the selected Loan ID ;
            localStorage.removeItem('loanProductID')
            dispatch({type:'LOADING'})
            setTimeout(() => window.location.reload(), 1000 );
            // this is proper reset
        }).catch(err=>{
            console.log(err);
            toast.error('Something went wrong!')
        })
        .finally(()=> dispatch({type:'STOP_LOADING'}))
    }

    const getCenterWorkingDay = centerID => {

        dispatch({type:'LOADING'})
        axios.get('get-center-working-days/'+centerID)
        .then(({data})=> setMeetingDay(data.meeting_days)).catch(err=>console.log(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))

    }

	useEffect(() => {

        init();
        $(document).on('change','select', function(){
            this.style.border = ''
        });
        // $('.income-input, .expense-input').on('keyup',function(){
        //     let finalAmount = 0, final=0;
        //     $('.income-input').each(function( k,input ) {
        //         if( input.value && !isNaN(parseFloat( input.value ))) {
        //             finalAmount+= parseFloat(input.value)
        //         }
        //     });
        //     $('.expense-input').each( function( l,inp ) {
        //         if( inp && !isNaN(parseFloat(inp.value))) {
        //             final += parseFloat( inp.value );
        //         }
        //     });
        //     let direct_income = finalAmount - final;
        //     setFields({...fields, 
        //         total_income:finalAmount, 
        //         total_expense:final,
        //         direct_income,
        //         self_income: $('input[name=self_income]').val(),
        //         husband_income: $('input[name=husband_income]').val(),
        //         other_income: $('input[name=other_income]').val(),
        //         business_expense: $('input[name=business_expense]').val(),
        //         household_expense: $('input[name=household_expense]').val(),
        //         loan_installment: $('input[name=loan_installment]').val(),
        //     })
        // });
        
        // return ()=> {
        //     $('.income-input, .expense-input').off('keyup');
        // }
        return ()=> {}
	},[submitted])

  return (
    <div> 
      <Card className="col-12">
        <CardHeader tag="h6" className=" d-flex" >
          <b className="mt-2 mb-2"> SPEED LOAN DISBURSEMENT SYSTEM </b>
        </CardHeader>
        <CardBody className="">
            <Form onSubmit={handleSubmit} name="speedLoan">
              <FormGroup>
                <Row >
                 <Col md="4">
                        <Label size={'sm'} for="branches"> Branch </Label>
                        <ReactSelect
                            id='branches'
                            name='branch'
                            onChange={updateBranch}
                            options={branches}
                        />
                 </Col > 
                 <Col md="4">
                        <Label size={'sm'} for="center"> Center </Label>
                        <ReactSelect
                            id='branches'
                            name='branch'
                            onChange={updateCenter}
                            options={centers}
                        />
                 </Col > 
                 <Col md="4">
                    <Label size={'sm'} for="clientID"> Loan ID </Label>
                    <div className="d-flex">
                        <ReactSelect
                            id="clientID"
                            isSearchable
                            options={clients}
                            ref={clientRef}
                            className="w-100 client"
                            defaultValue={sFields.loan_id}
                            onChange={triggerLoanID}
                        /> 
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
              { sFields.loan_id &&
              <div className="d-flex"> 
                <div className="col-md-12">
                    <Card>
                        <CardHeader>
                            <CardTitle> New Loan Disbursement For </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className=" container">
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_date">
                                        Loan Date
                                    </Label>
                                    <Input
                                        id="loan_date" 
                                        name="loan_date"
                                        type="date" 
                                        value={fields.loan_date}
                                        min={getCurrentDate()}
                                        onChange={inputChange}
                                        placeholder="Enter disburse date"
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_product">
                                        Loan Products
                                    </Label>
                                    <ReactSelect
                                        placeholder="Search or select"
                                        ref={loanProductRef}
                                        id="loan_product" 
                                        className="loan_product"
                                        onChange={e=>getProductInfo(e.value)}
                                        name="loan_product"
                                        options={loanProductOptions}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_amount" >
                                        Loan Amount(
                                            <Link 
                                                to={'/loan-chart-master'}
                                                className="text-decoration-none"
                                            >
                                                View Chart
                                            </Link>
                                        )
                                    </Label>
                                    <ReactSelect
                                        placeholder="Search or select"
                                        id="loan_amount" 
                                        name="loan_amount"
                                        className="loan_amount"
                                        value={loanAmount}
                                        styles={{border:errors.loan_amount && '1px solid red'}}
                                        onChange={e=>setFields({...fields,loan_amount:e.value})}
                                        options={[{value:'', label:''}]}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_fee">
                                        Loan Fee
                                    </Label>
                                    <Input
                                        id="loan_fee" 
                                        name="loan_fee"
                                        defaultValue={fields.loan_fee}
                                        onChange={inputChange}
                                        type="text" 
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="funding_by">
                                        Funding By
                                    </Label>
                                    <ReactSelect
                                        placeholder="Choose funder"
                                        id="funding_by" 
                                        name="funding_by" 
                                        className="funding_by" 
                                        // value={fields.funding_by}
                                        onChange={e=>setFields({...fields,funding_by:e.value})}
                                        options={funders}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="policy">
                                        Policy
                                    </Label>
                                    <ReactSelect
                                        placeholder="Search or select"
                                        id="policy" 
                                        onChange={e=>setFields({...fields,policy:e.value})}
                                        name="policy" 
                                        // value={fields.policy}
                                        className="policy" 
                                        options={[{value:'double',label:'Double'}]}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} >
                                        Inc. Fee
                                    </Label>
                                    <Input
                                        id="insurance_fee" 
                                        name="insurance_fee"
                                        className="insurance_fee"
                                        type="text" 
                                        // value={fields.insurance_fee}
                                        onChange={inputChange}
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="gst">
                                        GST
                                    </Label>
                                    <Input
                                        id="gst" 
                                        name="gst"
                                        onChange={inputChange}
                                        defaultValue={fields.gst}
                                        type={'text'}
                                        readOnly
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="utilization">
                                        Utilization
                                    </Label>
                                    <ReactSelect
                                        placeholder="Search or select"
                                        id="utilization" 
                                        name="utilization"
                                        className="utilization"
                                        // value={fields.utilization}
                                        onChange={e=>setFields({...fields,utilization:e.value})}
                                        options={[{value:'Business Loan',label:'Business Loan'}]}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="first_installment">
                                        First Installment Date
                                    </Label> <br/>
                                    <DatePicker
                                        selected={date}
                                        onChange={handleDate}
                                        minDate={new Date()}
                                        disabled={!meetingDay}
                                        filterDate={isOpenDay}
                                        className="form-control w-100"
                                        placeholderText="Select a date"
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="number_of_emis">
                                        No. of EMI collected till
                                    </Label>
                                    <Input 
                                        type="text"
                                        placeholder="Enter no. of "
                                        id="number_of_emis" 
                                        name="number_of_emis" 
                                        className="number_of_emis" 
                                        defaultValue={fields.number_of_emis}
                                        onChange={e=>setFields({...fields,number_of_emis:e.target.value })}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="payment_mode" >
                                        Payment Mode
                                    </Label>
                                    <ReactSelect
                                        id="payment_mode" 
                                        onChange={e=>setFields({...fields,payment_mode:e.value})}
                                        name="payment_mode"
                                        className="payment_mode"
                                        // value={fields.payment_mode}
                                        options={paymentOptions}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="self_income">
                                        Self Income
                                    </Label> 
                                    <Input
                                        type="text"
                                        name="self_income"
                                        onChange={inputChange}
                                        placeholder="Enter self income"
                                        className="income-input"
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="husband_income">
                                        Husband/ Son Income
                                    </Label>
                                    <Input 
                                        type="text"
                                        placeholder="Enter husband/son income"
                                        id="husband_income" 
                                        name="husband_income" 
                                        className="husband_income income-input" 
                                        onChange={inputChange}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="other_income" >
                                        Other Income
                                    </Label>
                                    <Input
                                        type="text"
                                        id="other_income" 
                                        onChange={inputChange}
                                        name="other_income" 
                                        className="income-input"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="total_income">
                                        Total Income
                                    </Label> 
                                    <Input
                                        type={'text'}
                                        id="total_income"
                                        onChange={inputChange} 
                                        name="total_income" 
                                        readOnly 
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="direct_income">
                                        Direct Income
                                    </Label>
                                    <Input 
                                        type="text" 
                                        id="direct_income" 
                                        name="direct_income"  
                                        value={fields.direct_income}
                                        readOnly
                                        onChange={inputChange}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="business_expense" >
                                        Business Expense
                                    </Label>
                                    <Input
                                        disabled={sFields.client?.length < 1}
                                        id="business_expense" 
                                        onChange={inputChange}
                                        name="business_expense" 
                                        defaultValue={fields.business_expense} 
                                        className="expense-input"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="household_expense">
                                        Household Expense
                                    </Label>
                                    <Input
                                        disabled={sFields.client?.length < 1}
                                        id="household_expense" 
                                        onChange={inputChange}
                                        name="household_expense" 
                                        defaultValue={fields.household_expense}
                                        className="expense-input" 
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_installment">
                                        Loan Installment
                                    </Label>
                                    <Input 
                                        type="text"
                                        placeholder="Enter loan installment amount"
                                        id="loan_installment" 
                                        name="loan_installment"  
                                        defaultValue={fields.loan_installment}
                                        className="expense-input"
                                        onChange={inputChange}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="total_expense" >
                                        Total Expense
                                    </Label>
                                    <Input
                                        disabled={sFields.client?.length < 1 }
                                        id="total_expense" 
                                        readOnly
                                        onChange={inputChange}
                                        name="total_expense"
                                        type="text"
                                        value={fields.total_expense} 
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button type="submit" color="success" className="mt-2 w-100">
                                Save & Disburse
                            </Button>
                        </CardFooter>
                    </Card>
                </div> 
              </div>}
            </Form>
        </CardBody>
        <CardFooter>
          <div className="mt-3" id="resultArea">  
          </div> 
        </CardFooter>
      </Card> 
      
    </div>
  );
};

export default SpeedLoanDisburse;
