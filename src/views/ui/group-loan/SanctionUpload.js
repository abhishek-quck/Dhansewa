import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import ReactSelect from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { preview } from '../../../attachments';

export default function SanctionUpload() {

    const clientRef = useRef(null)
    const dispatch = useDispatch()
    const { loanProducts } = useSelector( state => state.auth )
    const [ branches, setBranches ] = useState([])
    const [ centers, setCenters]       = useState([]);
    const [ clients, setClients]       = useState([]);
    const [ submitted ]     = useState(false);
    const [ open, setModal ] = useState(false)
    const [sFields, setSearchField] = useState({
        branch:'',
        center:'',
        enroll_id:'',
        loan_id:''
    });

    const [ letters, setLetters ] = useState([])

    const init = () => { // GEt Branches, Centers , loan-products & client info

        dispatch({ type:'LOADING' })
        axios.get('get-options') 
        .then(({data}) => 
        {  
            if(data.branches) setBranches(data.branches)  
            
            if(!Object.keys(loanProducts).length) {
                axios.get('get-product-details').then(({data})=> {
                    let loanProducts = {}
                    data.forEach( _ => {
                        loanProducts[_.id] = _
                    });
                    dispatch({
                        type:'SET_LOAN_PRODUCTS',
                        payload:loanProducts
                    })
                }).catch(e=> {})
            }

        })
        .catch(e => dispatch({ type:'ERROR', payload: {code:e.response.status, error:e.message }}))
        .finally(() => dispatch({ type:'STOP_LOADING' }))
        
    }

    const updateBranch = (e) => {

        clientRef.current.clearValue()
        setSearchField({...sFields, branch:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            setCenters(data.map(item => ({ value: item.id, label: item.name})))
            setClients([])
        }).catch(err=>{
            console.log(err.message)
            setCenters([])
            setClients([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
        
    }

    const updateCenter = (e) => {

        setSearchField({...sFields, center:e.value })
        dispatch({ type:'LOADING' })
        axios.get('get-center-used-loans/'+ e.value )
        .then(({data})=> {
            console.log(data)
            setClients(data)
        })
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
            setClients([])
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))
        
    }

    const triggerLoanID = (e) => {
        if(e)
        {
            setSearchField({...sFields, loan_id:e.value })
            fetchData()
        }
    }

    const fetchData = () => {         

        if(sFields.branch && sFields.center && sFields.loan_id)
        {
            dispatch({type:'LOADING'})
            axios.get('/sanction-letters/'+sFields.loan_id)
            .then(({data})=> setLetters(data))
            .catch(e => dispatch({ type:'ERROR', payload:{code:e.response.status, error:e.message}}))
            .finally(()=> dispatch({ type:'STOP_LOADING' }) )
        }

    }

    const handleUpload = e => {
        e.preventDefault();
    }

    const list = async () => {
        dispatch({type:"LOADING"})
        const {data} = await axios.get(`/sanction-letters`)
        setLetters(data)
        dispatch({type:"STOP_LOADING"})
    }

    const showPreview = data => {
        if(data.indexOf('application/pdf')!== -1) {
            return preview(data)
        }
        preview(data, data.split('/')[1],true)
    } 

    const [ file, setFile ] = useState(null)
    const [ current, setCurrent ] = useState({})

    const handleSanction = data => {
        setCurrent(data)
        setModal(!open)
    }

    const uploadSanction = async e => {
        e.preventDefault();
        dispatch({type:"LOADING"})
        let fd = new FormData()
        fd.append('file', file )
        fd.append('id', current.id)
        fd.append('loan_id', current.loan_id)
        fd.append('enroll_id', current.enroll_id)
        fd.append('existing', current.data)
        try {
            const {data} = await axios.post(`/upload-sanction`, fd, {
                headers:{
                    "Accept":"application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization":"Bearer "+localStorage.getItem('auth-token')
                }
            })
            if(data.status) {
                toast.success(data.message)
                setFile(null)
                setModal(!open)
                return list()
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
        dispatch({type:"STOP_LOADING"})
    }
	useEffect(() => {

        init();
        list()
        $(document).on('change','select', function(){
            this.style.border = ''
        });
        return ()=> $(document).off('change','select')
	},[submitted])

    return (
        <div>
            <Card >
                <CardHeader>
                    <b> UPLOAD SANCTION LETTER </b>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleUpload}>
                        <FormGroup>
                            <Row>
                            <Col md="4">
                                <Label size={'sm'} for="branches"> Branch </Label>
                                <ReactSelect
                                    id='branches'
                                    name='branch'
                                    onChange={updateBranch}
                                    options={branches}
                                />
                            </Col > 
                            <Col md="4">
                                <Label size={'sm'} for="center"> Center </Label>
                                <ReactSelect
                                    id='branches'
                                    name='branch'
                                    onChange={updateCenter}
                                    options={centers}
                                />
                            </Col > 
                            <Col md="4">
                                <Label size={'sm'} for="clientID"> Loan ID </Label>
                                <div className="d-flex">
                                    <ReactSelect
                                        id="clientID"
                                        isSearchable
                                        options={clients}
                                        ref={clientRef}
                                        className="w-100 client"
                                        defaultValue={sFields.loan_id}
                                        onChange={triggerLoanID}
                                    /> 
                                </div>
                            </Col > 
                            </Row>   
                        </FormGroup>
                    </Form>
                    <Row>
                        <Container>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Client ID</th>
                                    <th>Loan ID</th>
                                    <th>Name</th>
                                    <th>Loan Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {letters.map( (l,i) => {
                                    return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{l.enroll_id}</td>
                                    <td>{l.loan_id}</td>
                                    <td>{l.client.applicant_name}</td>
                                    <td>{l.date}</td>
                                    <td>
                                        <button 
                                            className='btn btn-primary'
                                            onClick={()=> showPreview(l.data)}
                                        >
                                            View
                                        </button>
                                        {!l.uploaded && 
                                            <button 
                                                className='btn ms-3' 
                                                type='button' 
                                                data-index={i}
                                                style={{ border:'1px dashed' }}
                                                onClick={()=> handleSanction(l)}
                                            >   
                                                Upload
                                            </button>
                                        }
                                    </td>
                                </tr>
                                })}
                            </tbody>
                        </table>
                        </Container>
                    </Row>
                </CardBody>
            </Card>
            <Modal isOpen={open} > 
                <Form onSubmit={uploadSanction} >
                    <ModalHeader> Upload Sanction Letter </ModalHeader>
                        <ModalBody>
                            <Container>
                                <Row>
                                    <FormGroup>
                                        <Label> Choose File </Label>
                                        <Input
                                            type='file'
                                            name='first_day'
                                            accept={'.pdf, .docx'}
                                            onChange={e => setFile(e.target.files[0])}
                                        />
                                    </FormGroup>
                                </Row>
                            </Container>
                        </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" type="submit">
                            Save
                        </button>
                        <button className="btn btn-primary" type="button" onClick={()=> setModal(!open)}>
                            Close
                        </button>
                    </ModalFooter> 
                </Form>
            </Modal>
        </div>
    )
}
