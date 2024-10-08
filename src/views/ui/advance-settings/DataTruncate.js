import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Container, Label, Row, Table }
from 'reactstrap'

var allData = {branch:{}, center:{}, clients:{}}
function DataTruncate() {
    const dispatch = useDispatch()
    const [fields, setFields]= useState({
        branch:'',
        center:'',
        group:'',
        client:'',
    })
    const [targetInfo, setTargetInfo] = useState([])
    const [GRTInfo, setGRTInfo] = useState([])
    const [ProposalInfo, setProposalInfo] = useState([])
    const [LoanInfo, setLoanInfo] = useState([])

    // options
    const [branches, setBranches] = useState([]);
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);

    const printPassbook = async() => {}
    const init = () => {
        dispatch({ type:'LOADING' })
        axios.get('get-options')
        .then(({data}) => 
        { 
            for (let item of data.clients) 
            { 
                let key = item.branch_id
                delete item.branch
                if( allData['clients'][key] === undefined ) { 
                    allData['clients'][key] = [item]
                } else {
                    allData['clients'][key].push(item)
                }
            } 
            allData['branch'] = data.branches.map( i => i.value)
            allData['center'] = data.centers.map( i => i.value)
            if(data.branches) setBranches(data.branches) 
            if(data.centers) setCenters(data.centers) 
            if(data.clients) setClients(data.clients) 
        })
        .finally(() => {
            dispatch({ type:'STOP_LOADING' })
        })
    }
    
    const updateBranch = (e) => {
        setFields({...fields, branch:e.value})
        setClients(allData['clients'][e.value])
    }

    const updateCenter = (e) => {
        setFields({...fields, center:e.value})
        // setClients(allData['clients'][e.value])
    }
    const updateClient = (e) => {
        setFields({...fields, client:e.value})
        fetch(e.value)
    }

    const fetch = (clientID) => {
        setFields({...fields, client:clientID})
        dispatch({type:'LOADING'})
        axios.post('/get-client-information', {...fields,client:clientID})
        .then( ({data}) => {
            console.log(data)
            if(data.targetInfo) setTargetInfo(data.targetInfo)
            if(data.GRTInfo) setGRTInfo(data.GRTInfo)
            if(data.proposalInfo) setProposalInfo(data.proposalInfo)
            if(data.loanInfo) setLoanInfo(data.loanInfo)
        })
        .catch( (err) => {
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally( () => {
            dispatch({type:'STOP_LOADING'})
        }) 
    }
    
    useEffect(()=>{
        init()
    },[])

    return (
        <div>
            <Card>
                <CardHeader>
                    <b> Data Cleaner </b>
                </CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <p className='text-danger'>
                                <b>Note: </b>Delete any data carefully its process never will be undo or restore, after Client delete you want delete Target then its process from Target page
                            </p>
                        </Row>
                        <Row>
                            <Col>
                                <Label> Branches </Label>
                                <ReactSelect
                                    onChange={updateBranch}
                                    options={branches}
                                />
 
                            </Col>                               
                            <Col>
                                <Label> Centers </Label>
                                <ReactSelect
                                    onChange={updateCenter}
                                    options={centers}
                                />
                            </Col>                               
                            <Col>
                                <Label> Client ID </Label>
                                <ReactSelect
                                    onChange={updateClient}
                                    options={clients}
                                />
                            </Col>                               
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Target Information
                            </CardText>
                            {targetInfo.length? 
                                <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                    <thead>
                                        <tr>
                                            <th> TID </th>
                                            <th> Enroll Date </th>
                                            <th> Target Name </th>
                                            <th> Address </th>
                                            <th> Phone </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { targetInfo.map((row,i)=>{
                                            return (<tr key={i}>
                                                <td>{row.id}</td>
                                                <td>{row.created_at}</td>
                                                <td>{row.name}</td>
                                                <td>{row.address}</td>
                                                <td>{row.phone}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>    
                            :null
                            }
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                GRT Information
                            </CardText>
                            {GRTInfo.length? 
                                <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                    <thead>
                                        <tr>
                                            <th> TID </th>
                                            <th> Client ID </th>
                                            <th> GRT Date </th>
                                            <th> Suspend Date </th>
                                            <th> Remarks </th>
                                            <th> : </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { GRTInfo.map((row,i)=>{
                                            return (<tr key={i}>
                                                <td>{'row.id'}</td>
                                                <td>{'row.created_at'}</td>
                                                <td>{'row.name'}</td>
                                                <td>{'row.address'}</td>
                                                <td>{'row.phone'}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>    
                            :null
                            }
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Proposal Information  
                            </CardText>
                            {ProposalInfo.length? 
                                <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                    <thead>
                                        <tr>
                                            <th> Prop ID </th>
                                            <th> Prop Date </th>
                                            <th> Req-Amt </th>
                                            <th> Approve-Amt </th>
                                            <th> Review-Date </th>
                                            <th> Disb-Amt </th>
                                            <th> Disb-Date </th>
                                            <th> : </th>
                                            <th> : </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </Table>    
                            :null
                            }
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Loan Information
                            </CardText>
                            {LoanInfo.length? 
                                <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                    <thead>
                                        <tr>
                                            <th> Prop ID </th>
                                            <th> Loan ID </th>
                                            <th> Disb-Date </th>
                                            <th> Disb-Amt </th>
                                            <th> Paidup </th>
                                            <th> Current-EMI </th>
                                            <th> First Meeting Date </th>
                                            <th> Last M.Date </th>
                                            <th> P-Out </th>
                                            <th> Int-Out </th>
                                            <th> : </th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { LoanInfo.map((row,i) => {
                                            return (<tr key={i}>
                                                <td> {row.prop_id} </td>
                                                <td> {row.loan_id} </td>
                                                <td> {row.disb_date} </td>
                                                <td> {row.disb_amt} </td>
                                                <td> {row.paid_up} </td>
                                                <td> {row.current_emi} </td>
                                                <td> {row.first_meeting_date} </td>
                                                <td> {row.last_modified_date} </td>
                                                <td> {row.p_out} </td>
                                                <td> {row.int_out} </td>
                                                <td> 
                                                    <Link to='#' className='text-decoration-none text-danger'>
                                                       <i className='fa fa-trash' /> Delete Loan & Ledger
                                                    </Link> 
                                                </td>
                                            </tr>)
                                        }) }
                                    </tbody>
                                </Table>    
                            :null
                            }
                        </Row>
                    </Container>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}

export default DataTruncate