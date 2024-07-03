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
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import $ from 'jquery'
import { useDispatch } from "react-redux";
var allData = {branch:{}, center:{}, clients:{}}

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const SpeedLoanDisburse = () => { 
    const dispatch = useDispatch()
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);
    const [loanProducts, setLoanProducts]= useState([])
    const clientRef = useRef(null)
    const [date, setDate] = useState(getCurrentDate());
	const [branches, setBranches] = useState([])
    const [fields, setFields] = useState({
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
        payment_mode:'',
        schedule_recurring:'',
        bank_name:'',
        cross_sale_products:''
    })

    const [sFields, setSearchField] = useState({
        branch:'',
        center:'',
        client:''
    })

    const emiRef = useRef(null)
    const paymentOptions = [
        {value:'Cash',label:'Cash'},
        {value:'Banking',label:'Banking'}
    ]
    const inputChange = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }

    const UtilizationRef = useRef(null)
    const policyRef = useRef(null)
    const funderRef = useRef(null)
    const loanProductsRef = useRef(null)

    let looper = [
        emiRef,
        UtilizationRef,
        policyRef,
        funderRef,
        loanProductsRef
    ];

    const init = () => { // GEt Branches, Centers , loan-products & client info

        dispatch({ type:'LOADING' })
        axios.get('get-options') 
        .then(({data}) => 
        { 
            // allData = data
            for (let item of data.clients) 
            { 
                let key = item.branch_id
                delete item.branch
                if( allData['clients'][key] === undefined )
                { 
                    allData['clients'][key] = [item]
                }else{
                    let checkAt = allData['clients'][key].length-1
                    console.log(  allData['clients'][key] )
                    if(allData['clients'][key][checkAt].value!==item.value)
                    { 
                        allData['clients'][key].push(item)
                    }
                }
            } 
            allData['branch'] = data.branches.map(ite => ite.value)
            allData['center'] = data.centers.map(ite => ite.value)
            
            if(data.branches) setBranches(data.branches) 
            if(data.centers) setCenters(data.centers) 
            if(data.clients) setClients(data.clients) 
        })
        .finally(() => {
            dispatch({ type:'STOP_LOADING' })
        })

        axios.get('/loan-products-options')
        .then(({data})=>{
            console.log(data)
            setLoanProducts(data)
        })

    }

    const updateBranch = (e) => {
        clientRef.current.clearValue()
        setSearchField({...sFields, branch:e.value})
        setClients(allData['clients'][e.value]) // reset clients according to branch
    }

    const updateCenter = (e) => {
        setSearchField({...sFields, center:e.value })
        // setClients(allData['clients'][e.value])
    }

    const updateClient = (e) => {
        if(e)
        {
            setSearchField({...sFields, client:e.value })
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
            .finally(()=>{
                dispatch({type:'STOP_LOADING'})
            })
        }
    }

    const handleSubmit = e => {
        dispatch({type:'LOADING'})
        console.log($('form[name=speedLoan]')[0])
        try {
            for (const item of looper) {
                item.current.clearValue()
            }
        } catch (error) {
            console.log(error)
        }
        $('form[name=speedLoan]')[0].reset()
        e.preventDefault()
        axios.post('/speed-loan-disburse',fields)
        .then(({data})=>{
            console.log(data) 
            toast.success('Records added successfully!')
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
        .finally((res)=>{
            dispatch({type:'STOP_LOADING'})
            console.log(res)
        })
    }

	useEffect(()=>{
        init()
        return ()=>null 
	},[])

  return (
    <div> 
      <Card className="col-12">
        <CardHeader tag="h6" className=" d-flex" >
          <b className="mt-2 mb-2"> SPEED LOAN DISBURSEMENT SYSTEM </b>
        </CardHeader>
        <CardBody className="bg-gray-300">
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
                    <Label size={'sm'} for="branchID"> Client ID </Label>
                    <div className="d-flex">
                        <ReactSelect
                            options={clients}
                            ref={clientRef}
                            className="w-100"
                            defaultValue={sFields.client}
                            onChange={updateClient}
                        /> 
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
              <div className="d-flex"> 
                <div className="col-md-8">
                    <Card>
                        <CardHeader>
                            <CardTitle> New Loan Disbursement For </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className=" container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="loan_date">
                                        Loan Date
                                    </Label>
                                    <Input
                                        id="loan_date" 
                                        name="loan_date"
                                        type="date" 
                                        defaultValue={date}
                                        onChange={e=>setFields({...fields,loan_date:e.value})}
                                        placeholder="Enter disburse date"
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_product">
                                        Loan Products
                                    </Label>
                                    <CreatableSelect
                                        isClearable
                                        ref={loanProductsRef}
                                        id="loan_product" 
                                        onChange={e=>setFields({...fields,loan_product:e.value})}
                                        name="loan_product"
                                        options={loanProducts}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="loan_amount" >
                                        Loan Amount(View Chart)
                                    </Label>
                                    <CreatableSelect
                                        id="loan_amount" 
                                        isClearable
                                        name="loan_amount"
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
                                        onChange={inputChange}
                                        type="text" 
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label size={'sm'} for="funding_by">
                                        Funding By
                                    </Label>
                                    <CreatableSelect
                                        id="funding_by" 
                                        ref={funderRef}
                                        isClearable
                                        name="funding_by" 
                                        onChange={e=>setFields({...fields,funding_by:e.value})}
                                        options={[{value:'',label:''}]}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="policy">
                                        Policy
                                    </Label>
                                    <CreatableSelect
                                        id="policy" 
                                        ref={policyRef}
                                        isClearable
                                        onChange={e=>setFields({...fields,policy:e.value})}
                                        name="policy" 
                                        options={[{value:'',label:''}]}
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
                                        type="text" 
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
                                        type={'text'}
                                    />
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="utilization">
                                        Utilization
                                    </Label>
                                    <CreatableSelect
                                        id="utilization" 
                                        isClearable
                                        ref={UtilizationRef}
                                        name="utilization"
                                        onChange={e=>setFields({...fields,utilization:e.value})}
                                        options={[{value:'',label:''}]}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-2 container">
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="first_installment">
                                    First Installment Date
                                    </Label>
                                    <Input
                                        id="first_installment" 
                                        name="first_installment"
                                        type="date" 
                                        onChange={inputChange}
                                        defaultValue={date}
                                        placeholder="Enter disburse date"
                                    /> 
                                </Col>
                                <Col sm="4" md="4">
                                    <Label  size={'sm'} for="number_of_emis">
                                        No. of EMI collected till
                                    </Label>
                                    <CreatableSelect
                                        id="number_of_emis" 
                                        name="number_of_emis" 
                                        isClearable
                                        ref={emiRef}
                                        onChange={e=>setFields({...fields,number_of_emis:e.value })}
                                        options={[{value:'',label:''}]}
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
                                        options={paymentOptions}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div> 
                <div className="col-md-4 mx-1">
                    <Card className="mx-1">
                        <CardHeader>
                            <CardTitle> Other Info </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className="container">
                                <Label size={'sm'} for="schedule_recurring">
                                    Schedule Recurring 
                                </Label>
                                <Input
                                    id="schedule_recurring" 
                                    name="schedule_recurring"
                                    type="text" 
                                    onChange={inputChange}
                                    placeholder="Enter Recurring amount"
                                /> 
                            </Row>
                            <Row className="mt-2 container">
                                <Label  size={'sm'} for="bank_name">
                                    Bank Name
                                </Label>
                                <ReactSelect
                                    id="bank_name" 
                                    name="bank_name"
                                    onChange={e=>setFields({...fields,bank_name:e.value})}
                                    options={[{value:'',label:''}]}
                                />
                            </Row>
                            <Row className="mt-2 container mb-3">
                                <Label  size={'sm'} for="cross_sale_products">
                                    Cross Sale Products
                                </Label>
                                <ReactSelect
                                    id="cross_sale_products" 
                                    name="cross_sale_products"
                                    onChange={e=>setFields({...fields,cross_sale_products:e.value})}
                                    options={[{value:'',label:''}]}
                                />
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
