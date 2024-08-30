import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, Table, UncontrolledDropdown } from 'reactstrap'
import { formatDate, getCurrentDate, getCurrentDay } from '../../../helpers/utils'
import { useDispatch } from 'react-redux'

function CenterCollection() {
    
    const dispatch = useDispatch();
    let {branch_id} = useParams()
    const [branch, setBranchDetail] = useState({})
    const [centers, setCenters] = useState([])
    const headStyle = {fontFamily:'math',fontSize:15}

    const downloadCDS = async(centerID,name) => {

        dispatch({type:'LOADING'})
        return axios.get('download-cds/'+centerID, 
        {
            responseType: 'blob',
            headers: {
                "Content-Type" : "multipart/form-data",
                "Authorization": "Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data}) => {
            const href = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href  = href 
            link.download= 'cds_'+name+'_'+ formatDate(null,'dmY')+ '.pdf' // Don't ignore <3
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        })
        .finally( ()=> {
            dispatch({type:'STOP_LOADING'})
        })

    }

    useEffect(()=>{
        axios.get('get-branches/'+branch_id).then(({data})=>setBranchDetail(data)).catch(err=>console.log(err))
        axios.get('get-branch-centers/'+branch_id).then(({data})=>{
            setCenters(data)
        })
        return ()=>null;
    },[])

    return (
        <>  
            <div className='container'>
                <Card>
                    <CardHeader>
                        {branch.name}   <b> {formatDate(getCurrentDate(),'dmY') +' - '+ getCurrentDay()} </b>
                    </CardHeader>
                    <CardBody>
                        <Row style={{borderBottom:'1px dashed black'}}>
                            <h3 style={{fontFamily:'math'}}> Center Collection </h3>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={3}>
                                <Label for="filter"> Filter </Label>
                                <div className='d-flex'>
                                    <Input id='filter' type='text' placeholder='Search...'/>
                                    <Button className='bg-danger'><i className='fa fa-filter'/></Button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>        
            </div>
            <div className='container mt-3'>
                <Card>
                    <CardBody>
                        <Table hover striped bordered>
                            <thead>
                                <tr>
                                    <th style={headStyle} colSpan={4} className='text-center'> CENTER INFO  </th>
                                    <th style={headStyle} colSpan={7} className='text-center'> TODAY COLLECTION </th>
                                    <th style={headStyle} colSpan={2} className='text-center'> ALERT </th>
                                </tr>
                                <tr>
                                    <th>:</th>
                                    <th>Center No.</th>
                                    <th>Center Name</th>
                                    <th>Staff Name</th>
                                    <th>PR.Due</th>
                                    <th>PR.COLTD</th>
                                    <th>INT DUE</th>
                                    <th>INT COLTD</th>
                                    <th>TOTAL DUE</th>
                                    <th>OTH COLTD</th>
                                    <th>T.COLTD</th>
                                    <th>STL</th>
                                    <th>T.ARR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {centers.map( item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                <UncontrolledDropdown
                                                    className="me-2"
                                                    direction="bottom"
                                                >
                                                    <DropdownToggle
                                                        caret
                                                        color="primary"
                                                    >
                                                        View
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem header>
                                                            <strong> Options </strong>
                                                        </DropdownItem>
                                                        <DropdownItem>
                                                            <i className='fa fa-user'/> 
                                                            <span className='mx-2'> View Clients </span>
                                                        </DropdownItem>
                                                        <DropdownItem onClick={()=>downloadCDS(item.id,item.name)}>
                                                            <i className='fa fa-download'/>
                                                            <span className='mx-2'> Download CDS </span>
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.name} </span></td>
                                            <td><span> {item.staff} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                            <td><span> {item.id} </span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default CenterCollection