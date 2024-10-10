import $ from 'jquery'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table, Tooltip } from 'reactstrap'
import { preview } from '../../../attachments'
import docEnum from '../../../enums/documentEnum';

const CGTEntry = () => {

    const [tooltipOpen, setTooltip] = useState(false)
    const {isAdmin} = useSelector( state => state.auth );
    const [sFields, setFields] = useState({ 
        branch:'', 
        employee:'', 
        process:'pending', 
        term:''
    });
    const {CGT_FIRST, CGT_SECOND} = docEnum
    const [client, setClient]     = useState(null);
    const [images, setImages]     = useState({ first_day:null, second_day:null });
    const [loadedImages, put]     = useState({});
    const [askImage, askFor ]     = useState({ first:false, second:false })
    const [modal, setModal ]      = useState(false);
    const [branches, setBranches] = useState([]);
    const [clients, setClients]   = useState([]);
    const [searched, setSearch]   = useState(false);

    const processes = [ 
        {value:'pending',label:'PENDING'},  
        {value:'approved',label:'APPROVED'}, 
        {value:'reject',label:'REJECT'},
        {value:'forgery',label:'FORGERY'},
        {value:'cgt_entry',label:'CGT_ENTRY'},
        {value:'cgt_revised',label:'CGT_REVISED'},
    ];

    const toggleModal = () => {
        if( modal===true ) {
            setImages({first_day:null, second_day:null});
        }
        setModal(!modal)
    };
    const toggle = () => setTooltip(!tooltipOpen)

    const previewImage = e => {

        let { doc_id }= e.target.dataset;
        let b64image = loadedImages[client][doc_id];
		preview([b64image])

	}

    const searchRef = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = e => {  // searching form
        
        e.preventDefault();
        dispatch({ type:'LOADING' })
        axios.post('/search-enrolled', sFields )
        .then(({ data }) => {
            let docs = {}
            data.forEach( row => {
                if( row.documents && row.documents.length ) {
                    row.documents.forEach( doc => {
                        docs[row.id] = {...docs[row.id] , [doc.document_id]: doc.data}
                    })
                } 
            })
            put(docs)
            setClients(data)
            setSearch(true)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))

    }
    
    const openModal = e => {
        let { client,first, second } = e.target.dataset
        askFor({...askImage, first:first!=='0', second:second!=='0'})
        setClient(client)
        toggleModal(!modal); 
    }

    const uploadCGT = e => {  // upload CGT form

        e.preventDefault();
        if( askImage.first || client===null || client===undefined )
        {
            return toast(client===undefined? 'Select the client first' :'Upload first day image first!',
                {
                    icon: '⚠️',
                    style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    },
                }
            );
        }
        let fd = new FormData();
        fd.append('enroll_id', client );
        for (const key in images) {
            if(images[key]) {
                fd.append(key, images[key]);
            }
        }
        dispatch({ type:"LOADING" });
        axios.post('add-client-cgt', fd, {
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data}) => {
            setTimeout(()=>$('#search-cgt').trigger('click'), 500)
            toast.success(data.message)
            toggleModal()
        }).catch(e => console.log(e.message))    
        .finally(()=> dispatch({ type: 'STOP_LOADING' }));
    
    }

    const handleFile = e => {

        let file = e.target.files[0];
		let name = e.target.name;
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = function() {
			if( name === 'first_day') {
				setImages({...images, first_day:file});
			} else {
				setImages({...images, second_day:file})
			}
        }; 
    }
    
    const updateBranch = e => {
        if(e) {
            setFields({...sFields, branch:e.value})
            setTimeout(()=>$('#search-cgt').trigger('click'), 500)
        }
    }

    const updateProcess = e => {
        setFields({...sFields, process:e.value });
        setTimeout(()=> $('#search-cgt').trigger('click'), 500 );
    }

    const updateSearch = e => {
        if(e) {
            setFields({...sFields, term:e.target.value});
        }
    }

    useEffect(()=>{
        
        axios.get('get-branches')
        .then(({data}) => {
            let options = [{value:'', label: 'Choose'}]
            data.forEach( item => options.push({ value:item.id, label:item.name}) );
            setBranches(options)
            setTimeout(()=>$('#search-cgt').trigger('click'), 500 );
        }).catch(err=>err.message).finally()

    },[]);

    return (
    <>
        <Card className="col-12">
            <CardHeader tag="h6" className="d-flex gap-auto" >
                <b className="ms-2"> CLIENT SOURCING </b> <i className ="ms-2 fa-regular fa-circle-question" id="tooltip" />
                <Tooltip
                    placement={'right'}
                    isOpen={tooltipOpen}
                    target={'tooltip'}
                    toggle={toggle}
                >
                    After the enrollment is completed!
                </Tooltip>
            </CardHeader>
            <CardBody>
                <Row>
                <Form onSubmit={handleSubmit} name="speedLoan">
                <FormGroup>
                    <Row className="">
                        <Col md="4">
                            <Label size={'sm'} for="branches"> Branches </Label>
                            <ReactSelect
                                id='branches'
                                onChange={updateBranch}
                                options={branches}
                            />
                        </Col > 
                        {isAdmin && 
                        <Col md="4">
                            <Label size={'sm'} for="process"> Process </Label>
                            <ReactSelect
                                id='process'
                                onChange={updateProcess}
                                options={processes}
                            />
                        </Col > }
                        <Col md="4">
                            <Label size={'sm'} for="search"> Search </Label>
                            <div className="d-flex">
                                <Input
                                    id="search"
                                    ref={searchRef}
                                    className="w-100 search"
                                    placeholder='Search by name/phone/KYC'
                                    defaultValue={sFields.term}
                                    onChange={updateSearch}
                                /> 
                                <button className='btn btn-primary' 
                                    type='submit'
                                    id='search-cgt'
                                >
                                    <i className='fa fa-search' />
                                </button>
                            </div>
                        </Col > 
                        </Row>   
                    </FormGroup> 
                    </Form>
                </Row>
                <Row>
                    <Container>
                        <Table>
                            <thead>
                                <tr>
                                    <th> SNo </th>
                                    <th> ClientID </th>
                                    <th> Name </th>
                                    <th> Phone </th>
                                    <th> Aadhaar </th>
                                    <th> State </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clients.length ? (
                                        clients.map( (row,i) => {
                                            return (<tr key={i}>
                                                <td>{i+1}</td>
                                                <td>{row.id}</td>
                                                <td>{row.applicant_name}</td>
                                                <td>{row.phone}</td>
                                                <td>{row.aadhaar}</td>
                                                <td>{row.state}</td> 
                                                <td>
                                                    <Button 
                                                        className='btn-primary action-btn'
                                                        data-client={row.id}
                                                        data-first={
                                                            loadedImages[row.id] && 
                                                            loadedImages[row.id][CGT_FIRST]!==undefined ? 1: 0
                                                        }
                                                        data-second={
                                                            loadedImages[row.id] && 
                                                            loadedImages[row.id][CGT_SECOND]!==undefined ? 1: 0
                                                        }
                                                        type='button'
                                                        onClick={openModal}
                                                    >
                                                        { row.cgt_complete || sFields.process==='cgt_revised'? 'View':'Upload' }
                                                    </Button>
                                                    
                                                    { ['cgt_revised','forgery'].includes(sFields.process) && isAdmin && 
                                                        !row.cgt_complete && 
                                                        <>
                                                        <div className='btn action-btn' title='Approve or reject the CGT.' >
                                                            <Link to={`/manage-enrolled-cgt/${row.id}`} className='text-decoration-none'>
                                                                Manage
                                                            </Link>
                                                        </div>
                                                        </>
                                                    }
                                                </td> 
                                            </tr>)
                                        })
                                    ) : ( 
                                            <tr>
                                            <td colSpan={7} className='text-center'>
                                                {searched? (
                                                    <h6 className='text-danger'>{ 'No Records Found!' }</h6>
                                                ): (
                                                    <Spinner color="dark"/>
                                                )}
                                            </td>
                                        </tr> 
                                    )
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Row>
            </CardBody>
        </Card>
        <Modal isOpen={modal} toggle={toggleModal} > 
            <Form onSubmit={uploadCGT} >
                <ModalHeader toggle={toggleModal}> Upload CGT </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <FormGroup>
                                    <Label> First Day Photo </Label>
                                    {!askImage.first && <Input 
                                        type='file'
                                        name='first_day'
                                        accept='image/*'
                                        onChange={handleFile}
                                        disabled={askImage.first}
                                    />}
                                    {loadedImages[client] && loadedImages[client][CGT_FIRST] &&
                                    <button 
                                        className={askImage.first?'btn ms-4 mt-2':'btn mt-2'} 
                                        type='button'  
                                        data-doc_id={CGT_FIRST}
                                        onClick={ previewImage } 
                                        style={{ border:'1px dashed' }}
                                    > 
                                        Preview 
                                    </button> }
                                </FormGroup>
                                <FormGroup>
                                    <Label> Revised Photo </Label>
                                    {!askImage.second && <Input 
                                        type='file'
                                        name='second_day'
                                        accept='image/*'
                                        onChange={handleFile}
                                        disabled={askImage.second}
                                    />}
                                    {loadedImages[client] && loadedImages[client][CGT_SECOND] &&
                                    <button 
                                        className={ askImage.second?'btn ms-4 mt-2':'btn mt-2'} 
                                        type='button'  
                                        data-doc_id={CGT_SECOND}
                                        onClick={ previewImage } 
                                        style={{ border:'1px dashed' }}
                                    > 
                                        Preview 
                                    </button> }
                                </FormGroup>
                            </Row>
                        </Container>
                    </ModalBody>
                <ModalFooter>
                    {(!askImage.first || !askImage.first )  && !['approved','reject'].includes(sFields.process) &&
                        isAdmin &&
                        <button className="btn btn-success" type="submit">
                            Save
                        </button>
                    }
                    <button className="btn btn-primary" type="button" onClick={toggleModal}>
                        Close
                    </button>
                </ModalFooter> 
            </Form>
        </Modal>
    </>
    )
}
 
export default CGTEntry