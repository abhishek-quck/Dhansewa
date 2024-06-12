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
  CardHeader, 
} from "reactstrap";

const LedgerRevise = () => { 

  return (
    <div> 
      <Card className="col-12">
        <CardHeader tag="h6" className="border-bottom mb-0 d-flex" >
          <b className="mt-2 mb-2"> LOAN LEDGER REVISE </b> 
        </CardHeader>
        <CardBody className="bg-gray-300">
            <Form>
              <FormGroup>
                <Row className="mt-2">
                 <Col md="3">
                        <Label  size={'sm'} for="exampleEmail"> Branches </Label>
                        <Input
                            id="exampleSelectMulti" 
                            name="selectMulti"
                            type="select"
                        >
                            <option> --SELECT BRANCH-- </option>
                            <option value={'enrollment'}> Enrollment </option>  
                        </Input>
                 </Col > 
                 <Col md="3">
                        <Label size={'sm'} for="center"> Centers </Label>
                        <Input
                            id="center" 
                            name="center"
                            type="select"
                        >
                            <option value={''}> --SELECT CENTER-- </option>
                            <option value={''}> Patupur </option>
                            <option value={''}> Basti </option> 
                            <option value={''}> Ajamgadh </option> 
                            <option value={''}> Firozabad </option> 
                            <option value={''}> Rampur </option> 
                            <option value={''}> Allahabad </option> 
                        </Input>
                 </Col > 
                 <Col md="3">
                    <Label  size={'sm'} for="exampleEmail"> Clients </Label>
                    <div className="d-flex">
                        <Input
                            id="exampleSelectMulti" 
                            name="branch"
                            type="select"
                            className="col-1" 
                        > 
                         <option> --SELECT CLIENT-- </option>
                        </Input>
                    </div>
                 </Col > 
                 <Col md="3">
                    <Label  size={'sm'} for="exampleEmail"> Loan Accounts </Label>
                    <div className="d-flex">
                        <Input
                            id="exampleSelectMulti" 
                            name="branch"
                            type="select"
                            className="col-1" 
                        > 
                         <option> --SELECT LOAN A/C-- </option>
                        </Input>
                    </div>
                 </Col > 
                </Row>   
              </FormGroup> 
              <div className="d-flex"> 
                <div className="col-md-7">
                    <Card>
                        <CardHeader>
                            <CardTitle> Loan Information </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row className="container">
                                <table className="table table-bordered">
                                    <tbody> 
                                        <tr>
                                            <td>
                                                <small>Loan ID</small>
                                            </td>
                                            <td colSpan={2}>
                                                <div className="d-flex"> 
                                                    <Input 
                                                        type="text"
                                                        name="search" 
                                                        style={{width:'350px'}}
                                                    />
                                                    <button className="btn btn-primary mx-2">
														<i className="fa fa-search" />
													</button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Loan Product </small>
                                            </td>
                                            <td colSpan={2}>
                                                 : (View Chart)
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Disbursement Date </small>
                                            </td>
                                            <td >
                                                <Input type="date" />
                                            </td>
                                            <td >
                                                 : Loan amount
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Loan Duration </small>
                                            </td>
                                            <td >
                                                <Input type="text" className="mt-1" />
                                            </td>
                                            <td >
                                                 : Expected Paidup Date
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Actual Paidup Date </small>
                                            </td>
                                            <td >
                                                <Input type="text" className="mt-1" />
                                            </td>
                                            <td >
                                                 : Total Interest Expected
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Principal Outstanding </small>
                                            </td>
                                            <td >
                                                <Input type="text" className="mt-1" />
                                            </td>
                                            <td >
                                                 : Interest Outstanding
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <small> Principal Arrear </small>
                                            </td>
                                            <td >
                                                 <Input type="text" className="mt-1" />
                                            </td>
                                            <td >
                                                 : Interest Arrear
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Row> 
                            <h5>Ledger Information</h5>
                            <div className="resultArea"></div>
                        </CardBody>
                        <CardFooter>
                            <button className="btn btn-rounded btn-success"> Ledger Regenerate </button>
                        </CardFooter>
                    </Card>
                </div> 
                <div className="col-md-4 offset-1">
                    <Card className="mx-1">
                        <CardHeader>
                            <CardTitle> ENTRY </CardTitle>
                        </CardHeader>
                        <CardBody>
                           
                        </CardBody>
                        <CardFooter>
                             
                        </CardFooter>
                    </Card>
                </div>
              </div>
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

export default LedgerRevise;
