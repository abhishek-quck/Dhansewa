import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Container, Label, Row, Table }
from 'reactstrap'

var allData = {branch:{}, center:{}, clients:{}}
function PrintDocs() {
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
    const clientRef = useRef(null)

    // options
    const [branches, setBranches] = useState([]);
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);

    const printPassbook = async(e) => {

        dispatch({type:'LOADING'})
        let loan = e.target.dataset.loan
        return axios.get(`print-passbook/${fields.client}/${loan}`,
            {
            responseType:'blob',
            headers:{
            "Content-Type": "multipart/form-data",
            "Authorization":"Bearer "+localStorage.getItem('auth-token')
        }}
        ).then(({data}) => {
            const href = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href  = href 
            link.download= "Client "+fields.client+'-passbook.pdf' // Don't ignore <3
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
        .finally( ()=> {
            dispatch({type:'STOP_LOADING'})
        })

    }
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

    const updateClient = (e) => {
        if(e) {
            setFields({...fields, client:e.value})
            fetch(e.value)
        }
    }

    const downloadSanction = async loanID => {
        
        dispatch({type:'LOADING'})
        return axios.get('download-sanction/'+fields.client+'/'+loanID,
        {
            responseType:'blob',
            headers:{
                "Content-Type": "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }}
        ).then(({data}) => {
            const href = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href  = href 
            link.download='Sanction_letter_'+targetInfo[0]?.name+'.pdf' 
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
        .catch(()=> toast('In progress.. Will be available soon!',
            {
                icon: '⚠️',
                style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                },
            }
        ))
        .finally( ()=> dispatch({type:'STOP_LOADING'}))
    }

    const fetch = (clientID) => {
        setFields({...fields, client:clientID})
        dispatch({type:'LOADING'})
        axios.post('/get-client-information', {...fields,client:clientID})
        .then( ({data}) => {
            if(data.targetInfo) setTargetInfo(data.targetInfo)
            if(data.GRTInfo) setGRTInfo(data.GRTInfo)
            if(data.proposalInfo) setProposalInfo(data.proposalInfo)
            if(data.loanInfo) setLoanInfo(data.loanInfo)
        })
        .catch( (err) => {
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally( () => dispatch({type:'STOP_LOADING'})) 
    }
    
    useEffect(()=> init(),[])

    return (
        <div>
            <Card>
                <CardHeader>
                    <b> PRINT DOCUMENTS </b>
                </CardHeader>
                <CardBody>
                    <Container>
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
                        {fields.client && (
                            <>
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
                        {GRTInfo.length ?
                            <Row className='mt-2 mb-2'>
                                <CardText >
                                    GRT Information
                                </CardText>
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
                                                    <td>{row.id}</td>
                                                    <td>{row.enroll_id}</td>
                                                    <td>{row.grt_date}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.address}</td>
                                                    <td>{row.phone}</td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </Table>    
                            </Row>
                        :null}
                        {/* <Row className='mt-2 mb-2'>
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
                        </Row> */}
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Loan Information
                            </CardText>
                            <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                <thead>
                                    <tr>
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
                                        <th> : </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { LoanInfo.map((row,i) => {
                                        return (<tr key={i}>
                                            <td> {row.loan_id} </td>
                                            <td> {row.created_at} </td>
                                            <td> {row.loan_amount} </td>
                                            <td> {row.paid_up??''} </td>
                                            <td> {row.ledger.length===0?1 : row.ledger.emi_no + 1 } </td>
                                            <td> {row.created_at} </td>
                                            <td> {row.last_modified_date} </td>
                                            <td> {row.p_out} </td>
                                            <td> {row.int_out} </td>
                                            <td> 
                                                <Link to='#' onClick={()=> downloadSanction(row.loan_id)} className='text-decoration-none'>
                                                    Sanction Letter
                                                </Link> 
                                            </td>
                                            <td> 
                                                <Link to='#' data-loan={row.loan_id} onClick={printPassbook} className='text-decoration-none'>
                                                    Print Passbook
                                                </Link> 
                                            </td>
                                        </tr>)
                                    }) }
                                    { LoanInfo.length=== 0 ? <tr>
                                        <td colSpan={10}><h6 className='text-danger text-center'>No Disbursement Yet </h6></td>
                                    </tr> : null}
                                </tbody>
                            </Table>    
                        </Row>
                        </>
                        )}
                    </Container>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}

export default PrintDocs