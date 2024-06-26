import { Button, Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Summary from "../components/dashboard/Summary";
import ProjectTables from "../components/dashboard/ProjectTable"; 
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  let navigate = useNavigate()
  let state = useSelector(state=>state.auth)
  
  useEffect(()=>{
    if(state.companyID===null || state.userToken===null)
    {
      if(state.userToken)
      {
        navigate('/landing')
        return   
      }
      navigate('/login')  
    }
  },[navigate,state.userToken,state.companyID])
  return (
    <div>
      {/***Top Cards***/}
      
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Summary /> 
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="8" xl="7" xxl="8" >
          <Button
            color="primary"
            className="col-md-6 " 
            style={{backgroundColor:'rgba(0, 143, 251)'}}
          >Google Location
          </Button>
          <Button
            color="danger"
            className="col-md-5 mx-4"  
          >Connect Device
          </Button>
          <ProjectTables /> 
          <Summary /> 
        </Col>
        <Col lg="8" xl="7" xxl="8">
          <ProjectTables /> 
          <Summary /> 
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
