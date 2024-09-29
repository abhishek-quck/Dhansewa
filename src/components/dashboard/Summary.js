import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardHeader, Container } from "reactstrap";
import CollectionChart from "./CollectionChart";
import axios from "axios";

const Summary = () => {
    
    const [status, updateStatus] = useState({ clients:0 , centers:0, total:0 })

    useEffect(()=>{
        axios.get('live-collection-status').then(({data}) => console.log(data))
        .catch(()=>{})    
    },[])

    return (
    <>
    <Card>
        <CardHeader>
        <CardTitle tag="h6"  className="mt-1"> <i className="fa-solid fa-rectangle-list" /> Summary</CardTitle>
        </CardHeader>
        <CardBody className="dashboard-card">
        <CardSubtitle className="text-muted" tag="h6">
            <i className="fa-solid fa-circle-minus text-danger"></i> Today Live Collection Status
        </CardSubtitle>
        <Container className="mt-2">
            <table className="table-bordered table-gold">
                <tbody>
                    <tr>
                        <td> CENTERS </td>
                        <td> {status.centers} </td>
                    </tr>
                    <tr>
                        <td> LOAN CLIENTS </td>
                        <td> {status.clients} </td>
                    </tr>
                    <tr>
                        <td> PRINCIPAL OUTSTANDING </td>
                        <td> {status.total} </td>
                    </tr>
                </tbody>
            </table>
        </Container>
        <CollectionChart/>
        </CardBody>
    </Card>
    </>
    );
};

export default Summary;
