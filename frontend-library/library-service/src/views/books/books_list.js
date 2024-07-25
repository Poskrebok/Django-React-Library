import {
  Card, CardHeader, Table, Container, Row,
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
  };  

  const getAuthor = (authorId) => {

  }

  const getGenre = (genreId) => {

  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(URLS.BOOKMANAGMENR).then(response => {
        console.log('Updating user', response);
        setBooks(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error('Error updating user', err);
      }) 
      await axios.get(URLS.BOOKMANAGMENR).then(response => {
        console.log('Updating user', response);
        setBooks(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error('Error updating user', err);
      }) 
      await axios.get(URLS.BOOKMANAGMENR).then(response => {
        console.log('Updating user', response);
        setBooks(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error('Error updating user', err);
      }) 
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      </div>
      <Container fluid className="mt--7">
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Library</h3>

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
                        <th scope="col">{book.author}</th>
                        <th scope="col">{book.author}</th>
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