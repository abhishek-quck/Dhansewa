import React, { useEffect } from 'react';
import { Row, Col, CardTitle, Button, Card, CardBody, Label, Input } from 'reactstrap';
import ComponentCard from '../../components/ComponentCard';
import $ from 'jquery'

const CreditReport = () => {
	useEffect(()=>{
		[...document.getElementsByClassName('select2')].forEach(element => {  
            $(element).select2({
                placeholder:element.getAttribute('placeholder'),
                width:'100%'
            })            
        });
	},[])
  return (
    <Row>
      <Col>  
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="fa-solid fa-arrow-down"/>&nbsp;
            Cibil Data Manager
          </CardTitle>  
          <CardBody> 
            <Row className='d-flex'>
                <Col lg="6">
                <div className="mt-5">
                    <ComponentCard
                    title=''
                    style={{position:'relative'}}
                    subtitle={ 
                        <>
                        <img src={`https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg`} alt="pro version" className="mb-sm-5 mb-4 pb-3 col-sm-3 mx-2 w-50" style={{height:'75px'}}/>
                        <p className='text-dark' style={{position:'absolute',left:'130px',top:'27px'}}>Logo</p>
                        </>
                    }> 
                    <Col md="10" className='d-flex'>
                        <div className='col-3'> 
                            <Label  for="exampleEmail"> Branch ID </Label>
                        </div>
                        <Input
                            placeholder="Select Branch ID" 
                            name="selectMulti"
                            type="select"
                            multiple
							className='select2'
						>
                            <option> All </option>
                            <option> Benipur </option>  
                            <option> Madhubani </option>  
                        </Input>
                    </Col >
                    <Col md="10" className='d-flex mt-3'>
                        <div className='col-3'> 
                            <Label  for="exampleEmail"> Enroll From </Label>
                        </div>
                        <Input
                            id="exampleSelectMulti" 
                            name="selectMulti"
                            type="date" 
                        />  
                    </Col >
                    <Col md="10" className='d-flex mt-3'>
                        <div className='col-3'> 
                            <Label  for="exampleEmail"> Enroll To Date </Label>
                        </div>
                        <Input
                            id="exampleSelectMulti" 
                            name="selectMulti"
                            type="date" 
                        />  
                    </Col >
 

                    <div className="mt-3">
                        <Button
                        color="primary"
                        href="#" 
                        >
                        1. Enroll Enquiry Script
                        </Button>
                    </div>
                    <div className="mt-3">
                        <Button
                        color="primary"
                        href="#" 
                        >
                        2. Enroll Enquiry Sheet
                        </Button>
                    </div>
                    <div className="mt-3">
                        <Button
                        color="danger"
                        href="#" 
                        >
                        3. CGT Enquiry Script
                        </Button>
                    </div>
                    <div className="mt-3">
                        <Button
                        color="danger"
                        href="#" 
                        >
                        4. CGT Enquiry Sheet
                        </Button>
                    </div>

                    </ComponentCard>
                </div>
                </Col>
                <Col lg="6">
                <div className="mt-5">
                    <ComponentCard
                    title=''
                    subtitle={ 
                        <>
                        <img src={`https://www.wrappixel.com/wp-content/uploads/edd/2020/04/xtreme-react-admin-template-y.jpg`} alt="pro version" className="mb-sm-5 mb-4 pb-3 col-sm-3 mx-2 w-50" style={{height:'75px'}}/>
                        <p className='text-dark' style={{position:'absolute',left:'130px',top:'27px'}}>Logo</p>
                        </>
                    }
                    > 
                    <Col md="10" className='d-flex mt-3'>
                        <div className='col-3'> 
                            <Label for="exampleEmail"> Center No. </Label>
                        </div>
                        <Input
                            id="exampleSelectMulti" 
                            name="selectMulti"
                            type="text" 
                            placeholder='Enter Center no.'
                        />  
                    </Col > 
                    </ComponentCard>
                </div>
                </Col>
            </Row> 
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CreditReport;
