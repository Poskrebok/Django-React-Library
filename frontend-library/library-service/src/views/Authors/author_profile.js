import { Container } from "reactstrap";
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { URLS } from "../../url";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Card, Col } from 'reactstrap';

/* Функция, реализующая функции по редактированию автора и его удалению, 
а также отрисовку окна профиля  */
const AuthorProfile = () => {
    const location = useLocation();
    const authorName = location.state.stringValue;
    const history = useNavigate();
    const params = useParams();
    const [modal, setModal] = useState(false);
    const [newAuthorName, setAuthorName] = useState(authorName);

    /* Функция, реализующая обработку изменений автора и отправку этих изменений на сервер. */
    const onEditAuthor = async () => {
        const author_id = params.authorid;
        const author_name = newAuthorName;
        axios.post(URLS.AUTHORMANAGER, { author_id, author_name }).then(response => {
            console.log('Updating user',response);
            history(`/Main/authors/`);
        }).catch(err => {
            console.error('Error updating user',err);
        })
    }

    /* Функция, реализующая удаление автора. */
    const onDeleteAuthor = async () => {
        const author_id = params.authorid;
        axios.delete(URLS.AUTHORMANAGER, { data: { author_id: author_id } }).then(response => {
            console.log('User deleted',response);
            history(`/Main/authors/`);
        }).catch(err => {
            console.error('Error deliting user',err);
        })
    }

    /* Необходимое зло для работы всплывающих окон. */
    const toggle = () => setModal(!modal);

    /* Функция, вызываемая из формы, сохраняет изменения 
    в авторе и выкидывет нас на предыдущую страницу */
    const handleSave = () => {
        onEditAuthor(newAuthorName);
        toggle();
    };

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            </div>
            <Container fluid className="mt--7">
                <Row className="justify-content-center">
                    <Card className="shadow">
                        <Col>
                            <p>Author Name: {newAuthorName}</p>
                            <Button color="primary" onClick={toggle}>Edit</Button>
                            <Button color="danger" onClick={onDeleteAuthor}>Delete</Button>

                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Edit Author Name</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="newAuthorName">New Author Name</Label>
                                            <Input
                                                type="text"
                                                id="newAuthorName"
                                                value={newAuthorName}
                                                onChange={(e) => setAuthorName(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleSave}>Save</Button>{' '}
                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Card>
                </Row>
            </Container>

        </>
    );
};

export default AuthorProfile;