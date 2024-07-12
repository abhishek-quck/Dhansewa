import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap'

function MeetingHandover() {
	const dispatch = useDispatch()
	const [responseData, setData] = useState([])
	const [branches, setBranches] = useState([])
	useEffect(()=>{
		dispatch({ type:'LOADING' })
        axios.get('get-options') 
        .then(({data}) => 
        {
			setBranches(data.branches)
		})
		.finally(()=>dispatch({type:'STOP_LOADING'}))
	},[])
	return (
	<>
	<Card>
		<CardHeader>
			<b>TODAY MEETING HANDOVER</b>
		</CardHeader>

		<CardBody>
			<Row>
				<Col sm={5}>
					<Label>
						Branch Name
					</Label>
					<div className='d-flex'> 
						<Input type='select' > 
							<option>--SELECT--</option>
							{branches.map(branch=>{
								return <option key={branch.value} value={branch.value}> {branch.label} </option>
							})}
						</Input>
						<Button color='primary' className='mx-2'> 
							<i className='fa fa-search'/>
						</Button>
						<Button color='danger' className='mx-2'> Update </Button>
					</div>
				</Col>
			</Row>
			<Col className='mt-3'>
				<Table bordered hover style={{fontSize:'small'}}>
					<thead> 
						<tr>
							<th> Center ID </th>
							<th> Center Name </th>
							<th> Time </th>
							<th> Leader Name </th>
							<th> Leader Phone </th>
							<th> Field Staff </th>
							<th> Staff Phone </th>
							<th> Appointed Field Staff </th>
						</tr>
					</thead>
					{responseData?.length?
					responseData.map((row,index)=>{
						return (<tr key={index}>
							{ 
								Object.values(row).map((key,col)=>{
									return (<td key={key}> {col} </td>)
								}) 
							}
						</tr>)
					})
					:null}
				</Table>
			</Col>
		</CardBody>
	</Card>
	</>
	)
}

export default MeetingHandover