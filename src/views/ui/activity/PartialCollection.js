import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'

function PartialCollection() {

    const dispatch = useDispatch();
    const [branches, setBranches] = useState([]);
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);
    const [sFields, setSearchField] = useState({});
    const clientRef = useRef(null);
    
    const updateBranch = (e) => {

        clientRef.current.clearValue()
        setSearchField({...sFields, branch:e.value})
        dispatch({ type:'LOADING' })
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            let options=[]
            if(data.length) {
                data.forEach( item => options.push({ value: item.id, label: item.name}))
            }
            setCenters(options)
            setClients([])
        }).catch(err=>{
            console.log(err.message)
            setCenters([]);
            setClients([]);
        }).finally(()=>dispatch({type:'STOP_LOADING'}))

    }

    const updateCenter = (e) => {
 
        setSearchField({...sFields, center:e.value });
        dispatch({ type:'LOADING' })
        axios.get('get-center-clients/'+e.value )
        .then(({data})=> setClients(data))
        .catch( err=> {
            console.log(err.message)
            toast.error('Something went wrong!');
            setClients([])
        }).finally(()=>dispatch({ type:'STOP_LOADING' }));
      
    }

    const inputStyle = { width:'80%', marginLeft:'8%' };

    useEffect(() => {
    
        axios.get('get-branches')
        .then(({ data }) => {
            let options = [];
            data.forEach(item => options.push({value:item.id, label:item.name}) );
            setBranches(options);
        })

    },[]);

    return (
    <>
    <Card> 
        <CardBody>
            <Row>
                <Col md={2}>
                    <div className='d-flex'> 
                        <Card >
                            <CardHeader>
                                <CardTitle> PARTIAL ENTRY </CardTitle>
                            </CardHeader>
                            <CardBody> 
                                <Row>
                                    <Label for='branch'> Branches </Label>
                                    <ReactSelect
                                        type='select'
                                        bsSize={'sm'}
                                        style={inputStyle}
                                        id='branch'
                                        onChange={updateBranch}
                                        options={branches}
                                    />
                                </Row>
                                <Row className='mt-2'>
                                    <Label> Select Centers </Label>
                                    <ReactSelect
                                        type='select'
                                        bsSize={'sm'}
                                        onChange={updateCenter}
                                        style={inputStyle}
                                        options={centers}
                                    >
                                    </ReactSelect>
                                </Row>
                                <Row className='mt-2'>
                                    <Label> Search Clients </Label>
                                    <ReactSelect
                                        type='select'
                                        bsSize={'sm'}
                                        options={clients}
                                        style={inputStyle}
                                        ref={clientRef}
                                    >
                                    </ReactSelect>
                                </Row>
                            </CardBody>
                        </Card>
                    </div> 
                </Col>
                <Col md={10} >
                    <Card> 
                        <CardBody> 
                            <Row>
                                <Col md={10} >
                                    <div>
                                        <div className='d-flex'>
                                            <button className='btn btn-sm btn-primary formBtns'> Entry Form </button>
                                            <button className='btn btn-sm btn-primary formBtns' disabled> Center View </button>
                                        </div>
                                        <div>
                                            <Table bordered>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2}> <h6> ACCOUNT INFO </h6> </th>
                                                        <th colSpan={2}> <h6> DUES INFO </h6> </th>
                                                        <th colSpan={5}> <h6> TODAY COLLECTED </h6> </th>
                                                    </tr>
                                                    <tr>
                                                        <th> : </th>
                                                        <th> LOAN </th>
                                                        <th> INS.No </th>
                                                        <th> DUES </th>
                                                        <th> P.COLTD </th>
                                                        <th> I.COLTD </th>
                                                        <th> : </th>
                                                        <th> COLTD </th>
                                                        <th> : </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td style={{maxWidth:'80px'}}><Input type='text' placeholder={'0.00'}/></td>
                                                        <td></td>
                                                        <td><Button color='light'> Modify </Button></td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td> Total Count : 1 </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tfoot>
                                            </Table>
                                        </div>
                                        <div className='p-2' style={{borderBottom:'1px dashed',marginBottom:'10px'}}>
                                            <CardTitle >
                                                Summary
                                            </CardTitle>
                                        </div>
                                        <CardBody>
                                            <Col md={7}>
                                            </Col>
                                            <Col md={5} className='float-end'>
                                                <table className='table table-bordered'>
                                                    <tbody>
                                                        <tr>
                                                            <td> Other Collection </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td> Loan Collection </td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td> Total Collection </td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Col>
                                        </CardBody>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <Row ><Button color='primary' className=''> Center Profile </Button> </Row>
                                    <Row ><Button color='primary' className='mt-1'> Google Location </Button> </Row>
                                    <Row ><Button color='primary' className='mt-1'> View Ledger </Button> </Row>
                                    <Row ><Button color='primary' className='mt-1'> Passbook Download </Button> </Row>
                                    <Row ><Button color='light' className='mt-1'> Add Due's Installment </Button> </Row>
                                    <Row ><Button color='success' className='mt-1'> Loan Settlement </Button> </Row>
                                    <Row ><Button color='primary' className='mt-1'> Update Collection </Button> </Row>
                                    <Row ><Button color='secondary' className='mt-1'> Add Next Installment </Button> </Row>
                                    <Row ><Button color='danger' className='mt-1'> Update Arrear </Button> </Row>
                                    <Row ><Button color='warning' className='mt-1'> Skip Collection </Button> </Row>
                                    <Row ><Button color='warning' className='mt-1'> Update Partial Collection </Button> </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </CardBody>
    </Card>
    </>
    )
}

export default PartialCollection