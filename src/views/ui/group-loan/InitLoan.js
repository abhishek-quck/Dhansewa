import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import ReactSelect from 'react-select';
import { Card, CardBody, CardHeader, Col, Container, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

function InitLoan() {

    const dispatch = useDispatch();
    const [modal, setModal]      = useState(false);
    const [branches,setBranches] = useState([]);
    const [centers, setCenters ] = useState([]);
    const [fields, setFields  ]  = useState({branch:''});
    const [clients, setClients]  = useState([]);
    const [search, setSearch]    = useState(false);
    const [previous,setPrevious] = useState([]);
    const style = { cursor:'pointer' }
    
    const toggleModal = () => setModal(!modal);

    const generateLoanID = e => {

        let {client_id} = e.target.dataset
        dispatch({ type:'LOADING' });
        axios.get('initiate-client-loan/'+ client_id, )
        .then(({ data }) => {
            if(data.status) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        }).catch( e => {
            console.log(e.message)
            dispatch({ type:'ERROR', payload:{ error:e.message }})
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))

    }

    const viewPrevious = e => {
        let {client_id} = e.target.dataset;
        dispatch({ type:'LOADING' });
        axios.get('view-client-loan/'+ client_id )
        .then(({data})=>{
            setPrevious(data.data)
            toggleModal();
        }).catch(er=>console.log(er))
        .finally(()=>dispatch({ type:'STOP_LOADING' }));
    } 

    const updateBranch = (e) => {
        setFields({...fields, branch:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            let options=[]
            if(data.length) {
                for (const item of data) {
                    options.push({ value: item.id, label: item.name})
                }
            }
            setCenters(options)
            axios.get('get-branch-client-info/'+ e.value).then(({data})=> setClients(data.data))
        }).catch(err=>{
            console.log(err.message)
            setCenters([])
        }).finally(()=>dispatch({ type:'STOP_LOADING' }))
    }
    
    const updateCenter = (e) => {

        setSearch(e.value);
        setFields({...fields, center:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-center-client-info/'+ e.value )
        .then(({data})=> {
            console.log(data)
            setClients(data.data);
        })
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
        }).finally(()=> dispatch({type:'STOP_LOADING'}))

    }
    

    useEffect(()=> {

        dispatch({ type:'LOADING' });
        axios.get('get-options').then(({data}) => setBranches(data.branches) ).catch()
        .finally(() => dispatch({ type:'STOP_LOADING' }))

    },[dispatch]);

    return (
        <>
            <Card>
                <CardHeader>
                    <b> INITIATE LOAN </b>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <Label> Branches </Label>
                            <ReactSelect
                                onChange={updateBranch}
                                options={branches}
                            />

                        </Col>                               
                        <Col md={3}> 
                            <Label> Centers </Label>
                            <ReactSelect
                                onChange={updateCenter}
                                options={centers}
                            />
                        </Col>                            
                    </Row>
                    <Container>
                    <Row className='mt-4'>
                        <Table
                            bordered 
                            hover
                            style={{fontSize:'small'}}
                        >
                            <thead className='bg-blue'>
                                <tr>
                                    <th> Action </th>
                                    <th> Previous </th>
                                    <th> SR </th>
                                    <th> Applicant Name </th>
                                    <th> Address </th>
                                    <th> Phone </th>
                                    <th> Village </th>
                                    <th> Center ID </th>
                                    <th> Aadhaar </th>
                                </tr>
                            </thead>
                        <tbody> 
                            {  clients.map((row,index) => {
                                return (<tr key={index}>
                                    <td>
                                        <span 
                                            onClick={generateLoanID} 
                                            className="text-primary"
                                            data-client_id={row.enc}
                                        > 
                                            Generate Loan ID 
                                        </span>
                                    </td>
                                    <td>
                                        <span className='text-primary' data-client_id={row.id} style={style} onClick={viewPrevious}> View </span>
                                    </td>
                                    <td>{index+1}</td>
                                    <td>{row.applicant_name}</td>
                                    <td>{row.district??'N/A'}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.village??'N/A'}</td>
                                    <td>{row.center_id??'N/A'}</td>
                                    <td>{row.aadhaar}</td>
                                </tr>)
                                }) 
                            }
                            {
                                search && clients.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center text-danger">
                                        <h5> No records found! </h5>
                                    </td>	
                                </tr> ) : null 
                            }
                        </tbody>
                        </Table> 
                    </Row>
                    </Container>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggleModal} >
                
                <ModalHeader toggle={toggleModal}> Previous Loans </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Table bordered hover>
                                    <thead>
                                        <tr>
                                            <th>LOAN ID</th>
                                            <th>Created On</th>
                                            <th>Created By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previous.length? (
                                            previous.map( row => {
                                                return (
                                                    <tr key={row.loan_id}>
                                                        <td><span>{row.loan_id}</span></td>
                                                        <td><span>{row.created_at}</span></td>
                                                        <td><span>{row.creator}</span></td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td className='text-center text-danger' colSpan={3}>
                                                    <span>No records</span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Row>
                        </Container>
                    </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" type="button" onClick={toggleModal}>
                        Close
                    </button>
                </ModalFooter>
                 
            </Modal>
        </>
    )
}

export default InitLoan