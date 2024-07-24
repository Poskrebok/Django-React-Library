import {
  Card, CardHeader, Table, Container, Row,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const BookList = () => {
  const [books, setBooks] = useState([]);

  const history = useNavigate();

  const handleRowClick = (courseId) => {
    history(`/Main/books/${courseId}`);
  };

  
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
                        <th scope="col">{book.name}</th>
                        <th scope="col" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.author}</th>
                        <th scope="col">{book.inStock}</th>
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