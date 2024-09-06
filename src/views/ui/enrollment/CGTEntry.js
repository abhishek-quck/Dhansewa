import $ from 'jquery'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'

const CGTEntry = () => {
    const [sFields, setFields] = useState({ 
        branch:'', 
        employee:'', 
        process:'pending', 
        term:''
    });
    const [client, setClient]     = useState(null);
    const [images, setImages]     = useState({ first_day:null, second_day:null });
    const [modal, setModal ]      = useState(false);
    const [branches, setBranches] = useState([]);
    const [clients, setClients]   = useState([]);
    const toggleModal = () => setModal(!modal);
    // const processes = [
    //     {value:'all',label:'ALL'},
    //     {value:'pending',label:'PENDING'},
    //     {value:'hold',label:'HOLD'},
    //     {value:'under_process',label:'UNDER_PROCESS'},
    //     {value:'approved',label:'APPROVED'},
    //     {value:'editable',label:'EDITABLE'},
    //     {value:'reject',label:'REJECT'},
    //     {value:'forgery',label:'FORGERY'},
    //     {value:'cgt_entry',label:'CGT_ENTRY'},
    //     {value:'cgt_revised',label:'CGT_REVISED'},
    //     {value:'doc_uploaded',label:'DOC_UPLOADED'},
    //     {value:'grt_complete',label:'GRT_COMPLETE'},
    //     {value:'cb_approved',label:'CB_APPROVED'},
    // ];
    // const employeeRef = useRef(null);
    // const processRef = useRef(null);
    // const [employees, setEmployees] = useState([])
    const searchRef = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = e => {
        
        e.preventDefault();
        dispatch({ type:'LOADING' })
        axios.post('/search-enrolled', sFields )
        .then(({ data }) => {
            // console.log(data)
            setClients(data)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))

    }
    
    const openModal = e => {
        let {client} = e.target
        setClient(client)
        toggleModal(!modal); 
    }

    const uploadCGT = e => {

        e.preventDefault();
        if(!images.first_day || client===null )
        {
            return toast('Upload first day image first!',
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
            console.log(data);
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
        if(e)
        {
            setFields({...sFields, branch:e.value})
            setTimeout(()=>$('#search-cgt').trigger('click'), 500)
        }
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
        }).catch(err=>err.message).finally()
    },[]);

    return (
    <>
        <Card className="col-12">
            <CardHeader tag="h6" className="d-flex gap-auto" >
                <span 
                    className="mt-2 mb-2 fa-solid fa-arrow-rotate-left" 
                />
                <b className="m-2"> CLIENT SOURCING </b>
                <Link to={`/add-enrolled-cgt`} 
                    className="btn btn-sm btn-rounded btn-primary" 
                    style={{position:'absolute',left:'93%'}}
                >
                    <i className="fa fa-plus"/> New 
                </Link> 
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
                                                    color='primary'
                                                    data-client={row.id}
                                                    type='button'
                                                    onClick={openModal}
                                                > Upload 
                                                </Button>
                                            </td> 
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Row>
            </CardBody>
        </Card>
        <Modal isOpen={modal} toggle={toggleModal} > 
            <Form onSubmit={uploadCGT} >
                <ModalHeader toggle={toggleModal}> Previous Loans </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <FormGroup>
                                    <Label> First Day Photo </Label>
                                    <Input 
                                        type='file'
                                        name='first_day'
                                        accept='image/*'
                                        onChange={handleFile}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Revised Photo </Label>
                                    <Input 
                                        type='file'
                                        name='second_day'
                                        accept='image/*'
                                        onChange={handleFile}
                                    />
                                </FormGroup>
                            </Row>
                        </Container>
                    </ModalBody>
                <ModalFooter>
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