import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, CardTitle } from "reactstrap";
import axios from 'axios';
import { URLS } from '../../url';


/* Данная функция отвечает за создания страницы, отображающая отчеты. */
const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [Authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(URLS.REPORTS).then(response => {
                console.log('Reciving books', response);
                setBooks(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            })
            await axios.get(URLS.BOOKMANAGMENR).then(response => {
                console.log('Reciving books', response);
                setBooks(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            })
            await axios.get(URLS.GENREMANAGER).then(response => {
                console.log('Reciving Genres', response);
                setGenres(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            })
            await axios.get(URLS.AUTHORMANAGER).then(response => {
                console.log('Reciving authors', response);
                setAuthors(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            })
        };
        fetchData();
    }, []);


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