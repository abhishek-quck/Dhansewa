import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row } from 'reactstrap'

function LoanProducts() {
    
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    useEffect(()=>{
        dispatch({type:'LOADING'})
        axios.get('get-loan-products')
        .then(({data})=>{
            setProducts(data)
        })
        .catch(err=>toast.error(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    },[])

  return (
    <Card>
        <CardHeader className="d-flex" style={{justifyContent:'space-between'}}>
			<b> LOAN PRODUCTS: </b>  
			<Link to={`/manage-products`} className="btn btn-sm btn-rounded btn-primary">
				<i className="fa fa-plus"/> New 
			</Link> 
		</CardHeader>
        <CardBody>
            <Col>
                <Row>
                    <Label>
                        Search Name
                        <div className='col-12 d-flex'> 
                            <Input 
                                type='text' 
                                className='col-6'
                                style={{width:'50%'}}
                                placeholder='Search Products'
                            />
                            <Button color="primary">
								<i className='fa fa-search'/>
							</Button>
                        </div>
                    </Label>
                </Row>
                <Col className={`d-flex`}>
                    <table className='table table-bordered hover'>
                        <thead>
                            <tr>
                                <th> S.No </th>
                                <th> Intro Date </th>
                                <th> Removal Date </th>
                                <th> Name </th>
                                <th> Frequency </th>
                                <th> Flat % </th>
                                <th> Reducing % </th>
                                <th> Installments </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((row, i)=>{
                                return <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{row.intro_date}</td>
                                    <td>{row.removal_date}</td>
                                    <td>{row.name}</td>
                                    <td>{row.emi_frequency}</td>
                                    <td>{row.flat_rate}</td>
                                    <td>{row.reducing_rate}</td>
                                    <td>{row.installments}</td>
                                    <td> 
                                        <Link 
                                            to={'/manage-products/'+row.id} 
                                            className="text-decoration-none"
                                        > 
                                            <i className='fa-regular fa-edit'></i>
                                        </Link>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </Col>
            </Col>
        </CardBody>
    </Card>
  )
}

export default LoanProducts