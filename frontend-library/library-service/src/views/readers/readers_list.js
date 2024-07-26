import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
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


const ReadersList = () => {
  const [readers, setReaders] = useState([]);
  const [newReader, setNewReader] = useState({
    reader_name: '',
    adress: ''
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const history = useNavigate();

  const handleRowClick = (readerId, readerName, readerAdress) => {
    history(`/Main/readers/${readerId}`, {
      state: {
        reader_name: readerName,
        adress: readerAdress
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReader({
      ...newReader,
      [name]: value
    });
  };

  const handleReaderCreate = async (e) => {
    console.log(newReader);
    await axios.put(URLS.READERMANAGER, newReader).then(response => {
      console.log('Success', response);
    }).catch(err => {
      console.error('Error', err);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(URLS.READERMANAGER).then(response => {
        console.log('Readers', response);
        setReaders(response.data);
        console.log(response.data)
      }).catch(err => {
        console.error('Error', err);
      })
    }
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
                <Row>
                  <Col lg="10">
                    <h3 className="mb-0">Readers</h3>
                  </Col>
                  <Col>
                    <Button color="primary" onClick={toggle}>Add reader</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Enter Reader Name</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Input
                            className="form-control"
                            id="reader_name"
                            name="reader_name"
                            placeholder="Enter Reader Name"
                            type="text"
                            value={newReader.reader_name}
                            onChange={handleChange}
                            required
                          />
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="Save" onClick={() => {
                          handleReaderCreate();
                          toggle();
                        }}>Save</Button>{' '}
                        <Button color="Cancel" onClick={toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name </th>
                    <th scope="col">Adress </th>
                  </tr>
                </thead>
                <tbody>
                  {readers.map((reader) => (
                    <tr key={reader.id} onClick={() => handleRowClick(reader[0], reader[1], reader[2])} style={{ cursor: 'pointer' }}>
                      <th scope="col">{reader[1]}</th>
                      <th scope="col">{reader[2]}</th>
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

export default ReadersList;