import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Row, Table } from 'reactstrap'

function BankMaster() {
    const [rAdded, addR] = useState(false)

    const addRow = () => {

    }

    const bool = [
        {value:'', label:''},
        {value:'', label:''}
    ]

    const [fields, setFields] = useState({
        name:[''],
    })

    const handleChange = e => {

    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('/')
    }

    const deletRow = (e) => {
        let index = e.target.dataset.index
        let obj = fields
        for(let K in obj)
        {
            if(typeof obj[K]=='object')
            {
                obj[K].splice(index,1)
            } 
        }
        addR(!rAdded)
    }

    useEffect(()=>{

    },[rAdded])

    return (
    <Card>
        <CardHeader tag="h6" className="border-bottom p-3 mb-0 d-flex" >
            <b> COMPANY BANK ACCOUNTS </b> 
        </CardHeader>
        <CardBody className="">
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <button className='btn btn-outline-success btn-sm mb-3' type='button' onClick={addRow}> +Add </button>
                    <Table bordered hover style={{fontSize:'small'}}>
                        <thead>
                            <tr>
                                <th> BANK </th>
                                <th> IFSC </th>
                                <th> BRANCH </th>
                                <th> A/C NO </th>
                                <th> A/C CODE </th>
                                <th> : </th>
                            </tr>
                        </thead>
                        <tbody>
                            { fields.name.map((row,i)=>{
                                return <tr key={i}>
                                <td>
                                    <Input
                                    type='select' 
                                    onChange={handleChange} 
                                     
                                    name='bank'>
                                        <option> Select Category </option>
                                        <option value={'Home Appliances'}> 
                                            Home Appliances 
                                        </option>
                                    </Input>
                                </td>
                                <td>
                                    <Input 
                                        type='text' 
                                        data-index={i} 
                                        onChange={handleChange} 
                                        name='ifsc_code'
                                        placeholder='Enter name'
                                    />
                                </td>
                                <td>
                                    <Input 
                                        type='text' 
                                        data-index={i} 
                                        onChange={handleChange} 
                                        name='branch'
                                        placeholder='Enter Branch'
                                    />
                                </td>
                                <td>
                                    <Input 
                                        type='text' 
                                        data-index={i} 
                                        onChange={handleChange} 
                                        name='account_no'
                                        placeholder='Enter Account Number'
                                    />
                                </td>
                                <td>
                                    <Input 
                                        type='text' 
                                        data-index={i} 
                                        onChange={handleChange} 
                                        name='account_code'
                                        placeholder='Enter Code'
                                    />
                                </td>
                                <td>
                                    <Button color='danger' data-index={i} onClick={deletRow}>
                                        Delete
                                    </Button>
                                </td>
                                </tr>
                            }) } 
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Button color='success' type='submit' className='btn'> SAVE </Button>
                </Col>
            </Row>
            </Form>
            <div className="mt-3" id="resultArea">  
            </div>
        </CardBody>
    </Card>
    )
}

export default BankMaster