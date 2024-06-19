import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Row, Table } from 'reactstrap'

function MeetingHandover() {
	const [responseData, setData] = useState([])
	useEffect(()=>{
		 
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
							<option value={'benipur'}> 01-Benipur </option>
							<option value={'madhubani'}> 02-Madhubani </option>
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