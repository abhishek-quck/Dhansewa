import $ from "jquery";
import axios from "axios";
import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";
import { Card, CardBody, Form, FormGroup, Label, Input, Row, Col, CardFooter, CardHeader, Table } from "reactstrap";

const LedgerRevise = () => { 

    const [hitSearch, hit]            = useState(false)
    const [branches, setBranches ]    = useState([]);
    const [centers, setCenters ]      = useState([]);
    const [clients, setClients ]      = useState([]);
    const [ledgerContent, setContent] = useState([]) 
    const [searchfields, setSearchFields] = useState({ client:null, loan_id:null })

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
    });

    const dispatch = useDispatch();
    const [fields, setFields] = useState({ })
    const checkStyle = { marginTop:'10px', marginRight:'8px' };
    const setSearchInputs = e => setSearchFields({...searchfields, [e.target.name]:e.target.value })
    const handleChange = e => setFields({...fields, [e.target.name]:e.target.value})

    const updateBranch = (e) => {
        setSearchFields({...searchfields, branch:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            setCenters(data.map(item => ({ value: item.id, label: item.name})))
            setClients([])
        }).catch(err => {
            console.log(err.message)
            setCenters([])
            setClients([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    
    const updateCenter = (e) => {
        setSearchFields({...searchfields, center:e.value})
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

    const doSomething = () => { }

    const generateLedger = (e) => {

        hit(true)
        e.preventDefault();
        console.log(searchfields)
        if(!searchfields.client) {
            $('.client').css('border','1px solid red')
            return toast('Select a client first!',
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
        dispatch({type:'LOADING'});

        axios.post('/get-client-ledger',searchfields)
        .then(({data})=> setContent(data) )
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => dispatch({type:'STOP_LOADING'}));

    }

    const getClient = clientID => 
    {
        $('.client').css('border','')
        dispatch({type:'LOADING'})

        axios.get('get-disbursement-details/'+clientID)
        .then(({data})=>{
            setView(data);
            setSearchFields({...searchfields, client: clientID, loan_id :data.loan_id });
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}));
    }

    const udpateLedger = e => {
 
        const {name, value, dataset} = e.target;
        dispatch({ type:'LOADING' })
        
        axios.put('update-client-ledger', {
            transaction_id: dataset.id,
            enroll_id: searchfields.client, 
            field: name, 
            value
        })
        .then(({data}) => toast.success(data.message))
        .finally(()=> dispatch({ type:'STOP_LOADING' }))

    }

    const init = () => {

        dispatch({ type:'LOADING' })
        axios.get('get-options/all')
		.then(({data}) => setBranches(data.branches))
        .finally(()=> dispatch({ type:'STOP_LOADING' }));
		
    }

    useEffect(()=> {

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
                            onChange={updateBranch}
                        />
                    </Col > 
                    <Col md="3">
                    <Label size={'sm'} for="center"> Centers </Label>
                    
                    <ReactSelect 
                        id="center"
                        name="center"
                        onChange={updateCenter}
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
                                                <small> Loan ID </small>
                                            </td>
                                            <td colSpan={3}>
                                                <div className="d-flex"> 
                                                    <Input 
                                                        type="text"
                                                        name="search" 
                                                        defaultValue={view.loan_id}
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
                        </CardBody>
                        {view.id && <CardFooter>
                            <h5>Ledger Information</h5>
                            <div className="resultArea"></div>
                            <button className="btn btn-rounded btn-success"> Ledger Regenerate </button>
                        </CardFooter> }
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
            <Table hover bordered dashed={'true'} className="ledger-table" style={{fontSize:'small'}}>
                <thead style={{fontSize:'smaller'}}>
                    <tr>
                        <th >
                            <div className="d-flex" >
                                <div> EMI N. </div>
                                <div> TRAN DATE </div>
                                <div> PR-DUE </div>
                                <div> INT-DUE </div>
                                <div> T-DUE </div>
                                <div> PR-COLTD </div>
                                <div> INT-COLTD </div>
                                <div> T-COLTD </div>
                                <div> ATTEND </div>
                                <div> RECEIPT N. </div>
                                <div> STAFF ID </div>
                                <div> OTHER </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ledgerContent.length ? ledgerContent.map((row,index)=>{
                        return (
                            <tr key={index}>
                                <td >
                                    <div className="d-flex" >
                                        <div> <b className="p-2">{ row.emi_no }</b> </div>      
                                        <div> {row.transaction_date}</div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="pr_due" defaultValue={ row.pr_due } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="int_due" defaultValue={ row.int_due } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="total_due" defaultValue={ row.total_due } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="pr_collected" defaultValue={ row.pr_collected } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="int_collected" defaultValue={ row.int_collected } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="total_collected" defaultValue={ row.total_collected } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="attend" defaultValue={ row.attend } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="receipt_no" defaultValue={ row.receipt_no } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="staff_id" defaultValue={ row.staff_id } /> </div>
                                        <div> <Input type="text" data-id={row.id} onBlur={udpateLedger} name="other" defaultValue={ row.other??'' } /> </div>
                                    </div>
                                </td>
                            </tr>
                        )
                        })
                    : null
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td >
                            <div className="d-flex" style={{height:'30px'}}>
                                <div> <b> Total </b> </div>
                                <div> <b> Count: {ledgerContent.length}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b> Pending:0 </b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b>{''}</b> </div>
                                <div> <b> 0 </b> </div>   
                            </div>
                        </td>
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
