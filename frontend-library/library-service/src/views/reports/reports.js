import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Label,
    Input,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import axios from 'axios';
import { URLS } from '../../url';


/* Данная функция отвечает за создания страницы, отображающая отчеты. */
const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [readers, setReader] = useState([]);
    const [reportType, setReportType] = useState(`activeEvents`)
    /* Функции необходимые для работоспособности всплывающего окна. */
    const [modal, setModal] = useState(false);
    const [choosenId, setId] = useState();
    const toggle = () => setModal(!modal);
    /* Функция, закрывающая "событие" */
    const closeEvent = async () => {
        await axios.post(URLS.BOOKEVENTMANAGER, { id: choosenId }).then(response => {
            console.log('Event closing', response);
        }).catch(err => {
            console.error('Error', err);
        })
    }
    /* Функция, которая меняет тип отображаемых отчетов. */
    const changeReportType = () => {
        reportType === `activeEvents` ?
            setReportType(`debtEvents`) :
            setReportType(`activeEvents`);
    }

    /* Функция, которая возвращает название книги по его id */
    const getBook = (bookId) => {
        const founBook = books.find((book) => book[0] === bookId);
        if (founBook) {
            return founBook[1];
        }
    }

    /* Функция, которая возвращает имя читателя по его id */
    const getReader = (readerId) => {
        const foundReader = readers.find((reader) => reader[0] === readerId);
        if (foundReader) {
            return foundReader[1];
        }
    }

    /* Здесь пришлось сделать через ссылку с параметром, т.к. get запрос не может отправлять данные. */
    const loadData = async () => {
        await axios.get(`${URLS.REPORTS}${reportType}`).then(response => {
            console.log('Reciving reports', response);
            setReports(response.data);
        }).catch(err => {
            console.error('Error', err);
        })
    }

    /* Выгрузка данных при первом заходе на страницу.(и при изменении параметра reportType) */
    useEffect(() => {
        const fetchData = async () => {
            loadData();
            await axios.get(URLS.BOOKMANAGMENR).then(response => {
                console.log('Reciving books', response);
                setBooks(response.data);
            }).catch(err => {
                console.error('Error', err);
            })
            await axios.get(URLS.READERMANAGER).then(response => {
                console.log('Reciving Genres', response);
                setReader(response.data);
            }).catch(err => {
                console.error('Error', err);
            })
        };
        fetchData();
    }, [reportType]);


    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            </div>
            <Container fluid className="mt--7">
                <Row className="justify-content-center">
                    <Col lg="8">
                        <Card>
                            <CardHeader>
                                <Col>
                                    <Row>
                                        <h3>Reports page</h3>
                                    </Row>
                                    <Label check>
                                        <Input type="checkbox" checked={reportType === 'debtEvents'} onChange={() => {
                                            changeReportType();
                                        }} />{' '}
                                        Show only outdated events
                                    </Label>
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Book name</th>
                                            <th scope="col">Holder</th>
                                            <th scope="col">Date of issue</th>
                                            <th scope="col">Expected return</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report[0]} onClick={() => {
                                                setId(report[0]);
                                                toggle();
                                            }} style={{ cursor: 'pointer' }}>
                                                <th scope="col">{getBook(report[1])}</th>
                                                <th scope="col">{getReader(report[2])}</th>
                                                <th scope="col">{new Date(report[3]).toLocaleString()}</th>
                                                <th scope="col">{new Date(report[5]).toLocaleString()}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle}>Modal Title</ModalHeader>
                                    <ModalBody>
                                        Are you sure that book is alright and ready to be returned
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={() => {
                                            closeEvent();
                                            toggle();
                                        }}>Yes</Button>
                                        <Button color="secondary" onClick={toggle}>No</Button>
                                    </ModalFooter>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ReportsPage;