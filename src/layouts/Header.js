import React, { useEffect } from "react"; 
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
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/logos/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let {userToken, theme} = useSelector(state=>state.auth) 
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const changeTheme = () => {
	dispatch({type:'THEME', payload: theme==='Dark'?'Light':'Dark'})
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
          <DropdownToggle color={theme==='Dark'?"secondary":''}>
            < img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="40"
            />
          </DropdownToggle>
          {/* Profile dropdown */}
          <DropdownMenu> 
            <DropdownItem>
				      <i className="fa-solid fa-file-invoice-dollar" /> &nbsp; My Account 
			      </DropdownItem>
            <DropdownItem>
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
  );
};

export default Header;
