import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Input, Label, Row, Table } from 'reactstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import ReactSelect from 'react-select'

function ArrearClients() {
	const dispatch = useDispatch()

	const [fields, setFields]=useState({
		branch:'',
	})
	const [data, setData] = useState([])
	const handleChange = e => setFields({ ...fields, [e.target.name]:e.target.value })
	const cStyle = {border:'1px solid lightgray',padding:'10px',borderRadius:'5px'}

	const handleSubmit = e => {
		e.preventDefault()
		dispatch({type:'LOADING'})
		axios.post('/get-arrear-clients',fields)
		.then(({data})=>{
			setData(data)
			dispatch({type:'STOP_LOADING'})
		})
	}

	const branchOptions = [
		{value:'benipur',label:'Benipur'}
	]

	const productOptions = [
		{value:'andBand',label:'andBand'}
	]

	useEffect(()=>{
	// [...document.getElementsByTagName('select')].forEach(element => {         
	// 	$(element).select2({
	// 		placeholder:'Select an option',
	// 		width:'80%'
	// 	})
	// });
	},[])
	return (
	<>
	<Card> 
		<CardHeader>
			<b> ARREAR CLIENTS </b>
		</CardHeader>
		<CardBody> 
		<Container style={cStyle}>
			<Row>
			<Col md={12}>
				<Col md={8}>
				<Form onSubmit={handleSubmit}>
				<Row> 
					<Col md={3}>
						<Label> Branch Name </Label>
						<ReactSelect
							type='select' 
							bsSize='sm' 
							options={branchOptions}
							onChange={e=>setFields({...fields, branch:e.value})}
						/>   
					</Col>
					<Col md={3}>
						<Label> Product Name </Label>
						<ReactSelect
							type='select' 
							bsSize='sm'
							options={productOptions}
							onChange={e=>setFields({...fields, product:e.value})}
						/>
					</Col>
					<Col md={3}>
						<Label> Staff Name </Label>
						<ReactSelect
							type='select' 
							bsSize='sm'
							options={productOptions}
							onChange={e=>setFields({...fields, product:e.value})}
						/>
					</Col>
					<Col md={3}>
					<Button type='submit' color='secondary' size="sm" style={{height:'50%',marginTop:'24%'}}> 
						<i className='fa fa-search'/> 
					</Button>
					</Col>
				</Row>
				</Form>
				</Col>
			</Col>
			</Row>
			<Col md={12} className='mt-4'> 
			<Table bordered hover style={{fontSize:'small'}}>
				<thead className='bg-blue'>
				<tr> 
					<th> SRN </th>
					<th> Staff Name </th>
					<th> Center Name </th>
					<th> Loan ID </th>
					<th> Client Name </th>
					<th> Loan AMT</th>
					<th> Desc Date </th>
					<th> IN S.NO </th>
					<th> Duration </th>
					<th> Prt.Out </th>
					<th> Int.Out </th>
					<th> Prn ARR </th>
					<th> Int ARR </th>
					<th> Total ARR </th>
				</tr>
				</thead>
				<tbody> 
				</tbody>
			</Table> 
			</Col>
		</Container>
		</CardBody>
		<CardFooter>
		<Button color='light'>Download</Button>
		</CardFooter>
	</Card>
	</>
	)
}

export default ArrearClients