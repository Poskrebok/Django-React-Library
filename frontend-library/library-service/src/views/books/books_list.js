import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter
} from 'reactstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { URLS } from "../../url";
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [Authors, setAuthors] = useState([]);

  const history = useNavigate();

  const handleRowClick = (courseId, stringValue) => {
    history(`/Main/books/${courseId}`, {
      state: { stringValue: stringValue }
    })
  };/*  */

  const getAuthor = (authorId) => {
    const foundAuthor = Authors.find((author) => author[0] === authorId);
    if (foundAuthor) {
      return foundAuthor[1];
    }
  }

  const getGenre = (genreId) => {
    const foundGenre = genres.find((genre) => genre[0] === genreId);
    if (foundGenre) {
      return foundGenre[1];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
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

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [newBook, setNewBook] = useState({
    book_title: '',
    genre_id: '',
    author_id: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };


  const handleBookCreate = async () => {
    console.log(newBook);
    await axios.put(URLS.BOOKMANAGMENR, newBook ).then(response => {
      console.log('Succes', response);
    }).catch(err => {
      console.error('Error', err);
    })
  }
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      </div>
      <Container fluid className="mt--7">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Col>
                  <h3 className="mb-0">Library</h3>
                </Col>
                <Col >
                  <CardHeader className="border-0">
                    <Button color="primary" onClick={toggle}>Add book</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Enter book title</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Input
                            className="form-control"
                            id="book_title"
                            name="book_title"
                            placeholder="Enter book title"
                            type="text"
                            value={newBook.book_title}
                            onChange={handleChange}
                            required
                          />
                        </Row>
                        <Row>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              color="dark"
                            >
                              {getGenre(newBook.genre_id)}
                            </DropdownToggle>
                            <DropdownMenu >
                              {genres.map((genre) => (
                                <DropdownItem key={genre[0]} onClick={() => handleChange({ target: { name: 'genre_id', value: genre[0] } })}>
                                  {genre[1]}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              caret
                              color="dark"
                            >
                              {getAuthor(newBook.author_id)}
                            </DropdownToggle>
                            <DropdownMenu >
                              {Authors.map((author) => (
                                <DropdownItem key={author[0]} onClick={() => handleChange({ target: { name: 'author_id', value: author[0] } })}>
                                  {author[1]}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="Save" onClick={() => {
                          handleBookCreate();
                          toggle();
                        }}>Save</Button>{' '}
                        <Button color="Cancel" onClick={toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </CardHeader>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Book name</th>
                    <th scope="col">Book author</th>
                    <th scope="col">Genre</th>
                    <th scope="col">in stock</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id} onClick={() => handleRowClick(book.id)} style={{ cursor: 'pointer' }}>
                      <th scope="col">{book[1]}</th>
                      <th scope="col">{getAuthor(book[2])}</th>
                      <th scope="col">{getGenre(book[3])}</th>
                      <th scope="col">{book[4] ? "В наличии" : "Отсутствует"}</th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>);
};

export default BookList;