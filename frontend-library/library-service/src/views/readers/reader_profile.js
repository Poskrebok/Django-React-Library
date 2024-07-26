import {
    Container,
    Card,
    Row,
    Col,
    Button,
    Input,
    CardBody,
    Form,
} from "reactstrap";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { URLS } from "../../url";
import axios from "axios";

/*Профиль читателя: данная функция обеспечивает нас информацией об предпочтениях читателя, а так же позвояляет провести некоторые изменения в нем */
const ReaderProfile = () => {
    const history = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [genres, setGenres] = useState([]);
    const [profile, setProfile] = useState({
        books_taken: '',
        debt: '',
        last_visit: '',
        fav_genre: []
    })/* Форма статистических данных по читателю */
    const [newReader, setNewReader] = useState({
        reader_name: location.state.reader_name,
        adress: location.state.adress,
        id: params.readerid
    });/* Форма для смены параметров читателя.  */
    /* Данная функция ловит изменения, которые ввел пользователь в полях. */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReader({
            ...newReader,
            [name]: value
        });
    };

    /* Функция возвращающая имя жанра по его id */
    const getGenre = (genreId) => {
        const foundGenre = genres.find((genre) => genre[0] === genreId);
        if (foundGenre) {
            return foundGenre[1];
        }
    }

    /* Функция, которая загрузке страницы выкачивает необходимые данные с эндпоинтов(Жанры и Авторы)  
    Нам это нужно, т.к. в статистике мы получаем id жанра и автора, а не их имена*/
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(URLS.GENREMANAGER).then(response => {
                console.log('Reciving Genres', response);
                setGenres(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            });
            await axios.get(`${URLS.READERPROFILE}${newReader.id}`).then(response => {
                console.log('Reciving reader profile', response);
                setProfile({
                    books_taken: response.data[0],
                    debt: response.data[1],
                    last_visit: response.data[2],
                    fav_genre: response.data[3],
                })
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            });
        };
        fetchData();
    }, []);

    /* Функция, утверждающая внесенные нами изменения в читателя. Отпровляет все на сервер. */
    const onEditReader = async () => {
        axios.post(URLS.READERMANAGER, newReader).then(response => {
            console.log('Success', response);
            history(`/Main/readers/`);
        }).catch(err => {
            console.error('Error', err);
        })
    }

    /* Удаляет нашего читателя. Скорее всего работать не будет если на него есть записи в событиях.*/
    const onDeleteReader = async () => {
        axios.delete(URLS.READERMANAGER, { data: { id: newReader.id } }).then(response => {
            console.log('Success', response);
            history(`/Main/readers/`);
        }).catch(err => {
            console.error('Error', err);
        })
    }


    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            </div>
            <Container fluid className="mt--7">
                <Col lg="6" md="8" className="m-auto align-self-center">
                    <Card>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form>
                                <Row className="py-lg-1">
                                    <Input
                                        className="form-control"
                                        id="reader_name"
                                        name="reader_name"
                                        placeholder="Enter reader name"
                                        type="text"
                                        value={newReader.reader_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Row>
                                <Row className="py-lg-1">
                                    Books taken: {profile.books_taken}
                                </Row>
                                <Row className="py-lg-1">
                                    Books in debt: {profile.debt}
                                </Row>
                                <Row className="py-lg-1">
                                    Favorite genre: {(profile.fav_genre[0])}
                                </Row>
                                <Row className="py-lg-1">
                                    Last visit: {profile.last_visit.toString()}
                                </Row>
                                <Row className="py-lg-1">
                                    <Col>
                                        <Button color="primary" onClick={onEditReader}>
                                            Save changes
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button color="danger" onClick={onDeleteReader}>
                                            Delete reader
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button color="primary" onClick={(e) => (history(`/Main/readers/`))}>
                                            Return
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </>);
};

export default ReaderProfile;