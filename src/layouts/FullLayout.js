import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useSelector } from "react-redux"; 
import { useEffect, useState } from "react";
import Loader from "react-js-loader";
import { Toaster } from "react-hot-toast";

const FullLayout = () => { 
  // eslint-disable-next-line
  let navigate = useNavigate()
  const sidebarStyle = { position:'fixed', overflow:'scroll', zIndex:777 }
  const {userToken, companyID} = useSelector(state=>state.auth)
  let isLoading = useSelector(state => state.auth.loading)
  let isLoggedIn = userToken && (companyID || localStorage.getItem('companyID'))
  const [loading, setLoading] = useState(isLoading) 
  useEffect(()=> {  
    setLoading(isLoading)
    return ()=>null
  },[userToken , isLoading, navigate ])
  return (
    <main className={'light'} >
	  <Toaster/>	 
      <div className="pageWrapper d-lg-flex">
        <div className={`${loading?'item':"item d-none"}`}> 
          <Loader type="spinner-default" style={{position:'absolute'}} bgColor={'gray'} color={'white'} size={70}/>
        </div>

       {/** Sidebar **/}  
       {isLoggedIn &&
        <aside className={`sidebarArea shadow`} id={`sidebarArea`} style={sidebarStyle}>
          <Sidebar />
        </aside>
        }
      
        <div className={`contentArea`} style={{ marginLeft:isLoggedIn ? 235 :'' }}>
          {/** Header **/}
          { isLoggedIn && <Header /> }
          <Container className="p-4 wrapper" fluid style={{marginTop:60}}>
            <Outlet /> {/* content-area */}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;