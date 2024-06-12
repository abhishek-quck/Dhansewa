import React, {  } from "react"; 
import { 
  Card,
  CardBody,
  CardTitle,   
  Form,
  FormGroup,
  Label,
  Input, 
  Row,
  Col,
  CardFooter, 
} from "reactstrap";

const AddEnrollment = () => { 

  return (
    <div> 
      <Card className="col-12">
        <CardTitle tag="h6" className="border-bottom p-3 mb-0 d-flex" >
          <b>CLIENT GRT</b>
        </CardTitle>
        <CardBody className="bg-gray-300">
            <Form>
              <FormGroup>
                <Row >
                 <Col md="2">
                        <Label size={'sm'} for="exampleEmail"> Data Source</Label>
                        <Input
                            id="exampleSelectMulti" 
                            name="selectMulti"
                            type="select"
                        >
                            <option value={'cgt'}> CGT </option>
                            <option value={'enrollment'}> Enrollment </option>  
                        </Input>
                 </Col > 
                 <Col md="2">
                        <Label size={'sm'} for="branchName">Branch Name</Label>
                        <Input
                            id="branchName" 
                            name="branchName"
                            type="select"
                        >
                            <option> All </option>
                            <option value={''}> Patupur </option>
                            <option value={''}> Basti </option> 
                            <option value={''}> Ajamgadh </option> 
                            <option value={''}> Firozabad </option> 
                            <option value={''}> Rampur </option> 
                            <option value={''}> Allahabad </option> 
                        </Input>
                 </Col > 
                 <Col md="5">
                    <Label  size={'sm'} for="search"> Search </Label>
                    <div className="d-flex">
                        <Input
                            id="search" 
                            name="search"
                            type="text"
                            className="col-1"
                            style={{width:'250px',height:'37px'}}
                            placeholder="Search Name / Aadhaar"
                        />
                        <button className="btn btn-sm btn-danger"> Pending GRT </button>
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
            </Form>
        </CardBody>
        <CardFooter>
          <div className="mt-3" id="resultArea">  
          </div> 
        </CardFooter>
      </Card> 
      
    </div>
  );
};

export default AddEnrollment;
