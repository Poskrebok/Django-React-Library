import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Label, Input, Table } from "reactstrap";
import axios from 'axios';
import { URLS } from '../../url';

/* Эта функция реализует демонстрацию статистики по самым полпулярным жанрам и авторам. */

const Statistic = () => {
    const [reportGenre, setReportGenre] = useState([]);
    const [reportAuthor, setReportAuthor] = useState([]);
    /* Функция, которая загрузке страницы выкачивает необходимые данные с эндпоинтов(отчет по жанрам и отчет по авторам.)  */
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${URLS.REPORTS}popGenres`).then(response => {
                console.log('Reciving reports', response);
                setReportGenre(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            })
            await axios.get(`${URLS.REPORTS}popAuthor`).then(response => {
                console.log('Reciving reports', response);
                setReportAuthor(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            })
        };
        fetchData();
    }, [])
    

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
            <Container fluid className="mt--7">
                <Row className="justify-content-center">
                    <Col lg="8">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col>
                                        <h3>Statistic</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardBody>
                                                <Table className="align-items-center table-flush" responsive>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Genre</th>
                                                            <th>Num of picking</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {reportGenre.map((genre) => (
                                                            <tr key={genre[0]}>
                                                                <td>{genre[0]}</td>
                                                                <td>{genre[1]}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card>
                                            <CardBody>
                                                <Table className="align-items-center table-flush" responsive>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Author</th>
                                                            <th>Num of picking</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {reportAuthor.map((author) => (
                                                            <tr key={author[0]}>
                                                                <td>{author[0]}</td>
                                                                <td>{author[1]}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Statistic;