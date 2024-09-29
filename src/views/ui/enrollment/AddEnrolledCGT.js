import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { capitalFirst, getDocumentName } from '../../../helpers/utils';
import toast from 'react-hot-toast';
import { Form, Button, Card, CardBody, CardFooter, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { preview } from '../../../attachments';

function AddEnrolledCGT() {

    const dispatch = useDispatch();
    
    const {enroll_id} = useParams();
    const [fields, setFields]      = useState({});
    const [docs, setDocs]          = useState([]);
    const [reply, setReply]        = useState({status:'',remark:''});

    const status = [
        { value : 1, label:'APPROVE' },
        { value : 2, label:'REJECT' },
        { value : 3, label:'FURTHER' }
    ];

    const previewImage = (e) => {
        let { key }= e.target.dataset
        let doc = docs[parseInt(key)]
		preview([doc.data], doc.file_name )
	}

    const handleSubmit = e => {

        e.preventDefault();
        if( fields.status==='' ) {
            return toast.error('Fill the required fields!')
        }
        dispatch({ type:'LOADING' });

        axios.post('update-client-cgt-status', {...reply, enroll_id} )
        .then(({data}) => toast.success(data.message))
        .catch( e => console.log(e.message))
        .finally(()=> dispatch({ type:"STOP_LOADING" }));

    }

    useEffect(()=> {

        axios.post('search-enrolled/'+ enroll_id)
        .then(({data})=>{
            let stack = {};
            if( data.data?.length )
            {
                let { documents }= data.data[0];
                delete data.data[0].documents;
                delete data.data[0].other_info;
                setDocs(documents)
                for(let key in data.data[0]) {
                    if(typeof data.data[0][key] === 'object')
                    { 
                        for(let k in data.data[0][key]) {
                            stack[key=='other_info'? k: key+'_'+k] = data.data[0][key][k]
                        }
                    } else stack[key] = data.data[0][key]
                }
            }
            setFields(stack)
        })

    },[]);

    return (
        <>
        <div> 
          <Card className="col-7">
            <CardHeader className="d-flex">
              <b> CGT INFORMATION </b>
            </CardHeader>
            <CardBody className="bg-gray-300">
                    {
                        Object.keys(fields).map( key => {
                            return (
                                <Row className="mt-2" key={key}>
                                    <Col md="12">
                                        <div className="d-flex">
                                            <Label className="col-4" size={'sm'} for={key}>
                                                {capitalFirst(key.replaceAll('_',' '))}</Label>
                                            <Input
                                                id={key} 
                                                name={key}
                                                type={key.includes('address')? 'textarea':"text"}
                                                disabled
                                                defaultValue={fields[key]}
                                            />
                                        </div>
                                    </Col> 
                                </Row>
                            )
                        })
                    }  
                    {
                        docs.map( (doc,i) => {
                            return (
                                <Row className="mt-2" key={i} >
                                    <Col md={12}>
                                        <div className={'d-flex'} >
                                            <Label className="col-4" size={'sm'} > 
                                                { getDocumentName(doc.document_id) }    
                                            </Label>
                                            <button 
                                                className='btn' 
                                                type='button' 
                                                data-key={i} 
                                                onClick={ previewImage } 
                                                style={{ border:'1px dashed' }}
                                            > 
                                                Preview 
                                            </button> 
                                        </div>
                                    </Col> 
                                </Row>                
                            )
                        })
                    }
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
           
        </div>
        <Card className='col-3 offset-1' style={{position:'fixed',right:10,top:'100px'}}>
            <Form onSubmit={handleSubmit}> 
            <CardHeader>
                <b> UPDATE </b>
            </CardHeader>
            <CardBody>
                <FormGroup>
                    <Label> Status </Label>
                    <ReactSelect 
                        options={status}
                        className='status'
                        onChange={e => setReply({...reply, status:e.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label> Remark </Label>
                    <Input 
                        type={'textarea'}
                        name='remark'
                        onChange={ e => setReply({...reply, remark:e.target.value})}
                    />
                </FormGroup>
            </CardBody>
            <CardFooter>
                <Button type='submit' className='w-100' color='success'> Submit </Button>
            </CardFooter>
            </Form>
        </Card>
        </>
    );
}

export default AddEnrolledCGT