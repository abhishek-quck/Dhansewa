import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardHeader, Container } from "reactstrap";
import CollectionChart from "./CollectionChart";

const Summary = () => {
  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle tag="h5"  className="mt-1"> <i class="fa-solid fa-rectangle-list" /> Summary</CardTitle>
      </CardHeader>
      <CardBody className="dashboard-card">
        <CardSubtitle className="text-muted" tag="h6">
            <i class="fa-solid fa-circle-minus text-danger"></i> Today Live Collection Status
        </CardSubtitle>
        <Container className="mt-2">
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
