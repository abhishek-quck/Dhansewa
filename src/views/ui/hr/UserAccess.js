import $ from 'jquery'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { navigation } from '../../../layouts/SidebarData';
function UserAccess() {
    const dispatch = useDispatch()
    const {permMap} = useSelector(state=>state.auth)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [chkbox, setChecked] = useState({})
    const saveBtnStyle = { position:'fixed',top:'91%',left:'91%'}
    const [menuItems, setMenus] = useState([])
    const [accessCodes, setAccessCodes] = useState('');
    const boxStyled = { border:'1px solid lightgray',padding: '8px 0 0 19px'}
    const [formSubmit, setSubmit] = useState(false)
    const [reportAccess, setReportAccess] = useState({
        general : false,
        hr : false,
        members : false,
        accounts : false,
        loan : false,
        banking : false,
        collections : false,
        npa : false,
        advance : false,
    })
    const selectAll = e => {
        $(e.target).parents('table').find('input[type=checkbox]').each(function(k,input){ 
            $(input).prop('checked', $(e.target).is(':checked'));             
        })
    }
    // when an employee is selected from table
    const populateForm = id => {
        dispatch({type:'LOADING'})
        axios.get('get-employee/'+id)
        .then(({data})=>{
            setUser(data)
            axios.get('report-access/'+ id).then(({data})=>{
                setReportAccess(data.inputs)
                setAccessCodes(data.codes)
            }).catch( err=>console.log(err.message) )
            fillPerms(id)
        }).catch(err=>err.message)
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    // only checkbox inputs are there
    const changeReportInput = e=>{
        const {checked} = e.target 
        setReportAccess({...reportAccess, [e.target.name]:checked })
    }
    const updatePermission = e => {
        e.preventDefault()
        let fd = new FormData($('#permission')[0])
        fd.append('user_id', user.id )
        axios.post('update-permissions',fd, {
            headers:{
                "Accept":"application/json",
                "Content-Type": "multipart/form-data",
                "Authorization":"Bearer "+localStorage.getItem('auth-token')
            }
        }).then(({data})=>
            toast.success(data.message)
        ).catch(err=>{
            toast.error('Something went wrong!')
            console.log(err.message)
        })
    }
    // handle report access form
    const updateReportAccess = e => {
        e.preventDefault()
        if(user.id===undefined) {
            return toast('Select an employee first!',
                {
                  icon: '⚠️',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
            );
        }
        dispatch({type:'LOADING'})
        axios.post('update-report-access',{...reportAccess, employee_id : user.id})
        .then(({data})=>{
            toast.success(data.message)
            setTimeout(()=>setSubmit(!formSubmit),500)        
        }).catch(err=>{
            toast.error(err.message)
            console.log(err.message)
        })
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }

    const handleCheck = e => {
        const {checked} = e.target 
        setChecked({...chkbox, [e.target.name]:checked})
    }
    
    const fillPerms = (id) => {
        setChecked({})
        axios.get('permissions/'+id).then( ({data})=> {
            let obj={};
            for(let item of data) {
                for(let key in item) {
                    if(item[key] && !['permission_id','user_id'].includes(key)) obj[item['permission_id']+'_'+key] = true
                }
            }
            setChecked(obj)
        } ).catch( err=>console.log(err.message) )
    }
    useEffect(()=>{
        let menus = {};
        navigation.forEach(item=>{
            if(item.sub) {
                menus[item.title] = [item.title]
                menus[item.title] = [...menus[item.title], ...item.sub.map(row=>row.title) ]
            } else {
                menus[item.title] = item.title
            }
        })
        setMenus(menus)
        axios.get('employees').then( ({data})=> setUsers(data) ).catch( err=>console.log(err.message) )
        if(user.id)
        {
            fillPerms(user.id)
            axios.get('report-access/'+ user.id).then(({data})=>{
                setReportAccess(data.inputs)
                setAccessCodes(data.codes)
            }).catch( err=>console.log(err.message) )
        }
        // axios.get('reports').then( ({data})=> setUsers(data) ).catch( err=>console.log(err.message) )
         
    },[formSubmit])

    return (
        <>
           <Col className='d-flex'>
            <Col md={5}>
                <Card>
                    <CardHeader>
                        <b> Users List </b>
                    </CardHeader>
                    <CardBody>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th> ? </th>
                                    <th> Empl.ID </th>
                                    <th> Name </th>
                                    <th> Desig. </th>
                                    <th> BranchID </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map( (row,i)=>{
                                    return <tr key={i}>
                                        <td className={`${row.id===user.id?'selected':''}`}> 
                                            <Button 
                                                className='bg-white btn-sm text-dark' 
                                                type='button' 
                                                style={{fontSize:''}}
                                                onClick={()=>populateForm(row.id)}><i className='fa fa-upload'/>
                                            </Button> 
                                        </td>
                                        <td className={`${row.id===user.id?'selected':''}`}><span>{row.id}</span></td>
                                        <td className={`${row.id===user.id?'selected':''}`}>
                                            <span>{row.first_name+' '+row.last_name}</span>
                                        </td>
                                        <td className={`${row.id===user.id?'selected':''}`}>
                                            <span>{row.designation}</span>
                                        </td>
                                        <td className={`${row.id===user.id?'selected':''}`}>
                                            <span>{row.branch}</span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        
                    </CardFooter>
                </Card>
            </Col>
            <Col md={7} style={{fontSize:''}}  className='ms-4'>
                <Card>
                    <CardHeader>
                        <b>User Access Setup </b>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={4} style={{fontSize:'14px'}}>
                                <p> User Details </p> 
                                <FormGroup> 
                                    <Label>Employee ID</Label>
                                    <Input type='text' value={user.id} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Name </Label>
                                    <Input type='text' value={user.first_name!==undefined ? user.first_name+' '+user.last_name:''} disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label> Designation </Label>
                                    <Input type='text' placeholder='Designation' value={user?.designation??''} disabled/>
                                </FormGroup>
                                <FormGroup>
                                    <Label> Report Access Code </Label>
                                    <Input type='text' disabled value={accessCodes}/>
                                </FormGroup>
                            </Col>    
                            <Col md={8}>
                                <p> Report Access </p>
                                <hr/>
                                <Container>
                                    <Form onSubmit={updateReportAccess}>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="general" onChange={changeReportInput} 
                                                checked={reportAccess.general}/>
                                                <Label className='ms-2'> 1. General </Label>
                                            </div>
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="hr" onChange={changeReportInput} 
                                                checked={reportAccess.hr}/>
                                                <Label className='ms-2'> 2. HR & Payroll </Label>
                                            </div> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="members" onChange={changeReportInput} 
                                                checked={reportAccess.members}/>
                                                <Label className='ms-2'> 3. Members </Label>
                                            </div>  
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="accounts" onChange={changeReportInput} 
                                                checked={reportAccess.accounts}/>
                                                <Label className='ms-2'> 4. Accounts </Label>
                                            </div>   
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="loan" onChange={changeReportInput} 
                                                checked={reportAccess.loan}/>
                                                <Label className='ms-2'> 5. Loan </Label>
                                            </div>    
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="banking" onChange={changeReportInput} 
                                                checked={reportAccess.banking}/>
                                                <Label className='ms-2'> 6. Banking </Label>
                                            </div>     
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="collections" onChange={changeReportInput} 
                                                checked={reportAccess.collections}/>
                                                <Label className='ms-2'> 7. Collections </Label>
                                            </div>      
                                        </Col>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="npa" onChange={changeReportInput} 
                                                checked={reportAccess.npa}/>
                                                <Label className='ms-2'> 8. NPA </Label>
                                            </div>       
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} style={boxStyled}>
                                            <div className='d-flex'>
                                                <Input type='checkbox' name="advance" onChange={changeReportInput} 
                                                checked={reportAccess.advance}/>
                                                <Label className='ms-2'> 9. Advance </Label>
                                            </div>        
                                        </Col>
                                    </Row>
                                    <Row className='mt-5'>
                                        <Button color='success'> Update </Button>
                                    </Row>
                                    </Form>
                                </Container>
                               
                            </Col>                            
                            <Container>
                                <h5> Function's: User System Access </h5>
                                <hr/>
                                <Row >
                                    <div className='col-5 ms-3 bg-dark text-white' 
                                    style={{borderRadius:'5px'}} >
                                        Center Collection Page Setup
                                    </div>
                                    <p style={{paddingLeft:'20px'}}>
                                        Insert=Add Next Installment, Edit=Row Value Edit, Delete=Skip Collection, Loan Show=Loan Settel 
                                    </p>
                                </Row>
                            </Container>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Form id='permission' onSubmit={updatePermission}>
                            <Table className='table-bordered table-hover '>
                                <thead style={{backgroundColor:'lightblue'}}>
                                    <tr style={{background:'blue'}}>
                                        <th><Input type='checkbox' onClick={selectAll} /></th>
                                        <th> PRNT </th>
                                        <th> TITLE </th>
                                        <th> DETAILS </th>
                                        <th> VIEW </th>
                                        <th> ADD </th>
                                        <th> EDIT </th>
                                        <th> DEL </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.id ? 
                                     Object.keys(menuItems).map( (row,i)=>{
                                        return (
                                            typeof menuItems[row] === 'object' ?
                                            (
                                                menuItems[row].map( (itr,j) =>{
                                                    return (
                                                        <tr key={j}>
                                                            <td className={ j===0 ? 'bg-gray-300':'' }>
                                                                <span>{ j+1 }</span>
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                <span>{ j===0 && Object.keys(menuItems).indexOf(row) }</span>
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                <span>{ j===0 && itr }</span>
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                <span>{ itr }</span>
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                { j!==0 ? 
                                                                <Input 
                                                                    type='checkbox' 
                                                                    checked={chkbox[permMap[itr]+'_view']} 
                                                                    name={permMap[itr]+'_view'} 
                                                                    onChange={handleCheck}
                                                                /> : null }
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                { j!==0 ? 
                                                                <Input 
                                                                    type='checkbox' 
                                                                    checked={chkbox[permMap[itr]+'_add']} 
                                                                    name={permMap[itr]+'_add'} 
                                                                    onChange={handleCheck}
                                                                /> : null }
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                { j!==0 ? 
                                                                <Input 
                                                                    type='checkbox' 
                                                                    checked={chkbox[permMap[itr]+'_edit']} 
                                                                    name={permMap[itr]+'_edit'} 
                                                                    onChange={handleCheck} 
                                                                /> : null }
                                                            </td>
                                                            <td className={ j===0 ? 'bg-gray-300' : '' }>
                                                                { j!==0 ? 
                                                                <Input 
                                                                    type='checkbox' 
                                                                    checked={chkbox[permMap[itr]+'_delete']} 
                                                                    name={permMap[itr]+'_delete'} 
                                                                    onChange={handleCheck}
                                                                /> : null }
                                                            </td>
                                                        </tr>    
                                                    )
                                                })
                                            )
                                            : <tr key={i}>
                                                <td className='bg-gray-300'><span>{++i}</span></td>
                                                <td className='bg-gray-300'><span>{Object.keys(menuItems).indexOf(row)}</span></td>
                                                <td className='bg-gray-300'><span>{menuItems[row]}</span></td>
                                                <td className='bg-gray-300'><span>{menuItems[row]}</span></td>
                                                <td className='bg-gray-300'>
                                                    <Input 
                                                        type='checkbox' 
                                                        name={permMap[menuItems[row]]+'_view'} 
                                                        checked={chkbox[permMap[menuItems[row]]+'_view']} 
                                                        onChange={handleCheck}
                                                    /></td>
                                                <td className='bg-gray-300'>
                                                    <Input 
                                                        type='checkbox' 
                                                        name={permMap[menuItems[row]]+'_add'} 
                                                        checked={chkbox[permMap[menuItems[row]]+'_add']} 
                                                        onChange={handleCheck}
                                                    /></td>
                                                <td className='bg-gray-300'>
                                                    <Input 
                                                        type='checkbox' 
                                                        name={permMap[menuItems[row]]+'_edit'} 
                                                        checked={chkbox[permMap[menuItems[row]]+'_edit']} 
                                                        onChange={handleCheck}
                                                    /></td>
                                                <td className='bg-gray-300'>
                                                    <Input 
                                                        type='checkbox' 
                                                        name={permMap[menuItems[row]]+'_delete'} 
                                                        checked={chkbox[permMap[menuItems[row]]+'_delete']} 
                                                        onChange={handleCheck}
                                                    /></td>
                                            </tr>
                                        )
                                    }) 
                                    :null}
                                </tbody>
                            </Table>
                            <Button type='submit' color='success' style={saveBtnStyle}> Save </Button>
                        </Form>          
                    </CardFooter>
                </Card>
            </Col>
            </Col>
        </>
    )
}

export default UserAccess