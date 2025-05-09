import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import ReactSelect from 'react-select';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

function RTGS() {

    const dispatch = useDispatch();
    const [modal, setModal]      = useState(false);
    const [branches,setBranches] = useState([]);
    const [centers, setCenters ] = useState([]);
    const [fields, setFields  ]  = useState({branch:''});
    const [clients, setClients]  = useState([]);
    const [search, setSearch]    = useState(false);
    const [previous,setPrevious] = useState([]);
    const [multiples, setMultiples ] = useState([]);
    const toggleModal = () => setModal(!modal);

    const iStyle = {height:'1.5rem',width:'1.5rem'}
    const generateRTGS = async e => {

        let {client_id, name} = e.target.dataset
        dispatch({ type:'LOADING' });

        return axios.get('generate-rtgs/'+ client_id,
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
            link.download='RTGS_'+name+'.xlsx' 
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
        .catch((e)=> {
            toast('In progress.. Will be available soon!',
                {
                    icon: '⚠️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
        })
        .finally( ()=> dispatch({type:'STOP_LOADING'}))
    
    }

    const generateRTGSmultiple = () => {
        
        dispatch({ type:'LOADING' });
        const client=[];
        multiples.forEach( c => {
            client.push(clients[c].id)
        })
        return axios.post('generate-multiple-rtgs', {clients:client},
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
            link.download='RTGS_.xlsx' 
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
        .catch((e)=> {
            toast('In progress.. Will be available soon!',
                {
                    icon: '⚠️',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
        })
        .finally( ()=> dispatch({type:'STOP_LOADING'}))
    
    }

    const addTo = event => {
        const {index} = event.target.dataset
        if(event.target.checked) {
            setMultiples([...multiples, index])
        } else {
            setMultiples(multiples.filter( item => item!== index))
        }
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
            setCenters(data.map( item => ({ value: item.id, label: item.name})))
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
        axios.get('get-options').then(({data}) => setBranches(data.branches) ).catch(e=>{})
        .finally(() => dispatch({ type:'STOP_LOADING' }))

    },[dispatch]);

    return (
        <>
            <Card>
                <CardHeader>
                    <b> RTGS </b>
                    {multiples.length ? <Button className='btn-success ms-5' 
                        type='button' 
                        onClick={generateRTGSmultiple}> Generate </Button> : null }
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
                        <Col md={3}>
                            
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
                                    <th>  </th>
                                    <th> Action </th>
                                    <th> Client ID </th>
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
                                    <td><input type={'checkbox'} data-index={index} onClick={addTo} style={iStyle}/></td>
                                    <td>
                                        <span 
                                            onClick={generateRTGS} 
                                            className="text-primary"
                                            data-client_id={row.id}
                                            style={{cursor:'pointer'}}
                                            data-name={row.applicant_name}
                                        > 
                                            Generate
                                        </span>
                                    </td>
                                    <td>{row.id}</td>
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

export default RTGS