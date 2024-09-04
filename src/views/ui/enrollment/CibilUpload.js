import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

function CibilUpload() {
    
    const initial = {};
    const [fields, setFields] = useState(initial)

    useEffect(()=>{},[]);

    return (
        <>
            <Card>
                <CardHeader>
                    <b> CIBIL UPLOAD </b>
                </CardHeader>
                <CardBody>

                </CardBody>
                <CardFooter>

                </CardFooter>
            </Card>
        </>
    )
}

export default CibilUpload