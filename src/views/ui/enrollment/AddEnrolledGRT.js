import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validate } from '../../../helpers/utils';
import toast from 'react-hot-toast';
import { Card, CardBody, CardHeader, FormGroup, Row } from 'reactstrap';
import { Form } from 'react-router-dom';

function AddEnrolledGRT() {
    const [fields, setFields] = useState({});
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault();
        const {shouldGo, result} = validate(fields,[]);
        if(shouldGo===false)
        {
            console.log(result)
            toast.error('Fill the required fields!');
            return 
        }
        dispatch({type:'LOADING'});
        axios.post('/add-cgt',fields).then(({data})=>{
            console.log(data)
        }).catch(err=>console.log(err.message))
        .finally(()=>dispatch({type:'STOP_LOADING'}))
    }
    
    useEffect(()=>{
        console.log('rendered...')
    },[])

    return (
        <div>
            <Card>
                <CardHeader>

                </CardHeader>
                <CardBody>
                    <Row>
                        <FormGroup>

                        </FormGroup>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddEnrolledGRT