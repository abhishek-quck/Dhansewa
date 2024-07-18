import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row, Table } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Summary from "../components/dashboard/Summary";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import IncomeChart from "../components/dashboard/IncomeChart";
import loan from '../assets/images/loan.jpg'
import report from '../assets/images/report.jpg'
import enroll from '../assets/images/search_files.png'
import client from '../assets/images/user.jfif'
import proposal from '../assets/images/proposal.webp'
import tutorial from '../assets/images/tutorial.png'
import ComponentCard from "../components/ComponentCard";

const Starter = () => {
  let navigate = useNavigate()
  let state = useSelector(state=>state.auth)

  const MenuList = [
    {title: 'CIBIL REPORT', image:report, link:'#' },
    {title: 'LOAN FINDER', image:loan , link:'#'},
    {title: 'CLIENT FINDER', image:client, link:'#' },
    {title: 'ENROLLMENT FINDER', image:enroll, link:'/search-enrolled' },
    {title: 'VIDEO TUTORIAL', image:tutorial, link:'#' },
    {title: 'PROPOSAL FINDER', image: proposal, link:'#' }
  ]
  const menuStyle={
    background:'white',
    border:'2px solid green',
    borderRadius:'12px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginInline:'10px'
  }
  const imgStyle={height:100,width:'auto'}
  const [birthDayNotices, setNotice] = useState([
    { branch : 'Head office', staff:'MAHENDER', date:'19/08/1993' }
  ])
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
    return ()=>null

  },[navigate,state.userToken,state.companyID])
  return (
    <div className="dashboard"> 
      
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Summary /> 
        </Col>
      </Row> 
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
        </Col>
        <Col sm="6" lg="6" xl="7" xxl="8" > 
          <IncomeChart />
        </Col>
        <div className="d-flex">
        <ComponentCard >
          <Row className="dashboard-card"> 
            {
              MenuList.map( item => {
                return (
                  <Col sm="2" className="mb-sm-4" key={item.title}>
                    <div style={menuStyle}>
                      <img className={`fs-2 mt-4`} src={item.image}  style={imgStyle}/>
                      <Link to={item.link} className="text-decoration-none text-center my-3">
                        <b>{item.title}</b>
                      </Link> 
                    </div>
                  </Col>
                )
              })
            }
          </Row>
        </ComponentCard>
        </div> 
      </Row>
      <Row>
        <div>
          <Card>
            <CardBody className="dashboard-card">
                <CardText tag={'div'}>
                    <h3 className="text-center mt-1"> Notice Board </h3>
                    <small> Recent Birthdays Branch Staff </small>
                </CardText>
              <Table hover bordered striped style={{fontSize:'small'}}>
                <thead>
                    <tr>
                        <th> Branch </th>
                        <th> Staff Name </th>
                        <th> DOB </th>
                    </tr>
                </thead>
                <tbody> 
                  {
                    birthDayNotices.map( row => {
                      return <tr key={row.date}>
                        <td> {row.branch} </td>
                        <td> {row.staff} </td>
                        <td> {row.date} </td>
                      </tr>
                    })
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Starter;
