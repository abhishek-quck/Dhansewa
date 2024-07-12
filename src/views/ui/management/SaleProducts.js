import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { useDispatch } from 'react-redux';
import ReactSelect from 'react-select';
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Row, Table } from 'reactstrap'

function SaleProducts() {
    const bool = [
        {value:false, label:'In stock'},
        {value:false, label:'Out of stocks'}
    ]
    const dispatch = useDispatch()
    const [fields, setFields] = useState({
        category:[null],
        name:[null],
        description:[null] 
    })

    const handleChange = e => {
        let elem = e.target
        let index = elem.dataset.index
        let obj = fields
        obj[e.target.name][index] = e.target.value 
        setFields(obj)
        // setFields({...fields, [e.target.name]:})
    }
    const handleSubmit = e => 
    {
        e.preventDefault();
        dispatch({type:'LOADING'})
        axios.post('/add-sale-products',fields)
        .then(({data})=>{
            console.log(data)
        })
        .finally(()=>{
            dispatch({type:'STOP_LOADING'})
        })
    }
    const [rAdded, addR] = useState(false)
    const addRow = () =>
    {
        let obj = fields;
        for(let key in obj)
        {
            if(typeof obj[key]=='object')
                obj[key].push('')   
        }
        setFields(obj)
        addR(!rAdded)
    }

    const deletRow = e => {
        let index = e.target.dataset.index
        let obj = fields
        for(let K in obj)
        {
            if(typeof obj[K]=='object')
            {
                console.log(obj[K], 'index - '+index)
                obj[K].splice(index, 1)
            }
        }
        // setFields(obj)
        addR(!rAdded)
    }

    const updateStatus = e => {
        setFields({...fields, status:e.value})
    }

    useEffect(()=>{
        console.log('rendered');
    },[rAdded])

    return (
    <Card>
    <CardHeader tag="h6" className="border-bottom p-3 mb-0 d-flex" >
        <b> CROSS SALE PRODUCT </b> 
    </CardHeader>
    <CardBody className="">
        <Form onSubmit={handleSubmit}>
        <Row>
            <Col>
                <button className='btn btn-outline-success btn-sm mb-3' type='button' onClick={addRow}> +Add </button>
                <Table bordered hover style={{fontSize:'small'}}>
                    <thead>
                        <tr>
                            <th> CATEGORY </th>
                            <th> SALE PRODUCT NAME </th>
                            <th> DESCRIPTION </th>
                            <th> STATUS </th>
                            <th> ACTION </th>
                        </tr>
                    </thead>
                    <tbody>
                        { fields.name.map((row,i)=>{
                            return <tr key={i}>
                            <td>
                                <Input 
                                type='select' 
                                onChange={handleChange} 
                                defaultChecked={row} 
                                name='category'>
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
                                    name='name'
                                    placeholder='Enter name'
                                />
                            </td>
                            <td>
                                <Input 
                                    type='text' 
                                    data-index={i} 
                                    onChange={handleChange} 
                                    name='description'
                                    placeholder='Enter description'
                                />
                            </td>
                            <td>
                                <ReactSelect 
                                    data-index={i}
                                    options={bool}
                                    onChange={updateStatus}
                                />
                            </td>
                            <td>
                                <Button color='danger' data-index={i} onClick={deletRow}>
                                    <i className='fa fa-trash' />
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

export default SaleProducts