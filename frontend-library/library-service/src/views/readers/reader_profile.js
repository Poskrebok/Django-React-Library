import {
    Container,
    Card,
    CardHeader,
    Row,
    Col,
    Button,
    Input,
    CardBody,
    Form,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownItem
} from "reactstrap";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { URLS } from "../../url";
import axios from "axios";

const ReaderProfile = () => {
    const history = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [genres, setGenres] = useState([]);
    const [profile, setProfile] = useState({
        books_taken: '',
        debt: '',
        last_visit: '',
        fav_genre: ''
    })
    const [newReader, setNewReader] = useState({
        reader_name: location.state.reader_name,
        adress: location.state.adress,
        id: params.readerid
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReader({
            ...newReader,
            [name]: value
        });
    };

    const getGenre = (genreId) => {
        const foundGenre = genres.find((genre) => genre[0] === genreId);
        if (foundGenre) {
            return foundGenre[1];
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(URLS.GENREMANAGER).then(response => {
                console.log('Reciving Genres', response);
                setGenres(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            });
            await axios.get(URLS.READERPROFILE).then(response => {
                console.log('Reciving Genres', response);
                setProfile({
                    books_taken: response.data[0],
                    debt: response.data[1],
                    last_visit: response.data[2],
                    fav_genre: getGenre(response.data[3]),
                })
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            });
        };
        fetchData();
    }, []);
    const onEditReader = async () => {
        axios.post(URLS.READERMANAGER, newReader).then(response => {
            console.log('Success', response);
            history(`/Main/readers/`);
        }).catch(err => {
            console.error('Error', err);
        })
    }

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
                                    Favorite genre: {getGenre(profile.fav_genre)}
                                </Row>
                                <Row className="py-lg-1">
                                    Last visit: {profile.last_visit}
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