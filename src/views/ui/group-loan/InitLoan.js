import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Card, CardBody, CardHeader, Col, Container, Label, Row, Table } from 'reactstrap';

function InitLoan() {

    const dispatch = useDispatch();
    const [branches,setBranches] = useState([]);
    const [centers, setCenters ] = useState([]);
    const [fields, setFields  ] = useState({branch:''});
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState(false);

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
        }).catch(err=>{
            console.log(err.message)
            setCenters([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    
    const updateCenter = (e) => {

        setSearch(e.value);
        setFields({...fields, center:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-center-client-info/'+ e.value )
        .then(({data})=> {
            console.log(data)
            setClients(data);
        })
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
        }).finally(()=> dispatch({type:'STOP_LOADING'}))
        // setClients(allData['clients'][e.value])
    }
    

    useEffect(()=> {

        dispatch({ type:'LOADING' });
        axios.get('get-options').then(({data}) => setBranches(data.branches) ).catch()
        .finally(() => dispatch({ type:'STOP_LOADING' }))

    },[]);

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
                                        <Link 
                                            to={'/edit-enrolled/'+row.id} 
                                            className="text-decoration-none"
                                        > 
                                            Generate Loan ID 
                                        </Link>
                                    </td>
                                    <td>
                                        <span className='text-primary'> View </span>
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
        </>
    )
}

export default InitLoan