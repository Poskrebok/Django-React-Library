import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  CardBody,
  Form,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  Label,
} from "reactstrap";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { URLS } from "../../url";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookProfile = () => {
  const history = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [Authors, setAuthors] = useState([]);
  const [Readers, setReaders] = useState([]);
  const [newBook, setNewBook] = useState({
    book_title: location.state.title,
    genre_id: location.state.genreid,
    author_id: location.state.authorid,
    isReturned: location.state.isReturned,
    id: params.bookid
  });
  const [event, setEvent] = useState({
    reader_id: '',
    book_id: params.bookid,
    transaction_expected_return: ''
  });
  /* Функция для открытия/зыкрытия модального окна. */
  const toggle = () => setModal(!modal);
  /* Ловлю изменения внесенные в книгу. */
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };
  /* Ловлю изменение времени */
  const handleDateTimeChange = (date) => {
    setEvent({
      ...event,
      transaction_expected_return: date
    })
  };
  /* Ловлю изменения внесенные в Евент */
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value
    });
  };
  /* Создаю "событие" т.е. выдаю книгу. */
  const onEventCreate = async () => {
    console.log(`Event:`, event.book_id)
    console.log(`Event:`, event.reader_id)
    axios.put(URLS.BOOKEVENTMANAGER, event).then(response => {
      console.log('Success', response);
      history(`/Main/books/`);
    }).catch(err => {
      console.error('Error', err);
    })
  }

  /* Получаю автора по его id */
  const getAuthor = (authorId) => {
    const foundAuthor = Authors.find((author) => author[0] === authorId);
    if (foundAuthor) {
      return foundAuthor[1];
    }
  }

  /* Получаю жанр по его id */
  const getGenre = (genreId) => {
    const foundGenre = genres.find((genre) => genre[0] === genreId);
    if (foundGenre) {
      return foundGenre[1];
    }
  }

  /* Получаю читателя по его id */
  const getReader = (readerId) => {
    const foundReader = Readers.find((reader) => reader[0] === readerId);
    if (foundReader) {
      return foundReader[1];
    }
  }

  /* При загрузке страницы выкачиваем
  жанры, авторов, читателей. */
  useEffect(() => {
    const fetchData = async () => {
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
      await axios.get(URLS.READERMANAGER).then(response => {
        console.log('Reciving readers', response);
        setReaders(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error('Error', err);
      })
    };
    fetchData();
  }, []);

  /* Подтверждаем изменение книги.  */
  const onEditBook = async () => {
    axios.post(URLS.BOOKMANAGMENR, newBook).then(response => {
      console.log('Success', response);
      history(`/Main/books/`);
    }).catch(err => {
      console.error('Error', err);
    })
  }

/* Подтверждаем удаление книги.  */
  const onDeleteBook = async () => {
    axios.delete(URLS.BOOKMANAGMENR, { data: { id: newBook.id } }).then(response => {
      console.log('Success', response);
      history(`/Main/books/`);
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
                    id="book_title"
                    name="book_title"
                    placeholder="Enter book title"
                    type="text"
                    value={newBook.book_title}
                    onChange={handleBookChange}
                    required
                  />
                </Row>
                <Col >
                  <Row>
                    <Button color="primary" onClick={toggle} disabled={!newBook.isReturned}>Hand out book</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Enter book title</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Label for="datetimePicker">Select Date and Time of book returning:</Label>
                          <DatePicker
                            selected={event.transaction_expected_return}
                            name="transaction_expected_return"
                            onChange={handleDateTimeChange}
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeCaption="Time"
                          />
                        </Row>
                        <Row>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              color="dark"
                            >
                              {getReader(event.reader_id)}
                            </DropdownToggle>
                            <DropdownMenu >
                              {Readers.map((reader) => (
                                <DropdownItem key={reader[0]} onClick={() => handleEventChange({ target: { name: 'reader_id', value: reader[0] } })}>
                                  {reader[1]}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="Save" onClick={() => {
                          onEventCreate();
                          toggle();
                        }}>Save</Button>{' '}
                        <Button color="Cancel" onClick={toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Row>
                </Col>
                <Col>
                  <Row className="py-lg-1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        color="dark"
                      >
                        {getGenre(newBook.genre_id)}
                      </DropdownToggle>
                      <DropdownMenu >
                        {genres.map((genre) => (
                          <DropdownItem key={genre[0]} onClick={() => handleBookChange({ target: { name: 'genre_id', value: genre[0] } })}>
                            {genre[1]}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Row>
                  <Row className="py-lg-1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        caret
                        color="dark"
                      >
                        {getAuthor(newBook.author_id)}
                      </DropdownToggle>
                      <DropdownMenu >
                        {Authors.map((author) => (
                          <DropdownItem key={author[0]} onClick={() => handleBookChange({ target: { name: 'author_id', value: author[0] } })}>
                            {author[1]}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Row>
                  <Row >
                    <Col>
                      <Button color="primary" onClick={onEditBook}>
                        Save changes
                      </Button>
                    </Col>
                    <Col>
                      <Button color="danger" onClick={onDeleteBook}>
                        Delete book
                      </Button>
                    </Col>
                    <Col>
                      <Button color="primary" onClick={(e) => (history(`/Main/books/`))}>
                        Return
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>);
};

export default BookProfile;