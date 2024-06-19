import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import ReactSelect from 'react-select'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Container, Input, Label, Row, Table } from 'reactstrap'

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
    const branches = [];
    const centers = [];
    const groups = [];
    const clients = [];

    const init = () => {
        dispatch({ type:'LOADING' })
        axios.get('get-options')
        .then(({data}) => 
        { 
            console.log(data) 
        })
        .finally(() => {
            dispatch({ type:'STOP_LOADING' })
        })
    }
    const handleChange = e => {
        setFields({...fields, [e.name]:e.value })
        if(fields.branch && fields.center && fields.group && fields.client)
        {
            fetch()
        }
    } 
    const fetch = () => {
        dispatch({type:'LOADING'})
        axios.post('/get-client-information', fields)
        .then( ({data}) => {
            console.log(data)
            if(data.targetInfo) setTargetInfo(data.targetInfo)
            if(data.GRTInfo) setGRTInfo(data.GRTInfo)
            if(data.proposalInfo) setLoanInfo(data.proposalInfo)
            if(data.LoanInfo) setLoanInfo(data.LoanInfo)
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
                    <b> PRINT DOCUMENTS </b>
                </CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <Label> Branches </Label>
                                <ReactSelect
                                    type='select'
                                    name='branch'
                                    onChange={handleChange}
                                    options={branches}
                                />
 
                            </Col>                               
                            <Col>
                                <Label> Centers </Label>
                                <ReactSelect
                                    type='select'
                                    name='center'
                                    onChange={handleChange}
                                    options={centers}
                                />
                            </Col>                               
                            <Col>
                                <Label> Groups </Label>
                                <ReactSelect
                                    type='select'
                                    name='group'
                                    onChange={handleChange}
                                    options={groups}
                                />
                            </Col>                               
                            <Col>
                                <Label> Client ID </Label>
                                <ReactSelect
                                    type='select'
                                    name='client'
                                    onChange={handleChange}
                                    options={clients}
                                />
                            </Col>                               
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Target Information
                            </CardText>
                            {targetInfo.length? 
                                <Table></Table>    
                            :null
                            }
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                GRT Information
                            </CardText>
                            {GRTInfo.length? 
                                <Table></Table>    
                            :null
                            }
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Proposal Information  
                            </CardText>
                            {ProposalInfo.length? 
                                <Table></Table>    
                            :null
                            }
                        </Row>
                        <Row className='mt-2 mb-2'>
                            <CardText >
                                Loan Information
                            </CardText>
                            {LoanInfo.length? 
                                <Table></Table>    
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

export default PrintDocs