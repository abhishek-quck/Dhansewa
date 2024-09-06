import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Col, Form, Input, Label, Row, Table } from 'reactstrap'
import { validate } from '../../../helpers/utils'

function LoanChartMaster() {
  const dispatch = useDispatch()
  const [refresh, call] = useState(false)
  const [loanProducts, setLoanProducts] = useState([])
  const [products, setProducts] = useState([]);
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
      dispatch({type:'LOADING'})
      axios.post('add-amount-on-loan-product', fields)
      .then(({data})=>{
        console.log(data)
        call(!refresh)
        toast.success(data.message)
      })
      .catch(err=>toast.error(err.message))
      .finally(()=>dispatch({type:'STOP_LOADING'}))
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
              <Form onSubmit={updateProduct}>
              <Row>
                <Col>
                  <Label>Product Name</Label>
                  <Input type='select' 
                      name='id'
                      onChange={e=>setFields({...fields, id:e.target.value})}
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
                      name='amount'
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
                    <button className="btn btn-danger"> Bulk Delete </button>
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