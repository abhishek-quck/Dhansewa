import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Label, Row } from 'reactstrap'
import ReactSelect from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SanctionUpload() {

    const clientRef = useRef(null)
    const dispatch = useDispatch()
    const { loanProducts } = useSelector( state => state.auth )
    const [ branches, setBranches ] = useState([])
    const [ centers, setCenters]       = useState([]);
    const [ clients, setClients]       = useState([]);
    const [ submitted ]     = useState(false);
    const [sFields, setSearchField] = useState({
        branch:'',
        center:'',
        enroll_id:'',
        loan_id:''
    });

    const init = () => { // GEt Branches, Centers , loan-products & client info

        dispatch({ type:'LOADING' })
        axios.get('get-options') 
        .then(({data}) => 
        {  
            if(data.branches) setBranches(data.branches)  
            
            if(!Object.keys(loanProducts).length) {
                axios.get('get-product-details').then(({data})=> {
                    let loanProducts = {}
                    data.forEach( _ => {
                        loanProducts[_.id] = _
                    });
                    dispatch({
                        type:'SET_LOAN_PRODUCTS',
                        payload:loanProducts
                    })
                }).catch(e=> {})
            }

        })
        .catch(e => dispatch({ type:'ERROR', payload: {code:e.response.status, error:e.message }}))
        .finally(() => dispatch({ type:'STOP_LOADING' }))
        
    }

    const updateBranch = (e) => {

        clientRef.current.clearValue()
        setSearchField({...sFields, branch:e.value})
        dispatch({type:'LOADING'})
        axios.get('get-branch-centers/'+ e.value).then(({data})=> {
            setCenters(data.map(item => ({ value: item.id, label: item.name})))
            setClients([])
        }).catch(err=>{
            console.log(err.message)
            setCenters([])
            setClients([])
        }).finally(()=>dispatch({type:'STOP_LOADING'}))
        
    }

    const updateCenter = (e) => {

        setSearchField({...sFields, center:e.value })
        dispatch({ type:'LOADING' })
        axios.get('get-center-used-loans/'+ e.value )
        .then(({data})=> {
            console.log(data)
            setClients(data)
        })
        .catch(err=>{
            console.log(err.message)
            toast.error('Something went wrong!');
            setClients([])
        }).finally(()=> dispatch({ type:'STOP_LOADING' }))
        
    }

    const triggerLoanID = (e) => {
        if(e)
        {
            setSearchField({...sFields, loan_id:e.value })
            
            fetchData()
        }
    }

    const fetchData = () => {         

        if(sFields.branch && sFields.center && sFields.loan_id)
        {
            dispatch({type:'LOADING'})
            axios.post('/search-in-loan', sFields)
            .then(({data})=>{
                console.log(data)
            })
            .catch(e => dispatch({ type:'ERROR', payload:{code:e.response.status, error:e.message}}))
            .finally(()=> dispatch({ type:'STOP_LOADING' }) )
        }

    }

    const handleUpload = e => {
        e.preventDefault();
    }

	useEffect(() => {

        init();
        $(document).on('change','select', function(){
            this.style.border = ''
        });
        return ()=> $(document).off('change','select')
	},[submitted])

    return (
        <div>
            <Card >
                <CardHeader>
                    <b> UPLOAD SANCTION LETTER </b>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleUpload}>
                        <FormGroup>
                            <Row>
                            <Col md="4">
                                <Label size={'sm'} for="branches"> Branch </Label>
                                <ReactSelect
                                    id='branches'
                                    name='branch'
                                    onChange={updateBranch}
                                    options={branches}
                                />
                            </Col > 
                            <Col md="4">
                                <Label size={'sm'} for="center"> Center </Label>
                                <ReactSelect
                                    id='branches'
                                    name='branch'
                                    onChange={updateCenter}
                                    options={centers}
                                />
                            </Col > 
                            <Col md="4">
                                <Label size={'sm'} for="clientID"> Loan ID </Label>
                                <div className="d-flex">
                                    <ReactSelect
                                        id="clientID"
                                        isSearchable
                                        options={clients}
                                        ref={clientRef}
                                        className="w-100 client"
                                        defaultValue={sFields.loan_id}
                                        onChange={triggerLoanID}
                                    /> 
                                </div>
                            </Col > 
                            </Row>   
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
