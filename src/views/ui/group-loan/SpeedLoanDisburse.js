import React, { useEffect, useRef, useState } from "react"; 
import { 
  Card,
  CardBody,
  CardTitle,   
  Form,
  FormGroup,
  Label,
  Input, 
  Row,
  Col,
  CardFooter,
  CardHeader,
  Button, 
} from "reactstrap";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import $ from 'jquery'
import { useDispatch } from "react-redux";
import { formatDate, validate } from "../../../helpers/utils";
import { Link } from "react-router-dom";
var allData = {branch:{}, center:{}, clients:{}}
let initial;
 
const SpeedLoanDisburse = () => { 
    const dispatch = useDispatch()
    const clientRef = useRef(null)
    const [meetingDay, setMeetingDay] = useState('');
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);
    const [loanProducts, setLoanProducts]= useState([])
    const [loanAmount, setLoanAmount] = useState('')
    const [date, setDate] = useState('');
	const [branches, setBranches] = useState([])
    const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    const [fields, setFields] = useState(initial={
        loan_date:'',
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
        payment_mode:''
    })
    const [sFields, setSearchField] = useState({
        branch:'',
        center:'',
        client:''
    })
    const [errors, setErrors] = useState({...fields, ...sFields})

    const emiRef = useRef(null)
    const paymentOptions = [
        {value:'Cash',label:'Cash'},
        {value:'Banking',label:'Banking'}
    ]
    const inputChange = e => {
        if(e.target) {
            e.target.style.border = ''
            setFields({...fields, [e.target.name]:e.target.value})
        }
    }

    const getProductInfo = id => {
        axios.get('get-product-details/'+id)
        .then(({data})=>{
            setLoanAmount({value:data.amount, label:data.amount})
            setFields({...fields, 
                gst:data.gst_tax, 
                loan_amount:data.amount,
                loan_product:data.name
            })
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    const UtilizationRef = useRef(null)
    const policyRef = useRef(null)
    const funderRef = useRef(null)
    const loanRef = useRef(null)
    const loanProductRef = useRef(null)
    const init = () => { // GEt Branches, Centers , loan-products & client info

        dispatch({ type:'LOADING' })
        axios.get('get-options') 
        .then(({data}) => 
        {  
            allData['branch'] = data.branches.map(ite => ite.value)
            allData['center'] = data.centers.map(ite => ite.value)
            if(data.branches) setBranches(data.branches)  
        })
        .catch(err=>dispatch({type:'ERROR',payload:{error:err.message}}))
        .finally(() => dispatch({ type:'STOP_LOADING' }))
        axios.get('/loan-products-options')
        .then(({data})=>{
            console.log(data)
            setLoanProducts(data)
        }).catch(err=>dispatch({type:'ERROR',payload:{error:err.message}}))
    }

    const updateBranch = (e) => {
        clientRef.current.clearValue()
        setSearchField({...sFields, branch:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            let options=[]
            if(data.length) {
                for (const item of data) {
                    options.push({ value: item.id, label: item.name})
                }
            }
            setCenters(options)
            setClients([])
        }).catch(err=>{
            console.log(err.message)
            setCenters([])
            setClients([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
        //setClients(allData['clients'][e.value]) // reset clients according to branch
    }

    const updateCenter = (e) => {
        setSearchField({...sFields, center:e.value })
        dispatch({type:'LOADING'})
        axios.get('get-center-clients/'+e.value )
        .then(({data})=> setClients(data))
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
            setClients([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
        // setClients(allData['clients'][e.value])
    }

    const updateClient = (e) => {
        if(e)
        {
            setSearchField({...sFields, client:e.value })
            getCenterWorkingDay(sFields.center)
            fetchData()
        }
    }

    const fetchData = () => {         
        if(sFields.branch && sFields.center && sFields.client)
        {
            dispatch({type:'LOADING'})
            axios.post('/search-in-loan', sFields)
            .then(({data})=>{
                console.log(data)
            })
            .catch(err=>dispatch({type:'ERROR',payload:{error:err.message}}))
            .finally(()=>{
                dispatch({type:'STOP_LOADING'})
            })
        }
    }

    const isOpenDay = date => {
        const day = date.getDay();
        return day===days.indexOf(meetingDay)
    }

    const formReset = () => {
        // clientRef?.current?.clearValue()
        // UtilizationRef?.current?.clearValue()
        setLoanAmount(0)
        // loanProductRef?.current?.clearValue()
        // policyRef?.current?.clearValue()
        // funderRef?.current?.clearValue()
        setClients([])
        setSearchField({...sFields, client:''})
        setFields(initial)
    }

    const handleDate = date => {
        setDate(date)
        setFields({...fields, first_installment: formatDate(date) })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(!sFields.client)
        {
            return toast('Select a client to get started!',
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
            return 
        }
        dispatch({type:'LOADING'})
        const formData = Object.assign({}, fields, sFields);
        axios.post('/speed-loan-disburse',formData)
        .then(({data})=>{
            formReset()
            toast.success('Loan disbursed successfully!')
        }).catch(err=>{
            console.log(err)
        })
        .finally(()=> dispatch({type:'STOP_LOADING'}))
    }

    const getCenterWorkingDay = centerID => {
        dispatch({type:'LOADING'})
        axios.get('get-center-working-days/'+centerID)
        .then(({data})=> { 
            setMeetingDay(data.meeting_days);
        }).catch(err=>console.log(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
	useEffect(()=>{
        init()
        $(document).on('change','select', function(){
            this.style.border = ''
        })
        return ()=>{
            $(document).off('change','input,select,textarea')
        }
	},[])

  return (
    <div> 
      <Card className="col-12">
        <CardHeader tag="h6" className=" d-flex" >
          <b className="mt-2 mb-2"> SPEED LOAN DISBURSEMENT SYSTEM </b>
        </CardHeader>
        <CardBody className="">
            <Form onSubmit={handleSubmit} name="speedLoan">
              <FormGroup>
                <Row className="">
                 <Col md="3">
                        <Label size={'sm'} for="branches"> Branches </Label>
                        <ReactSelect
                            id='branches'
                            name='branch'
                            onChange={updateBranch}
                            options={branches}
                        />
                 </Col > 
                 <Col md="3">
                        <Label size={'sm'} for="center"> Centers </Label>
                        <ReactSelect
                            id='branches'
                            name='branch'
                            onChange={updateCenter}
                            options={centers}
                        />
                 </Col > 
                 <Col md="5">
                    <Label size={'sm'} for="clientID"> Client ID </Label>
                    <div className="d-flex">
                        <ReactSelect
                            id="clientID"
                            isSearchable
                            options={clients}
                            ref={clientRef}
                            className="w-100 client"
                            defaultValue={sFields.client}
                            onChange={updateClient}
                        /> 
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
              <div className="d-flex"> 
                <div className="col-md-11">
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
                                        isDisabled={sFields.client?.length<1}
                                        ref={loanProductRef}
                                        id="loan_product" 
                                        className="loan_product"
                                        onChange={e=>getProductInfo(e.value)}
                                        name="loan_product"
                                        options={loanProducts}
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
                                    <CreatableSelect
                                        placeholder="Search or select"
                                        isDisabled={sFields.client?.length<1}
                                        id="loan_amount" 
                                        isClearable
                                        ref={loanRef}
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
                                        disabled={sFields.client?.length<1}
                                        id="loan_fee" 
                                        name="loan_fee"
                                        value={fields.loan_fee}
                                        onChange={inputChange}
                                        type="text" 
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="funding_by">
                                        Funding By
                                    </Label>
                                    <CreatableSelect
                                        placeholder="Search or select"
                                        isDisabled={sFields.client?.length<1}
                                        id="funding_by" 
                                        ref={funderRef}
                                        isClearable
                                        name="funding_by" 
                                        className="funding_by" 
                                        value={fields.funding_by}
                                        onChange={e=>setFields({...fields,funding_by:e.value})}
                                        options={[{value:'',label:''}]}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="policy">
                                        Policy
                                    </Label>
                                    <CreatableSelect
                                        placeholder="Search or select"
                                        isDisabled={sFields.client?.length<1}
                                        id="policy" 
                                        ref={policyRef}
                                        isClearable
                                        onChange={e=>setFields({...fields,policy:e.value})}
                                        name="policy" 
                                        value={fields.policy}
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
                                        disabled={sFields.client?.length<1}
                                        id="insurance_fee" 
                                        name="insurance_fee"
                                        className="insurance_fee"
                                        type="text" 
                                        value={fields.insurance_fee}
                                        onChange={inputChange}
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="gst">
                                        GST
                                    </Label>
                                    <Input
                                        disabled={sFields.client?.length<1}
                                        id="gst" 
                                        name="gst"
                                        onChange={inputChange}
                                        defaultValue={fields.gst}
                                        type={'text'}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="utilization">
                                        Utilization
                                    </Label>
                                    <CreatableSelect
                                        placeholder="Search or select"
                                        isDisabled={sFields.client?.length<1}
                                        id="utilization" 
                                        isClearable
                                        ref={UtilizationRef}
                                        name="utilization"
                                        className="utilization"
                                        value={fields.utilization}
                                        onChange={e=>setFields({...fields,utilization:e.value})}
                                        options={[{value:'Business Loan',label:'Business Loan'}]}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="first_installment">
                                    First Installment Date
                                    </Label>

                                    <DatePicker
                                        selected={date}
                                        onChange={handleDate}
                                        minDate={(new Date)}
                                        disabled={!meetingDay}
                                        filterDate={isOpenDay}
                                        placeholderText="Select a date"
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="number_of_emis">
                                        No. of EMI collected till
                                    </Label>
                                    <CreatableSelect
                                        placeholder="Search or select"
                                        isDisabled={sFields.client?.length<1}
                                        id="number_of_emis" 
                                        name="number_of_emis" 
                                        className="number_of_emis" 
                                        isClearable
                                        ref={emiRef}
                                        value={fields.number_of_emis}
                                        onChange={e=>setFields({...fields,number_of_emis:e.value })}
                                        options={[{value:'',label:''}]}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="payment_mode" >
                                        Payment Mode
                                    </Label>
                                    <ReactSelect
                                        isDisabled={sFields.client?.length<1}
                                        id="payment_mode" 
                                        onChange={e=>setFields({...fields,payment_mode:e.value})}
                                        name="payment_mode"
                                        className="payment_mode"
                                        value={fields.payment_mode}
                                        options={paymentOptions}
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
              </div>
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
