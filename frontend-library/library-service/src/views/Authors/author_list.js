import {
  Card, CardHeader, Table, Container, Row, Col, Button,
  Input
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { URLS } from '../../url';
import {
  Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"

const AuthorList = () => {
  const [authors, setAuthor] = useState([]);
  const [authorName, setAuthorName] = useState();

  const [modal, setModal] = useState(false);
  const toggleCreateAuthor = () => setModal(!modal);


  const history = useNavigate();

  const handleRowClick = (Id, stringValue) => {
    history(`/Main/authors/${Id}`, {
      state: { stringValue: stringValue }
    })
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URLS.AUTHORMANAGER).then(response => {
        console.log('Updating user', response);
        setAuthor(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error('Error updating user', err);
      }) // Adjust limit as needed
    };
    fetchData();
  }, []);

  const handleAuthorCreate = async (author_name) => {
    if (!author_name)
      return;
    try {
      console.log(author_name)
      await axios.put(URLS.AUTHORMANAGER, { author_name });
    } catch (err) {

    }
  }

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <Row>
                <Col lg="10">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Authors</h3>
                  </CardHeader>
                </Col>
                <Col >
                  <CardHeader className="border-0">
                    <Button color="primary" onClick={toggleCreateAuthor}>Add author</Button>
                    <Modal isOpen={modal} toggle={toggleCreateAuthor}>
                      <ModalHeader toggle={toggleCreateAuthor}>Enter Author Name</ModalHeader>
                      <ModalBody>
                        <Input
                          className="form-control-alternative"
                          id="input-author-name"
                          placeholder="Enter author name"
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="Save" onClick={() => {
                          handleAuthorCreate(authorName);
                          toggleCreateAuthor();
                        }}>Save</Button>{' '}
                        <Button color="Cancel" onClick={toggleCreateAuthor}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </CardHeader>
                </Col>
              </Row>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Author name</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((author) => (
                    <tr key={author.id} onClick={() => handleRowClick(author[0], author[1])} style={{ cursor: 'pointer' }}>
                      <th scope="col">{author[1]}</th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container >
    </>);
};

export default AuthorList;