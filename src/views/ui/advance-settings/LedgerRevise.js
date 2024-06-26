import axios from "axios";
import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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

    const dispatch = useDispatch()
    const [fields, setFields] = useState({

    })
    const [searchfields, setSearchFields] = useState({

    })
    const setSearchInputs = e => {
        setSearchFields({...searchfields, [e.target.name]:e.target.value })
    }
    const handleChange = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }
    const [hitSearch, hit] = useState(false)

    const doSomething = () => { 
        alert('will have to do something!')
    }
    const [ledgerContent ,setContent]= useState([]) 

    const generateLedger = (e) => {
        hit(true)
        e.preventDefault()
        dispatch({type:'LOADING'})
        axios.post('/search-client-ledger',searchfields)
        .then(({data})=>{
            console.log(data)
            if(data!==undefined)
            {
                setContent(data)
            }
        })
        .catch(err=>{
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    useEffect(()=>{},[])

    return (
    <div> 
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
                        <Input
                            id="exampleSelectMulti" 
                            name="selectMulti"
                            type="select"
                            onChange={setSearchInputs}
                        >
                            <option> --SELECT BRANCH-- </option>
                            <option value={'enrollment'}> Enrollment </option>  
                        </Input>
                    </Col > 
                    <Col md="3">
                    <Label size={'sm'} for="center"> Centers </Label>
                    <Input
                        id="center" 
                        name="center"
                        type="select"
                        onChange={setSearchInputs}
                    >
                        <option value={''}> --SELECT CENTER-- </option>
                        <option value={''}> Patupur </option>
                        <option value={''}> Basti </option> 
                        <option value={''}> Ajamgadh </option> 
                        <option value={''}> Firozabad </option> 
                        <option value={''}> Rampur </option> 
                        <option value={''}> Allahabad </option> 
                    </Input>
                    </Col > 
                    <Col md="3">
                    <Label  size={'sm'} for="exampleEmail"> Clients </Label>
                    <div className="d-flex">
                        <Input
                            id="exampleSelectMulti" 
                            name="branch"
                            type="select"
                            onChange={setSearchInputs}
                            className="col-1" 
                        > 
                            <option> --SELECT CLIENT-- </option>
                        </Input>
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
                                            <td colSpan={2}>
                                                <div className="d-flex"> 
                                                    <Input 
                                                        type="text"
                                                        name="search" 
                                                        style={{width:'350px'}}
                                                        onChange={handleChange}
                                                    />
                                                    <button className="btn btn-primary mx-2">
                                                        <i className="fa fa-search" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Loan Product </small>
                                            </td>
                                            <td colSpan={2}>
                                                <small>: (View Chart) </small>
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Disbursement Date </small>
                                            </td>
                                            <td >
                                                <Input type="date" onChange={handleChange} />
                                            </td>
                                            <td >
                                                <small> : Loan amount </small>
                                            </td>
                                            <td>
                                                <Input type="text" onChange={handleChange} className="mt-1" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Loan Duration </small>
                                            </td>
                                            <td >
                                                <Input type="text" onChange={handleChange} className="mt-1" />
                                            </td>
                                            <td >
                                                <small> : Expected Paidup Date </small>
                                            </td>
                                            <td>
                                                <Input type="text" onChange={handleChange} className="mt-1" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Actual Paidup Date </small>
                                            </td>
                                            <td >
                                                <Input 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    className="mt-1" 
                                                />
                                            </td>
                                            <td >
                                                <small> : Total Interest Expected </small>
                                            </td>
                                            <td>
                                                <Input 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    className="mt-1" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Principal Outstanding </small>
                                            </td>
                                            <td >
                                                <Input 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    className="mt-1" 
                                                />
                                            </td>
                                            <td >
                                                <small> : Interest Outstanding </small>
                                            </td>
                                            <td>
                                                <Input 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    className="mt-1" 
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Principal Arrear </small>
                                            </td>
                                            <td >
                                                <Input 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    className="mt-1" 
                                                />
                                            </td>
                                            <td >
                                                <small> : Interest Arrear </small>
                                            </td>
                                            <td>
                                                <Input 
                                                    type="text" 
                                                    onChange={handleChange} 
                                                    className="mt-1" 
                                                />
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
