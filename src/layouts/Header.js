import React, { useEffect, useState } from "react"; 
import {
  Navbar,
  Collapse,
  Nav, 
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/logos/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
    let {userToken, theme, myInfo, isAdmin} = useSelector(state=>state.auth) 
    let { username, name, email, login_id, first_name, last_name } = myInfo
    const [profileInfo, setProfile] = useState({
        username, 
        name, 
        email,
        login_id, 
        first_name, 
        last_name 
    })
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const updateProfile = e => {
        e.preventDefault()
        dispatch({type:"LOADING"})
        axios.post('update-profile', {...profileInfo, user_id:myInfo.id})
        .then(({ data })=> {
            toast.success('Profile updated!')
            if( data.user )
            {
                dispatch({type:'SET_AUTH', payload:data.user })
                localStorage.setItem('auth-user', JSON.stringify(data.user))
            }
        }).catch(err=>console.log(err.message))
        .finally(()=>dispatch({type:"STOP_LOADING"}))
    }

    const change = e => {
        setProfile({...profileInfo, [e.target.name]:e.target.value})
    }

    const logout = () => { 
        dispatch({type:'LOADING'})
        setTimeout(()=> dispatch({type:'LOGOUT'}), 1500 )  
        console.log(userToken);
    }

    useEffect(()=>{
        if(userToken === null)
        {
        return navigate('/login')
        }
        return () => null
    },[ userToken, navigate ])

    const navStyle = {
        position: 'fixed',
        width: '-webkit-fill-available',
        zIndex: 99
    }
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const Handletoggle = () => {
        setIsOpen(!isOpen);
    };
    const showMobilemenu = () => {
        document.getElementById("sidebarArea").classList.toggle("showSidebar");
    };
    return (
    <>
    <Navbar 
        color={theme.toLowerCase()} 
        className={`navbar-${theme==='Dark'?theme.toLowerCase():''} text-${theme==='Light'?'white':''}`} expand="md" 
        style={navStyle} 
    >
        <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
            <LogoWhite />
        </NavbarBrand>
        <Button
            color="primary"
            className="d-lg-none"
            onClick={() => showMobilemenu()}
        >
            <i className="bi bi-list"></i>
        </Button>
        </div>
        <div className="hstack gap-2">
        <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
        >
            {isOpen ? (
            <i className="bi bi-x"></i>
            ) : (
            <i className="bi bi-three-dots-vertical"></i>
            )}
        </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar> 
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
                <i className="fa-solid fa-desktop" /> General
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
            <i className={`bi-people`}></i> Members
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
            &#x20B9; Loan
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>
                <Link to={'/client-disbursement'} className={'text-decoration-none text-dark'}>
                    Client Disbursement
                </Link>
                </DropdownItem>
                <DropdownItem> Center Disbursement </DropdownItem>
                <DropdownItem> Branch Disbursement </DropdownItem>
                <DropdownItem> Reset </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
            &#x20B9; NPA
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem> Domant Loan Clients </DropdownItem>
                <DropdownItem> Arrear Centers </DropdownItem>
                <DropdownItem>
                <Link to={'/arrear-clients'} className={'text-decoration-none text-dark'}>
                    Arrear Clients
                </Link>
                </DropdownItem>
                <DropdownItem> Arrear Installments </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
                <i className={`fa-solid fa-signal`} /> Collections
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
                <i className={`bi bi-speedometer2`} /> Advance
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
                <i className={"fa-solid bi-gear"} /> HR
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
            <i className={"fa-solid fa-chart-column"} />  Accounts
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem>
                <Link 
                    to={'/accounts-ledger-view'} 
                    className="text-decoration-none text-dark"
                >
                    <i className={`fa-solid fa-book`}/> Ledger 
                </Link>
                </DropdownItem>
                <DropdownItem> 
                <i className={`fa-regular fa-calendar-days`}/> Daybook
                </DropdownItem> 
                <DropdownItem> 
                <Link 
                    to={`trial-balance`} 
                    className="text-decoration-none text-dark" 
                >
                    <span className="text-danger">&#x20B9;</span> Trial Balance
                </Link> 
                </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
            <span aria-haspopup="true" className=" nav-link">
                <Link 
                to={'/download-documents'} 
                className="text-decoration-none text-dark"
                >
                <i className={`fa fa-file`} /> Documents
                </Link> 
            </span>
            </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <b className="text-dark" style={{textShadow:'2px 2px 8px white'}}> 
            {name?? first_name+' '+last_name } 
            </b>
            <DropdownToggle color={theme==='Dark'?"secondary":''}>
            < img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="40"
                style={{boxShadow:'0px 4px 8px 1px gray'}}
            />
            </DropdownToggle>
            {/* Profile dropdown */}
            <DropdownMenu> 
            <DropdownItem>
                <i className="fa-solid fa-file-invoice-dollar" /> &nbsp; My Account 
            </DropdownItem>
            <DropdownItem onClick={toggleModal}>
                <i className="fa-regular fa-pen-to-square"/> &nbsp;Edit Profile 
            </DropdownItem>
            <DropdownItem>
                <Link 
                to={'/print-documents'} 
                className="text-decoration-none text-dark"
                >
                <i className="fa fa-print"/> &nbsp;Print Documents 
                </Link>
            </DropdownItem>
            <DropdownItem onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"/>&nbsp;Logout
            </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        </Collapse>
    </Navbar>
    <Modal isOpen={modal} toggle={toggleModal} >
        <Form onSubmit={updateProfile}>
        <ModalHeader toggle={toggleModal}> Update Profile </ModalHeader>
            <ModalBody>
            {isAdmin ?
                (<>
                <FormGroup>
                    <Label for="name"> Name </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        defaultValue={profileInfo.name}
                        onChange={change}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email"> Email </Label>
                    <Input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        defaultValue={profileInfo.email}
                        onChange={change}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="username"> Username </Label>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter @ username"
                        defaultValue={profileInfo.username}
                        onChange={change}
                    />
                </FormGroup>
                </>): (
                <>
                <FormGroup>
                    <Label for="first_name"> Name </Label>
                    <Input
                        type="text"
                        id="name"
                        name="first_name"
                        placeholder="Enter first name"
                        defaultValue={profileInfo.first_name}
                        onChange={change}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="last_name"> Last name </Label>
                    <Input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Enter last name"
                        defaultValue={profileInfo.last_name}
                        onChange={change}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="login_id"> Email </Label>
                    <Input
                        type="text"
                        id="login_id"
                        name="login_id"
                        placeholder="Enter email"
                        defaultValue={profileInfo.login_id}
                        onChange={change}
                    />
                </FormGroup>
                
                </>
                ) }
            </ModalBody>
        <ModalFooter>
            <button className="btn btn-success" onClick={toggleModal}>
            Update 
            </button>{' '}
            <button className="btn btn-outline-primary" type="button" onClick={toggleModal}>
            Close
            </button>
        </ModalFooter>
        </Form>
    </Modal>
    </>
    );
};

export default Header;
