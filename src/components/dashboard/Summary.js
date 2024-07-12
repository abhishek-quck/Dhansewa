import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import CollectionChart from "./CollectionChart";

const Summary = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Summary</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Today Live Collection Status
        </CardSubtitle>
        <CollectionChart/>
      </CardBody>
    </Card>
  );
};

export default Summary;
