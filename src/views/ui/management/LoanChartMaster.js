import axios from 'axios';
import $ from 'jquery';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Label, Row, Table } from 'reactstrap'
import { validate, Warning } from '../../../helpers/utils'

function LoanChartMaster() {
    const dispatch = useDispatch()
    const selectRef = useRef(null)
    const [refresh, call] = useState(false)
    const [notefile, noteFile] = useState(null)
    const [excelfile, excelFile] = useState(null)
    const [loanProducts, setLoanProducts] = useState([])
    const [products, setProducts] = useState([]);
    const [chart, setChart] = useState([]);
    const [fields, setFields] = useState({
    id:'',
    amount:''
    });

    const updateProduct = e => {
        e.preventDefault()
        const {shouldGo} = validate(fields)
        if(shouldGo===false)
        {
            toast.error('Fill the required fields!')
            return 
        }
        let fd = new FormData()
        fd.append('loan_product_id', fields.id )
        fd.append('chart', JSON.stringify(chart))
        dispatch({type:'LOADING'})
        axios.post('update-loan-chart', fd , {
            headers:{ 
                "Accept"       :"application/json",
                "Content-Type" : "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        })
        .then(({data})=>{
            console.log(data)
            call(!refresh)
            toast.success(data.message)
        })
        .catch(err=>toast.error(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    function putFile(e){
        e.preventDefault();
        if(e.target.name==='note')
        {
            noteFile(e.target.files[0])
        } else {
            excelFile(e.target.files[0])
        }
    }
    
    function uploadFromNote(e){

        e.preventDefault();
        if(!fields.id) {
            return Warning('Select a product at first!');
        }
        if(!notefile) {
            return Warning('Choose a file at first!');
        }
        let fd = new FormData();
        fd.append('file', notefile);
        fd.append('loan_product_id', fields.id)
        dispatch({type:"LOADING"});

        axios.post('upload-from-text-file', fd, {
            headers:{ 
                "Accept"       :"application/json",
                "Content-Type" : "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data}) => {
            toast.success('Loan products imported successfully!');
            setProducts(data)
            axios.get('/loan-products-options')
            .then(({data})=>setLoanProducts(data)).catch()
        }).catch((e) => {
            console.log(e.response?.data?.message)
            toast.error(e.response?.data?.message??'Something went wrong!');
            // dispatch({ type:'ERROR', payload:{code:e.response.status, error:e.message}})
        })
        .finally(()=>dispatch({type:"STOP_LOADING"}))

    }

    function uploadFromExcel (e){
        e.preventDefault()
        let fd = new FormData();
        fd.append('file', excelfile);
        if(!excelfile)
        {
            return toast('Choose a file at first!',{
                icon: '⚠️',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }

        axios.post('upload-from-excel-file', fd, {
            headers:{ 
                "Accept"       :"application/json",
                "Content-Type" : "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data}) => {
            toast.success('Loan products imported successfully!');
            // setProducts(data)
            axios.get('/loan-products-options')
            .then(({data})=>setLoanProducts(data)).catch()
        }).catch((e) => {
            console.log(e.response?.data?.message)
            toast.error(e.response?.data?.message??'Something went wrong!');
            // dispatch({ type:'ERROR', payload:{code:e.response.status, error:e.message}})
        })
        .finally(()=>dispatch({type:"STOP_LOADING"}))

    }

    function expandChart(e){
        setFields({...fields, id:e.target.value});
        console.log(products)
    }

    const showChart = product => {
        setFields({ id:product.id, amount: product.amount})
        dispatch({type:"LOADING"});
        axios.get('get-loan-chart/'+product.id)
        .then(({data})=> {
            if(data.length===0) Warning('Chart not uploaded yet!');
            setChart(data)
        })
        .catch(()=>toast.error('something went wrong!'))
        .finally(()=> dispatch({type:"STOP_LOADING"}))
    }

    const modifyChart = (index, e) => {
        let {name,value} = e.target
        const updatedChart = [...chart];
        updatedChart[index][name] = value
        setChart(updatedChart)
        console.log(index, name, value)
    }
    useEffect(()=> {

        axios.get('get-loan-products')
        .then(({data})=>{
            setProducts(data)
            axios.get('/loan-products-options')
            .then(({data})=>{
                console.log(data)
                setLoanProducts(data)
            }).catch(e => dispatch({ type:'ERROR', payload:{code:e.response.status, error:e.message}}))
        })
        .catch(err=>toast.error(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
        
    },[refresh])

  return (
    <>
      <Row>
        <Col md={4}>
          <Card>
            <CardHeader>
              Products
            </CardHeader>
            <CardBody>
              <Table bordered hover style={{fontSize:'small'}}>
                <thead className='bg-blue'>
                  <tr> 
                    <th> Product </th>
                    <th> ID </th>
                    <th> Loan </th> 
                    <th> EMI </th>
                    <th> Terms </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody> 
                  {products.map( product => {
                      return <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.id}</td>
                        <td>{product.amount}</td>
                        <td>{product.installments}</td>
                        <td>{product.terms??'1'}</td>
                        <td>
                            <span onClick={() => showChart(product)} className='fa fa-upload' style={{cursor:"pointer"}}></span>
                        </td>
                      </tr>
                  })}
                </tbody>
              </Table> 
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <CardHeader>
              WIR Setting (<Link className='text-decoration-none'>Download maker</Link>)
            </CardHeader>
            <CardBody>
                <Form id={`loan-chart`} onSubmit={updateProduct}>
                    <Row>
                        <Col>
                        <Label>Product Name</Label>
                        <Input type='select' 
                            onChange={expandChart}
                            defaultValue={fields.id}
                            ref={selectRef}
                        >
                            <option></option>
                            {loanProducts.map( opt =>{
                                return <option key={opt.value} value={opt.value}>{opt.label}</option>
                            })}
                        </Input>
                        </Col>
                        <Col className='d-flex'>
                        <div>
                            <Label> Loan Amount <small className='text-danger'>*</small> </Label>
                            <Input 
                            type='text'
                            placeholder='Enter Loan Amount'
                            onChange={e=>setFields({...fields, amount:e.target.value})}
                            /> 
                        </div>
                        {false && <button className='btn btn-primary h-50 ' style={{marginTop:'33px'}}>OK</button>}
                        </Col>
                    </Row>
                    <Row className='mt-3' style={{display:'flex',justifyContent:'space-between'}}>
                        <Col>
                            <button className="btn btn-success"> Bulk Save </button>
                        </Col>
                        <Col>
                            <button type={'button'} className="btn btn-danger"> Bulk Delete </button>
                        </Col>
                    </Row>
                    {chart.length ? (<> 
                        <Row>
                            <Col className={`mt-3`}>
                                <Table className='table-bordered table-hover' style={{fontSize:'small',borderColor:'black'}}>
                                    <thead style={{verticalAlign:'middle'}}>
                                        <tr>
                                            <th>PR ID</th>
                                            <th>LOAN AMOUNT</th>
                                            <th>INS NO</th>
                                            <th>INTEREST</th>
                                            <th>PRINCIPAL</th>
                                            <th>OTHER</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chart.map( (row,ind) => <tr key={ind}>
                                            <td><Input readOnly name={`loan_product_id`} value={row.loan_product_id} onChange={e=>modifyChart(ind,e)} /></td>
                                            <td><Input type='number' name={`loan_amount`} value={row.loan_amount} onChange={e=>modifyChart(ind,e)} /></td>
                                            <td><Input type='number' name={`installment_no`} value={row.installment_no} onChange={e=>modifyChart(ind,e)} /></td>
                                            <td><Input type='number' name={`int_due`} value={row.int_due} onChange={e=>modifyChart(ind,e)} /></td>
                                            <td><Input type='number' name={`pr_due`} value={row.pr_due} onChange={e=>modifyChart(ind,e)} /></td>
                                            <td><Input type='number' name={`other`} value={row.other} onChange={e=>modifyChart(ind,e)} /></td>
                                            <td><Input readOnly value={(parseInt(row.pr_due) + parseInt(row.int_due) + parseInt(row.other))}></Input></td>
                                        </tr>)}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </>):''}
                </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
        <Row>
        <Col md={8} className='offset-4'>
            <Card>
                <CardHeader>
                    Direct Upload from Notepad (<a href={'/format_loan_chart_product_upload.txt'} download className='text-decoration-none'>Download Format</a>)
                </CardHeader>
                <CardBody>
                    <Form onSubmit={uploadFromNote}> 
                        <Row>
                            <Col md={6}>
                                <Input type='file' onChange={putFile} name='note' accept='.txt'></Input>
                            </Col>
                            <Col md={6}>
                                <Button className='btn btn-success w-100'>
                                    Upload
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8} className='offset-4'>
            <Card>
                <CardHeader>
                    Direct Upload from Excel (<a href={'/format_loan_products.xlsx'} download className='text-decoration-none'>Download Format</a>)
                </CardHeader>
                <CardBody>
                    <Form onSubmit={uploadFromExcel}> 
                        <Row>
                            <Col md={6}>
                                <Input type='file' onChange={putFile} name='excel' accept='.xls,.xlsx'></Input>
                            </Col>
                            <Col md={6}>
                                <Button className='btn btn-success w-100'>
                                    Upload
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Col>
      </Row>
      
    </>
  )
}

export default LoanChartMaster