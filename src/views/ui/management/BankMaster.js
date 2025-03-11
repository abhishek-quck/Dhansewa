import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Row, Table } from 'reactstrap'

function BankMaster() {
    const dispatch = useDispatch()
    
    const [fields, setFields] = useState([{ name:"", branch:"", ifsc:"", accountNumber:"", accountCode:"" }])
    const [updated, setUpdated] = useState(false);
    const addRow = () =>
    {
        setFields([...fields, { name:"", branch:"", ifsc:"", accountNumber:"", accountCode:"" }])
    }

    const handleChange = e => {
        let {index} = e.target.dataset
        let {name, value} = e.target
        setFields(fields.map( (field, i) => 
            i === parseInt(index) ? {...field, [name]: value} : field
        ))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(fields)
        const {data} = await axios.post('/save-bank-accounts', fields)
        if(data.status) {
            toast.success(data.message)
            setFields(data.data)
        } else {
            toast.error(data.message)
        }
    }

    const deletRow = async e => {
        const {row, index} = e.target.dataset
        if(row && window.confirm("Are you sure?")) {
            const {data} = await axios.get(`/remove-bank-account/${row}`)
            if(data.status) {
                setFields(fields.splice(index,1))
                setUpdated(!updated)
                return toast.success(data.message)
            } 
            toast.error(data.message)
        }
        // addR(!rAdded)
    }

    useEffect(() => {
        axios.get(`/bank-accounts`).then(({data}) => {
            if(data.length) {
                setFields(data)
            }
        })
        return () => null
    },[updated])

    return (
    <Card>
        <CardHeader tag="h6" className="border-bottom p-3 mb-0 d-flex" >
            <b> COMPANY BANK ACCOUNTS </b> 
        </CardHeader>
        <CardBody className="">
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <button className='btn btn-outline-success btn-sm mb-3 d-none' type='button' onClick={addRow}> +Add </button>
                    <Table bordered hover style={{fontSize:'small'}}>
                        <thead>
                            <tr>
                                <th> BANK </th>
                                <th> BRANCH </th>
                                <th> IFSC </th>
                                <th> A/C NO </th>
                                <th> A/C CODE </th>
                                <th> : </th>
                            </tr>
                        </thead>
                        <tbody>
                            { fields.map((row,i)=>{
                                return <tr key={i}>
                                 {Object.keys(row).map( (col) => col!=='id' && <td key={col}>
                                     <Input
                                        value={row[col]}
                                        onChange={handleChange}
                                        data-index={i} 
                                        name={col}
                                    />
                                </td>)}
                                <td>
                                    <Button color='danger' data-row={row.id} data-index={i} onClick={deletRow}>
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