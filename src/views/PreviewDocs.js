import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import ReactSelect from 'react-select'
import { Card, CardBody, CardFooter, CardHeader, CardText, Col, Container, Label, Row, Table }
from 'reactstrap'
import { preview } from '../attachments'
import { getDocumentName } from '../helpers/utils'

var allData = {branch:{}, center:{}, clients:{}}
function PreviewDocs() {

const dispatch = useDispatch()
const clientRef = useRef(null)
const [fields, setFields]= useState({
    branch:'',
    center:'',
    group:'',
    client:'',
})
const [targetInfo, setTargetInfo] = useState([])
const [sanctionLetter, setSanctionLetter] = useState([])
const [clientName, setClientName] = useState('')
// options
const [branches, setBranches] = useState([]);
const [centers, setCenters] = useState([]);
const [clients, setClients] = useState([]);

const previewDoc = (dataArr,filename) => {
    preview(dataArr,filename )
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
    }).finally(()=>dispatch({type:'STOP_LOADING'}))
    // setClients(allData['clients'][e.value])
}
const updateClient = (e) => {
    if(e)
    {
        setFields({...fields, client:e.value})
        fetch(e.value)
    }
}

const fetch = clientID => {
    setFields({...fields, client:clientID})
    dispatch({type:'LOADING'})
    axios.get('get-client-documents/'+clientID )
    .then( ({data}) => {
        setTargetInfo(data.documents) 
        setSanctionLetter(data.sanction)
        setClientName(data.applicant_name)
    })
    .catch( (err) => {
        console.log(err)
        toast.error('Something went wrong!')
    })
    .finally( () => dispatch({type:'STOP_LOADING'})) 
}

useEffect(()=>{
    init()
},[])

return (
    <div>
        <Card>
            <CardHeader>
                <b> PREVIEW DOCUMENTS </b>
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
                                ref={clientRef}
                            />
                        </Col>                               
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <CardBody>
                        <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                <thead>
                                    <tr>
                                        <th> TID </th>
                                        <th> Target Name </th> 
                                        <th> Attachment Type </th>
                                        <th> Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    targetInfo.map((row,i)=>{
                                        return (<tr key={i}>
                                            <td>{row.id}</td>
                                            <td>{clientName}</td>
                                            <td>{row.date? 'SANCTION LETTER' :getDocumentName(row.document_id)??row.file_name}</td>
                                            <td>
                                                <span 
                                                    className='text-decoration-none text-dark' data-id={row.id} 
                                                    onClick={()=>previewDoc([row.data], row.file_name)} 
                                                    style={{cursor:'pointer'}}
                                                > 
                                                    {
                                                    (row.data).includes('application/pdf') ? 
                                                        <i className='fs-3 fa-regular fa-file-pdf'/> : 
                                                    <i className='fa fa-paperclip'/> 
                                                    }
                                                </span>
                                            </td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </Table>  
                        </CardBody>  
                    </Row>
                    {sanctionLetter.length ? (
                        <Row className='mt-2 mb-2'>
                        <CardText >
                            <h6>Sanction Letter</h6>
                        </CardText>
                         
                        <CardBody>
                        <Table dashed={''} bordered hover style={{fontSize:'small'}}>
                                <thead>
                                    <tr>
                                        <th> Loan ID </th>
                                        <th> Issued On </th> 
                                        <th> Attachment Type </th>
                                        <th> Preview </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    sanctionLetter.map((row,i)=>{
                                        return (<tr key={i}>
                                            <td>{row.loan_id}</td>
                                            <td>{row.date}</td>
                                            <td>{'SANCTION LETTER'}</td>
                                            <td>
                                                <span 
                                                    className='text-decoration-none text-dark' data-id={row.id} 
                                                    onClick={()=>previewDoc([row.data], clientName)} 
                                                    style={{cursor:'pointer'}}
                                                > 
                                                    <i className='fs-3 fa-regular fa-file-pdf'/> 
                                                </span>
                                            </td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </Table>    
                        </CardBody>
                    </Row>
                    ): null}
                </Container>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
    </div>
)
}

export default PreviewDocs