import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from './SidebarData';

function Landing() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {companyID} = useSelector(state=>state.auth)
  const [modal, setModal] = useState(false);
  const [company, select] = useState(companyID);
  const [companies, fillCompanies] = useState([]);
  const toggle = () => setModal(!modal); 
    const setCompany = () => { 
        dispatch(
        {
            type:'SET_COMPANY', 
            payload:{
                id:document.getElementById('company').value,
                name:document.querySelectorAll('option:checked')[0].text 
            }
        })
    }

  useEffect(()=>{
    if( companyID===null )
    {   
      setModal(true)     
      axios.get('get-companies').then(({data})=>{
         
        if(data.length)
        {
          fillCompanies(data)
        }
        axios.get('permitted-menus').then(({data})=>{
            let ids;
            dispatch({type:'SET_ADMIN_STATUS',payload:data.admin })
            localStorage.setItem('isAdmin', data.admin)
            if(data.admin)
            {
                ids = Object.keys(navigation)
            }else {
                let menus = data.menu
                ids = menus.map( r => r['menu_id'])
            }
            localStorage.setItem('menus', JSON.stringify(ids))
            dispatch({type:'SET_DASHBOARD_MENU', payload: ids })
        })
      })
      .catch(err=>err.message)
    }else
    { 
      navigate('/dashboard')
    }

  },[companyID,navigate])

  const handleCompany = e => { 
    select(e.target.value)
    setCompany()
    setModal(!modal)
    navigate('/dashboard')
  }

  return (
    <> 
      <Modal
        isOpen={modal} 
        toggle={toggle}
        className={`className`}
        backdrop={'static'}
        keyboard={false}
        centered={true}
      >
        <ModalHeader > Company </ModalHeader>
        <ModalBody>
          <Input type={`select`} id={`company`} onChange={handleCompany} >
            <option value={''}> Select Company </option>
            { 
              companies.map((option,key)=>
              {
                return <option value={`${option.id}`} key={key} > {option.name} </option>
              })
            } 
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={ !company } onClick={toggle}>
            Get Started
          </Button>{' '} 
        </ModalFooter>
      </Modal>
     </>
  )
}

export default Landing