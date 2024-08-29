import { Button, CardTitle, Collapse, List, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {navigation} from './SidebarData'
import { useSelector } from "react-redux";
const Sidebar = () => {
  let location = useLocation(); 
  let navigationMenus = navigation
  const visibleMenus = useSelector(state=>state.auth.menus)
  const isAdmin = useSelector(state=>state.auth.isAdmin)
  const [navs, setNavigation] = useState([]);
  const [toggler, toggle] = useState({
    setting:false,
    enroll:false,
    center:false,
    group:false,
    activity:false,
    accounts:false,
    management:false,
    insurance:false
  })
  
  useEffect( () => {
    if(isAdmin)
    {
        navigationMenus = navigation
    } else {
        navigationMenus = navigationMenus.filter( item => visibleMenus.includes(navigationMenus.indexOf(item)))
    }
    console.log(navigationMenus,location.pathname);
    
    setNavigation(navigationMenus)
    return ()=>null
  },[location])

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const setToggle = ( name ) => {    
    let state = toggler
    let nextValue = !state[name]
    Object.keys(state).forEach(key=>state[key]=false)
    state[name]=nextValue
    toggle(state) 
  }  

  
  return (
    <div className={`p-3 light-theme`} >
      <div className="d-flex align-items-center" style={{flexDirection:'column'}}>
        <Logo />  
        <CardTitle>Micro Foundations</CardTitle>
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-2">
        <Nav vertical className="sidebarNav"  >
          {navs.map((navi, index) => (
            <NavItem key={index} 
              className={`mt-1 sidenav-bg ${location.pathname === navi.href || 
              navi.links?.includes(location.pathname) ? 'nav-link-active':''}`}
            >
              <Link
                to={navi.href}
                className={`text-decoration-none`+
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3 "
                } 
                data-href={navi.href}
                onClick={()=> setToggle(navi.name) }
              >
                <i className={navi.icon} />
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
              <Collapse isOpen={toggler[navi.name] || navi.links?.includes(location.pathname)} 
                className={`list-group ${toggler[navi.name] ?'show':null} ${toggler[navi.name] || navi.links?.includes(location.pathname)?'nav-link-active':''}`}>
                <List className={`sidebar-ul`} style={{marginLeft:'-31px'}} >
                {navi.sub?.length ? (
                  navi.sub.map((sub,key)=>{
                    return (
                    <li key={key} 
                    className={`nav-link sidebar-menu-child mt-1 ${location.pathname===sub.href?'sub-nav-link':''}`}
                    >
                        <Link
                          to={sub.href}
                          className={ `text-decoration-none`+
                            location.pathname === sub.href
                            ? "text-primary nav-link"
                            : "nav-link text-secondary "  
                          }
                        > 
                        <span className="ms-3 d-inline-block">{sub.title}</span>
                      </Link>
                    </li>)
                    }) 
                ):null}
                </List>
              </Collapse>
            </NavItem>
          ))} 
         </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
