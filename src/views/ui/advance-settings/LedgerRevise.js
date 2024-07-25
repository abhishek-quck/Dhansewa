import $ from "jquery";
import axios from "axios";
import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";
import { 
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input, 
  Row,
  Col,
  CardFooter,
  CardHeader,
  Table, 
} from "reactstrap";

const LedgerRevise = () => { 
    const [branches, setBranches ] = useState([])
    const [centers, setCenters ] = useState([])
    const [clients, setClients ] = useState([])
    const [view, setView] = useState({
        id:'',
        client_id:'',
        loan_date:'',
        loan_amount:'',
        loan_fee:'',
        insurance_fee:'',
        gst:'',
        loan_product:'',
        bank_name:'',
        funding_by:'',
        policy:'',
        utilization:'',
        first_installment:'',
        number_of_emis:'',
        payment_mode:'',
        schedule_recurring:'',
        cross_sale_products:'',
    })
    const dispatch = useDispatch()
    const [fields, setFields] = useState({

    })
    const [searchfields, setSearchFields] = useState({
        client:null
    })
    const checkStyle = {marginTop:'10px',marginRight:'8px'}
    const setSearchInputs = e => {
        setSearchFields({...searchfields, [e.target.name]:e.target.value })
    }
    const handleChange = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }
    const [hitSearch, hit] = useState(false)

    const doSomething = () => { }
    const [ledgerContent ,setContent]= useState([]) 

    const generateLedger = (e) => {
        hit(true)
        e.preventDefault()
        if(!searchfields.client) {
            toast.error('Select a client first!')
            $('.client').css('border','1px solid red')
            return 
        }
        dispatch({type:'LOADING'})
        axios.post('/search-client-ledger',searchfields)
        .then(({data})=>{
            if(data!==undefined) setContent(data)
        })
        .catch(()=>toast.error('Something went wrong!'))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    const getClient = clientID => 
    {
        $('.client').css('border','')
        setSearchFields({...searchfields, client: clientID})
        dispatch({type:'LOADING'})

        axios.get('get-disbursement-details/'+clientID)
        .then(({data})=>setView(data))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    const init = () => {
        dispatch({type:'LOADING'})
        axios.get('get-options/all')
		.then(({data})=>{
            if(data.centers) setCenters(data.centers)
            if(data.branches) setBranches(data.branches)
            if(data.clients)
            {
                let {clients} = data
                let arr= [];
                for(let item of clients)
                {
                    let obj = {value:item.value, label:item.label}
                    arr.push(obj)
                }
                setClients(arr)   
            }
		}).finally(()=>dispatch({type:'STOP_LOADING'}))
		
    }
    useEffect(()=>{
        init()
        return ()=>null
    },[])

    return (
    <div className="ledger-revise"> 
        <Card className="col-12">
        <CardHeader className="mb-0 d-flex">
            <b className="mt-2 mb-2"> LOAN LEDGER REVISE </b> 
        </CardHeader>
        <CardBody className="bg-gray-300">
            <Form onSubmit={generateLedger}>
                <FormGroup>
                <Row className="mt-2">
                    <Col md="3">
                        <Label size={'sm'} for="exampleEmail"> Branches </Label>
                        <ReactSelect 
                            id="exampleEmail"
                            options={branches}
                        />
                    </Col > 
                    <Col md="3">
                    <Label size={'sm'} for="center"> Centers </Label>
                    
                    <ReactSelect 
                        id="center"
                        name="center"
                        options={centers}
                    />
                    </Col > 
                    <Col md="3">
                    <Label  size={'sm'} for="exampleEmail"> Clients </Label>
                    <div className="d-flex">
                        <ReactSelect
                            options={clients}
                            className="w-100 client"
                            onChange={e=>getClient(e.value)}
                        />
                    </div>
                    </Col > 
                    <Col md="3">
                    <Label size={'sm'} for="exampleEmail"> Loan Accounts </Label>
                    <div className="d-flex">
                        <Input
                            id="exampleSelectMulti" 
                            name="branch"
                            type="select"
                            onChange={setSearchInputs}
                            className="col-1" 
                        > 
                            <option> --SELECT LOAN A/C-- </option>
                        </Input>
                    </div>
                    </Col > 
                </Row>   
                </FormGroup> 
                <div className="d-flex"> 
                <div className="col-md-7">
                    <Card>
                        <CardHeader>
                            <b> Loan Information </b>
                        </CardHeader>
                        <CardBody>
                            <Row className="container">
                                <table className="table table-bordered">
                                    <tbody> 
                                        <tr>
                                            <td>
                                                <small>Loan ID</small>
                                            </td>
                                            <td colSpan={3}>
                                                <div className="d-flex"> 
                                                    <Input 
                                                        type="text"
                                                        name="search" 
                                                        defaultValue={view.id}
                                                        style={{width:'350px'}}
                                                        onChange={handleChange}
                                                        disabled
                                                    />
                                                    <button className="btn btn-primary mx-2">
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 Loan Product
                                            </td>
                                            <td colSpan={3}>
                                                 <b>{view.loan_product}</b> : (View Chart)
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>
                                                 Disbursement Date
                                            </td>
                                            <td >
                                                <b className="mt-1">{view.created_at} </b>
                                            </td>
                                            <td >
                                                 Loan amount
                                            </td>
                                            <td>
                                                <b className="mt-1">{view.loan_amount} &#8377;</b> 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 Loan Duration
                                            </td>
                                            <td >
                                                <b className="mt-1"> N/A </b>
                                            </td>
                                            <td >
                                                 Expected Paidup Date
                                            </td>
                                            <td>
                                                <b className="mt-1"> N/A </b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                 Actual Paidup Date
                                            </td>
                                            <td >
                                                {view.id && 
                                                    <div 
                                                        className="bg-success text-white px-2 d-flex" 
                                                        style={{
                                                            padding:5, 
                                                            borderRadius:'5px',
                                                            width:115
                                                        }}
                                                    >
                                                        <i className="fa fa-check fs-5" style={checkStyle} />
                                                        <small>ACCOUNT ACTIVE</small>
                                                    </div>
                                                }
                                            </td>
                                            <td >
                                                Total Interest Expected 
                                            </td>
                                            <td>
                                                <b className="mt-1"> N/A </b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Principal Outstanding 
                                            </td>
                                            <td >
                                                <b className="mt-1"> N/A </b>
                                            </td>
                                            <td >
                                                Interest Outstanding 
                                            </td>
                                            <td>
                                                <b className="mt-1"> N/A </b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Principal Arrear 
                                            </td>
                                            <td >
                                                <b className="mt-1" > 0 </b>
                                            </td>
                                            <td >
                                                Interest Arrear
                                            </td>
                                            <td>
                                                <b className="mt-1"> 0 </b>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Row> 
                            <h5>Ledger Information</h5>
                            <div className="resultArea"></div>
                        </CardBody>
                        <CardFooter>
                            <button className="btn btn-rounded btn-success"> Ledger Regenerate </button>
                        </CardFooter>
                    </Card>
                </div> 
                <div className="col-md-4 offset-1">
                    <Card className="mx-1">
                        <CardHeader>
                            <b> ENTRY </b>
                        </CardHeader>
                        <CardBody>
                            
                        </CardBody>
                        <CardFooter>
                                
                        </CardFooter>
                    </Card>
                </div>
                </div>
            </Form>
        </CardBody>
        <CardFooter>
            <div className="mt-3" id="resultArea">  
            { hitSearch ?
            <Table hover bordered dashed={'true'} style={{fontSize:'small'}}>
                <thead>
                    <tr>
                        <th> EMI N. </th>
                        <th> TRAN DATE </th>
                        <th> PR-DUE </th>
                        <th> INT-DUE </th>
                        <th> T-DUE </th>
                        <th> PR-COLTD </th>
                        <th> INT-COLTD </th>
                        <th> T-COLTD </th>
                        <th> ATTEND </th>
                        <th> RECEIPT N. </th>
                        <th> STAFF ID </th>
                        <th> SEQ </th>
                        <th> OTHER </th>
                        <th> DateStamp </th>
                        <th> <Input type="checkbox" onClick={doSomething}/> </th>
                    </tr>
                </thead>
                <tbody>
                    {ledgerContent.length ? ledgerContent.map((row,index)=>{
                        return (
                            <tr key={index}>
                                <td> <Input type="text" value={row['emi_num']} /> </td>
                                <td> <Input type="date" value={row['transaction_date']} /> </td>
                                <td> <Input type="text" value={row['pr_date']} /> </td>
                                <td> <Input type="text" value={row['int_date']} /> </td>
                                <td> <Input type="text" value={row['t_due']} /> </td>
                                <td> <Input type="text" value={row['pr_coltd']} /> </td>
                                <td> <Input type="text" value={row['t_coltd']} /> </td>
                                <td> <Input type="text" value={row['attend']} /> </td>
                                <td> <Input type="text" value={row['receipt_num']} /> </td>
                                <td> <Input type="text" value={row['staff_id']} /> </td>
                                <td> <Input type="text" value={row['seq']} /> </td>
                                <td> <Input type="text" value={row['other']} /> </td>
                                <td> <Input type="text" value={row['date_stamp']} /> </td>
                                <td> <Input type="checkbox" onClick={()=>null}/> </td>
                            </tr>
                        )
                        })
                    : null
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td> <b> Total </b> </td>
                        <td> <b> Row Count: {ledgerContent.length}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b> Pending:0 </b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b> 0 </b> </td>
                        <td> <b>{''}</b> </td>
                        <td> <b>{''}</b> </td>
                    </tr>
                </tfoot>
            </Table>
            : null
            }
            </div> 
        </CardFooter>
        </Card> 
        
    </div>
    );
};

export default LedgerRevise;
