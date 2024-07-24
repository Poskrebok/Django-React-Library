import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, CardTitle } from "reactstrap";

/* Данная функция отвечает за создания страницы, отображающая отчеты. */
const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            </div>
            <Container fluid className="mt--7">
                <Row className="justify-content-center">
                    <Col lg="8">
                        <Card>
                            <CardHeader>
                                <h3>Reports page</h3>
                            </CardHeader>
                            <CardBody>
                                <p>This is page made for reports</p>
                            </CardBody>
                        </Card>
                        <Row className="d-flex justify-content-center">
                            <Col lg="6" xl="4">
                            
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ReportsPage;