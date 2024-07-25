import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Row, Table } from "reactstrap";
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
    [
      {title: 'CIBIL REPORT', image:report, link:'#' },
      {title: 'LOAN FINDER', image:loan , link:'#'}
    ],
    [
      {title: 'CLIENT FINDER', image:client, link:'#' },
      {title: 'ENROLLMENT FINDER', image:enroll, link:'/search-enrolled' },
    ],
    [
      {title: 'VIDEO TUTORIAL', image:tutorial, link:'#' },
      {title: 'PROPOSAL FINDER', image: proposal, link:'#' }
    ]
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
  const imgStyle={height:60,width:'auto'}
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
        <Col sm="8" lg="8" xl="8" xxl="8" >
            <Row>
                <Col sm="6" lg="6" xl="7" xxl="6" > 
                    <button style={{backgroundColor:'rgba(0, 143, 251)'}} className="w-100 btn text-white" > 
                        Google Location
                    </button>
                </Col>
                <Col sm="6" lg="6" xl="7" xxl="6" >  
                    <button className="w-100 btn btn-danger" >
                        Connect Device
                    </button>
                </Col>
            </Row>
            <Row>
                <Col sm="6" lg="6" xl="7" xxl="6" > 
                    <IncomeChart />
                </Col>
                <Col sm="4" lg="4" xl="5" xxl="6" > 
                <div className="d-flex">
                    <ComponentCard >
                        {
                        MenuList.map( (item,i) => {
                            return (
                            <Row className="dashboard-card mb-2" key={i}> 
                                { item.map( (seq)=> {
                                return <Col sm="6" key={seq.title}>
                                    <div style={menuStyle}>
                                    <img className={`fs-2 mt-3`} src={seq.image} style={imgStyle} alt=""/>
                                    <Link to={seq.link} className="text-decoration-none text-center my-2">
                                        <b>{seq.title}</b>
                                    </Link> 
                                    </div>
                                </Col>
                                } )}
                            </Row>
                            )
                        })
                        }
                    </ComponentCard>
                </div> 
                </Col>
            </Row>
        </Col>
        <Col>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <i classname="fa-solid fa-circle-plus text-success"></i> Business
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Container>
                        <table className="table-bordered table-gold">
                            <tbody>
                                <tr>
                                    <td> CENTERS </td>
                                    <td> 111 </td>
                                </tr>
                                <tr>
                                    <td> LOAN CLIENTS </td>
                                    <td> 487 </td>
                                </tr>
                                <tr>
                                    <td> PRINCIPAL OUTSTANDING </td>
                                    <td> 7470653 </td>
                                </tr>
                                <tr>
                                    <td> INTEREST OUTSTANDING </td>
                                    <td> 1405262 </td>
                                </tr>
                                <tr>
                                    <td> TOTAL OUTSTANDING </td>
                                    <td> 8875915 </td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </CardBody>
            </Card>
        </Col>
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
