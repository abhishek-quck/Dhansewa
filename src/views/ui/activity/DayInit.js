import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import { formatDate, getCurrentDay, getCurrentTime } from '../../../helpers/utils';

function DayInit() {

    const dispatch = useDispatch();
    const [branch, setBranch ]= useState({id:'',name:''})
    const [branches, setBranches ]= useState([])
    const [checked, setChecked ]= useState(false)
    const [collection, setCollection] = useState([]);
    const containerStyle = {borderTop:'1px dashed',boxShadow:'-20px 0 10px -5px rgba(0, 0, 0, 0.1)'}

    const changeBranch = e => {
        let selected = e.target.value
        let selectedOption = branches.filter( item => item.id === parseInt(selected) )
        let {name} = selectedOption[0] ?? '';
        setBranch({ id:e.target.value, name })
    }

    useEffect( ()=> {
        axios.get('get-branches').then(({data})=>setBranches(data)).catch()
    },[])

    const dayInit = e => {

        e.preventDefault();
        dispatch({type:'LOADING'})
        axios.get('day-init/'+ branch.id )
        .then(({data})=> {
            toast.success(data.message)
        }).catch( err => toast.success("Something went wrong!"))
        .finally(()=> dispatch({type:'STOP_LOADING'}));

    }

    return (
    <>
    <Card>
        <CardHeader>
            <i className='fa-solid fa-arrow-down'/> &nbsp;
            <b> DAY INITIALIZATION: </b>
        </CardHeader>
        <CardBody>
            <Row>
                <Col md={4}>
                <FormGroup>
                    <Label> Branch Name </Label>
                    <div className='d-flex'> 
                        <Input 
                            type='select' 
                            style={{width:'80%'}}
                            onChange={changeBranch}
                            id='branch'
                        >
                            <option value={''}> Select Branch </option>
                            { branches.map( opt => <option key={opt.id} value={opt.id}>{opt.name}</option> ) }
                        </Input>
                        <Button color="primary"> <i className='fa fa-search'/> </Button>
                    </div>
                </FormGroup>
                </Col>
                <Col>
                    <Table striped hover bordered className='mt-4'>
                        <thead>
                            <tr>
                                <th> NUM CLIENTS </th>
                                <th> PRN DUE </th>
                                <th> INT DUE </th>
                                <th> OTHER DUE </th>
                                <th> TOTAL </th>
                                <th> COLLECTED </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                collection.map(item=>{
                                    return (<tr key={item.id}>
                                        <td>{item.total_client}</td>
                                        <td>{item.due_amount}</td>
                                        <td>{0}</td>
                                        <td>{0}</td>
                                        <td>{item.due_amount}</td>
                                        <td>{0}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Col className='mt-4'>
                <Table bordered>
                    <thead>
                        <tr>
                            <th> Branch Code </th>
                            <th> Branch Name </th>
                            <th> IniProc Date </th>
                            <th> Day Name </th>
                            <th> IniProc Times </th>
                            <th> End ProcYN </th>
                            <th> : </th>
                        </tr>
                    </thead>
                    {branch.id && <tbody>
                        <tr>
                            <td> {branch.id} </td>
                            <td> {branch.name} </td>
                            <td> {formatDate(null,'dmY')} </td>
                            <td> {getCurrentDay()} </td>
                            <td> {getCurrentTime()} </td>
                            <td> {'Y'} </td>
                            <td>
                                <span className='text-primary'>
                                    <i className="fa-solid fa-lock-open"/> Re-initialization 
                                </span> 
                            </td>
                        </tr>
                    </tbody>}
                </Table>
            </Col>
        </CardBody>
    </Card>
    <Card>
        <CardBody>
            <Row className='mb-3'>
                <Col md={6}>
                    <div className='text-primary'>
                        <b> Process for Next Day Initialization </b>
                    </div>
                </Col>
            </Row>
            
            <Container className='p-5' style={containerStyle}>
                <Form onSubmit={dayInit}>
                <Row>
                    <Col md={6}>
                        <p> Day Initialization is process of generate all collection of clients as per scheduled collection plan. </p>
                    </Col>
                    <Col md={6}>
                        <button type='submit' className='btn btn-primary' disabled={!branch.id || !checked} 
                        style={{float:'right'}}> Next Day Initialization </button>
                    </Col>
                </Row>
                <Row>
                    <FormGroup>
                        _
                        <input 
                            type='checkbox' 
                            id='dayInit' 
                            defaultChecked={checked} 
                            className='mx-3' 
                            onChange={()=>setChecked(!checked)} 
                        />
                        <Label for="dayInit"> Yes I am agree to process Day Initialization </Label>
                    </FormGroup>
                </Row>
                </Form>
            </Container>
        </CardBody>
    </Card>
    </>
    )

}

export default DayInit