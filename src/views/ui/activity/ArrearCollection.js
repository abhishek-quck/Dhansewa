import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactSelect from 'react-select'
import toast from 'react-hot-toast';

var allData = {branch:{}, center:{}, clients:{}}
function ArrearCollection(){
    
 const dispatch = useDispatch()
    const clientRef = useRef(null)
    const [ isTicked, setTicked ] = useState(false)
    const fs = {fontSize:"1rem"}
    const [ clientData, setClientData ] = useState([])
    const [fields, setFields]= useState({
        branch:'',
        center:'',
        group:'',
        client:'',
    });
    const [branches, setBranches] = useState([]);
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);

    const init = () => {
        dispatch({ type:'LOADING' })
        axios.get('get-options')
        .then(({data}) => 
        { 
            allData['branch'] = data.branches.map( i => i.value)
            allData['center'] = data.centers.map( i => i.value)
            if(data.branches) setBranches(data.branches) 
        })
        .finally(() => dispatch({ type:'STOP_LOADING' }))
    }

    const updateBranch = (e) => {
        setFields({...fields, branch:e.value})
        clientRef.current?.clearValue()
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
        setFields({...fields, center:e.value})
        clientRef.current?.clearValue()
        dispatch({type:'LOADING'})
        axios.get('get-center-clients/'+e.value )
        .then(({data})=> setClients(data))
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
            setClients([])
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))
    }

    const fetch = cID => {
        setFields({...fields, client:cID})
        dispatch({type:'LOADING'})
        axios.get('/get-client-loan-detail-for-arrear/'+cID)
        .then( ({data}) => {
            if(data.detail) {
                setClientData([data.detail]);
            }
        })
        .catch( (err) => {
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally( () => dispatch({type:'STOP_LOADING'})) 
    }

    const updateClient = (e) => {
        if(e) {
            setFields({...fields, client:e.value})
            fetch(e.value)
        }
    }
    useEffect(()=>{
    [...document.getElementsByTagName('select')].forEach(element => {         
        $(element).select2({
            placeholder:'Select an option',
            width:'100%'
        })
    });
    },[])
    useEffect(()=> {
        init()
    },[])

  return (
    <>
    <Card> 
        <CardBody>
            <Col>
                <Row className='d-flex'>
                    <Col md={10} >
                        <div className='d-flex'>
                            <Col md={3}>
                                <Row className='d-flex'> 
                                    <Col>
                                        <Card color='light'>
                                            <CardHeader>
                                                <CardTitle> ARREAR ENTRY </CardTitle>
                                            </CardHeader>
                                            <CardBody> 
                                            <Row>
                                                <Label for='branch'> Branches </Label>
                                                <ReactSelect
                                                    onChange={updateBranch}
                                                    options={branches}
                                                />       
                                            </Row>
                                            <Row className='mt-2'>
                                                <Label> Select Centers </Label>
                                                <ReactSelect
                                                    onChange={updateCenter}
                                                    options={centers}
                                                />
                                            </Row>
                                            <Row className='mt-2'>
                                                <Label> Search Clients </Label>
                                                <ReactSelect
                                                    onChange={updateClient}
                                                    options={clients}
                                                />
                                            </Row>
                                            </CardBody>
                                        </Card>
                                    </Col> 
                                </Row> 
                            </Col>
                            <Col md={9}>
                                { clientData.length ?
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>:</th>
                                                <th>LOAN</th>
                                                <th>P.ARR</th>
                                                <th>I.ARR</th>
                                                <th>T.ARR</th>
                                                <th>P.COLTD</th>
                                                <th>I.COLTD</th>
                                                <th>OTH</th>
                                                <th>T.COLTD</th>
                                                <th>
                                                    <Input type='checkbox' onClick={()=>setTicked(!isTicked)}/>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { clientData.map(client => <tr key={client.id}>
                                                <td><b style={fs}>{client.client.applicant_name}</b></td> 
                                                <td><b style={fs}>{client.loan_id}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><b style={fs}>{0}</b></td>
                                                <td><Input type='checkbox' checked={isTicked} onChange={()=>{}}/></td>
                                            </tr>)}
                                        </tbody>
                                    </Table>
                                    : null
                                }
                            </Col>
                        </div>
                    </Col>
                    <Col md={2} >
                        <Card style={{border:'0px'}}> 
                            <CardBody  > 
                              <Col>
                                <Row><Button color='primary' className=''> Center Profile </Button> </Row>
                                <Row><Button color='primary' className='mt-1'> Google Location </Button> </Row>
                                <Row><Button color='primary' className='mt-1'> View Ledger </Button> </Row>
                                <Row><Button color='success' className='mt-1'> Update Collection </Button> </Row>
                                <Row><Button color='warning' className='mt-1'> Skip Collection </Button> </Row>
                              </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </CardBody>
    </Card>
    </>
  )
}

export default ArrearCollection