import axios from "axios";
import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  Table,
  CardHeader, 
} from "reactstrap";

const AddEnrollment = () => { 

    const dispatch = useDispatch()
    const [searched, setSearch] = useState(false)
    const [fields ,setFields] = useState({
        source:'',
        branchName:'',
        name:''
    })
    const [responseData ,setResponse] = useState([])

    const setChange = e => {
        setFields({...fields, [e.target.name]:e.target.value })
    }
    // eslint-disable-next-line
    const centers = useSelector(state=>state.auth.center)
    // console.log(centers)

    const handleSearch = e => {
        e.preventDefault()
        setSearch(true)
        dispatch({type:'LOADING'})
        axios.post('/get-GRT-clients', fields )
        .then(({data})=>{
            console.log(data)
            setResponse(data)
            let object = {}
            if(data.length)
            {
                for(let item of data)
                {
                    object[item.id]=item
                }
                dispatch({type:'PUT_GRTs',payload:object})
            }
        }).finally(()=>{
            dispatch({type:'STOP_LOADING'})
        })
    }

    useEffect(()=>{},[])

    return (
        <div> 
            <Card className="col-12">
            <CardHeader tag="h6" className=" d-flex" >
                <b>CLIENT GRT</b>
            </CardHeader>
            <CardBody className="bg-gray-300">
                <Form onSubmit={handleSearch}>
                    <FormGroup>
                    <Row>
                        <Col md="2">
                        <Label size={'sm'} for="exampleEmail"> Data Source</Label>
                        <Input
                            id="exampleSelectMulti" 
                            name="source"
                            onChange={setChange}
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
                                onChange={setChange}
                            >
                                <option> All </option>
                                <option value={'Patupur'}> Patupur </option>
                                <option value={'Basti'}> Basti </option> 
                                <option value={'Ajamgadh'}> Ajamgadh </option> 
                                <option value={'Firozabad'}> Firozabad </option> 
                                <option value={'Rampur'}> Rampur </option> 
                                <option value={'Allahabad'}> Allahabad </option> 
                                {/* 
                                    centers.map((option,index)=>{
                                        return <option value={option.value}>{option.label}</option>
                                    })
                                 */}
                            </Input>
                        </Col > 
                        <Col md="5">
                        <Label size={'sm'} for="search"> Search </Label>
                        <div className="d-flex">
                            <Input
                                id="search" 
                                name="name"
                                type="text"
                                className="col-1"
                                style={{width:'250px',height:'37px'}}
                                placeholder="Search Name / Aadhaar"
                                onChange={setChange}
                            />
                            <button className="btn btn-sm btn-danger mx-4"> Pending GRT </button>
                        </div>
                        </Col > 
                    </Row>   
                    </FormGroup> 
                </Form>
                <Table bordered hover style={{fontSize:'small'}}>
                    <thead>
                        <tr>
                            <th> SN </th>
                            <th> Date </th>
                            <th> Full Name </th>
                            <th> Address </th>
                            <th> Mobile </th>
                            <th> Member ID </th>
                            <th> Status </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData.length ? 
                            responseData.map((row,index)=>{
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{row['Date']}</td>
                                <td>{row['Fullname']}</td>
                                <td>{row['address']}</td>
                                <td>{row['phone']}</td>
                                <td>{row['memberID']}</td>
                                <td>{row['status']}</td>
                                <td>
                                    <Link 
                                        className="text-decoration-none" 
                                        to={'/review-client/'+row['id']}
                                    >
                                        Review
                                    </Link>
                                </td>
                            </tr>
                        }):
                        searched ? 
                        <tr className="text-center">
                            <td colspan={8} className="text-danger fs-4">
                                No records found!
                            </td>
                        </tr>
                        :''
                    }
                    </tbody>
                </Table>
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
