import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Container, Label, Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, FormGroup }
from 'reactstrap'
import { preview } from '../../../attachments'
import docEnum from '../../../enums/documentEnum'

var allData = {branch:{}, center:{}, clients:{}}
function ManagePassbook() {

    const {isAdmin} = useSelector( state => state.auth )
    const dispatch = useDispatch()
    const clientRef = useRef(null)
    const [fields, setFields]= useState({
        branch:'',
        center:'',
        client:'',
    })

    const status = [
        { value : 1, label:'APPROVE' },
        { value : 2, label:'REJECT' },
        { value : 3, label:'FURTHER' }
    ];

    const [targetInfo, setTargetInfo] = useState([])
    const [reply, setReply]           = useState({status:'',remark:''});
    // options
    const [branches, setBranches]     = useState([]);
    const [centers, setCenters]       = useState([]);
    const [clients, setClients]       = useState([]);
    const [passbook, setPassbook]     = useState(null)
    const [modal, setModal]           = useState(false);
    const toggleModal = () => setModal(!modal);

    const {POST_APPRAISAL_DOC} = docEnum
    const previewDoc = (dataArr,filename) => {
        preview(dataArr,filename )
    }

    const onFileChange = e => setPassbook(e.target.files[0])

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
            let options=[]
            if(data.length) {
                for (const item of data) {
                    options.push({ value: item.id, label: item.name})
                }
            }
            setCenters(options)
            setClients([])
        }).catch(err=>{
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
        axios.post('/search-enrolled/'+clientID+'/'+ POST_APPRAISAL_DOC )
        .then( ({data}) => {
            setTargetInfo(data?.data)
        })
        .catch( (err) => {
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally( () => dispatch({type:'STOP_LOADING'})) 
    }

    // admin to approve or reject the passbook

    const uploadPassbook = e => {

        e.preventDefault();

        let fd = new FormData()
        fd.append('enroll_id', fields.client )
        fd.append('doc_id', POST_APPRAISAL_DOC )
        fd.append('passbook', passbook )

        dispatch({ type:'LOADING' })
        axios.post('upload-client-passbook', fd, {
			headers:{
				"Accept":"application/json",
				"Content-Type": "multipart/form-data",
				"Authorization":"Bearer "+localStorage.getItem('auth-token')
			}
		})
        .then(({data})=> toast.success(data.message))
        .catch( e => {
            console.log(e.message)
            toast.error('Something went wrong!')
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))

    }

    const actOnPassbook = e => {
        e.preventDefault();
        
        dispatch({ type:'LOADING' })
        axios.post('act-on-passbook', {...reply, enroll_id: fields.client } )
        .then(({data}) => toast.success(data.message))
        .catch(e => {
            console.log(e.message)
            toast.error('Something went wrong!')
        })
        .finally(()=> dispatch({ type:'STOP_LOADING' }))
    }

    useEffect(()=>{
        init()
    },[])

    return (
        <div>
            <Card>
                <CardHeader>
                    <b> Manage Passbook </b>
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
                            <CardText >
                                Target Information
                            </CardText>
                                
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
                                { targetInfo.length? 
                                            targetInfo.map((row,i)=>{
                                            return (<tr key={i}>
                                                <td>{row.id}</td>
                                                <td>{row.applicant_name}</td>
                                                <td>{'Passbook'}</td>
                                                <td>
                                                    { row.documents.length ? (
                                                        <>
                                                        <span 
                                                            className='text-decoration-none text-dark' data-id={row.id} 
                                                            onClick={()=>previewDoc([row.documents[0].data], row.documents[0].file_name)} 
                                                            style={{cursor:'pointer'}}
                                                        > 
                                                            {
                                                                (row.documents[0].data).includes('application/pdf') ? 
                                                                <i className='fs-3 fa-regular fa-file-pdf'/> : 
                                                                <i className='fa fa-paperclip'/> 
                                                            }
                                                        </span> &nbsp;&nbsp;
                                                        <Button className='action-btn' onClick={toggleModal}> Manage </Button>
                                                        </>
                                                    ) : (
                                                        <Button className='btn-primary' onClick={toggleModal} > Upload </Button>
                                                    )}
                                                </td>
                                            </tr>)
                                        })
                                        :(<tr>
                                            <td colSpan={4} className='text-danger text-center'> 
                                                <h5>{fields.client ? ' No documents uploaded or needs re-upload! ': ''}</h5> 
                                            </td>
                                        </tr>)
                                    }
                                    </tbody>
                                </Table>    
                        </Row>
                    </Container>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
            <Modal isOpen={modal} toggle={toggleModal} >
                { isAdmin && targetInfo.length && targetInfo[0].documents.length ?
                 (<Form onSubmit={actOnPassbook}>
                    <ModalHeader toggle={toggleModal}> Update Profile </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label> Status </Label>
                            <ReactSelect 
                                options={status}
                                className='status'
                                onChange={e => setReply({...reply, status:e.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label> Remark </Label>
                            <Input 
                                type={'textarea'}
                                name='remark'
                                onChange={ e => setReply({...reply, remark:e.target.value})}
                            />
                        </FormGroup> 
                       
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={toggleModal}>
                            Update 
                        </button>{' '}
                        <button className="btn btn-outline-primary" type="button" onClick={toggleModal}>
                            Close
                        </button>
                    </ModalFooter>
                </Form>): (

                <Form onSubmit={uploadPassbook}>
                    <ModalHeader toggle={toggleModal}> Upload Passbook </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="post_appraisal_passbook"> Passbook </Label>
                            <Input
                                type="file"
                                id="post_appraisal_passbook"
                                name="post_appraisal_passbook"
                                onChange={onFileChange}
                                accept='image/*, application/pdf'
                            />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={toggleModal}>
                            Submit
                        </button>{' '}
                        <button className="btn btn-outline-primary" type="button" onClick={toggleModal}>
                            Close
                        </button>
                    </ModalFooter>
                </Form>
                )}
            </Modal>
        </div>
    )
}

export default ManagePassbook