import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import { Card, CardBody, CardFooter, CardHeader, Row, Col, Label, Button, Table, CardText, Container, Form, Modal, FormGroup, Input, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import docEnum from '../../../enums/documentEnum';

function CibilUpload() {

    const dispatch = useDispatch();
    const clientRef = useRef(null)
    
    const {CIBIL} = docEnum
    const [targetInfo, setTargetInfo] = useState([])
    const [cibil, setCibil] = useState(null)
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [fields, setFields]= useState({
        branch:'',
        center:'',
        group:'',
        client:'',
    })
    const [tooltipOpen, setTooltip] = useState(false)
    // options
    const [branches, setBranches] = useState([]);
    const [centers, setCenters] = useState([]);
    const [clients, setClients] = useState([]);

    const onFileChange = e => setCibil(e.target.files[0])
    const toggle = () => setTooltip(!tooltipOpen)
    const init = () => {
        dispatch({ type:'LOADING' })
        axios.get('get-options')
        .then(({data}) => 
        { 
            if(data.branches) setBranches(data.branches) 
        })
        .finally(() => dispatch({ type:'STOP_LOADING' }))
    
    }
    
    const updateBranch = (e) => {
        setFields({...fields, branch:e.value})
        clientRef.current?.clearValue()
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            setCenters(data.map( item => ({ value: item.id, label: item.name})))
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
        axios.post('/search-enrolled/'+clientID+'/'+ CIBIL )
        .then( ({data}) => {
            setTargetInfo(data?.data)
        })
        .catch( (err) => {
            console.log(err)
            toast.error('Something went wrong!')
        })
        .finally( () => dispatch({type:'STOP_LOADING'})) 
    }

    const uploadCibil = e => {

        e.preventDefault();

        let fd = new FormData()
        fd.append('enroll_id', fields.client )
        fd.append('doc_id', CIBIL )
        fd.append('cibil', cibil )

        dispatch({ type:'LOADING' })
        axios.post('upload-cibil', fd, {
			headers:{
				"Accept":"application/json",
				"Content-Type": "multipart/form-data",
				"Authorization":"Bearer "+localStorage.getItem('auth-token')
			}
		})
        .then(({data})=> {
            toast.success(data.message);
            fetch(fields.client)
        })
        .catch( e => {
            console.log(e.message)
            toast.error('Something went wrong!')
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))

    }

    useEffect(()=>{
        init();
    },[]);

    return (
        <>
            <Card>
                <CardHeader>
                    <b> CIBIL UPLOAD </b>
                    <i className='ms-2 fa-regular fa-circle-question' id='tooltip' />
                    <Tooltip
                        placement={'right'}
                        isOpen={tooltipOpen}
                        target={'tooltip'}
                        toggle={toggle}
                    >
                        Upload cibil after CGT & GRT is completed!
                    </Tooltip>
                </CardHeader>
                <CardBody>
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
                        <Container>
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
                                            <td>{'CIBIL'}</td>
                                            <td>
                                                <Button className='btn-primary' onClick={toggleModal} > Upload </Button>
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
                        </Container>
                    </Row>
                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
            <Modal isOpen={modal} toggle={toggleModal} >
                <Form onSubmit={uploadCibil}>
                    <ModalHeader toggle={toggleModal}> Upload CIBIL </ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Input
                                type="file"
                                id="cibil"
                                name="cibil"
                                onChange={onFileChange}
                                accept='application/pdf'
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
            </Modal>
        </>
    )
}

export default CibilUpload