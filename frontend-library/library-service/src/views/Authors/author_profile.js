import { Container } from "reactstrap";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { URLS } from "../../url";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Card, Col } from 'reactstrap';

/* { authorName, onEditAuthor, onDeleteAuthor } */
const AuthorProfile = () => {
    const location = useLocation();
    const authorName = location.state.stringValue;
    const history = useNavigate();
    const params = useParams();
    const [modal, setModal] = useState(false);
    const [newAuthorName, setAuthorName] = useState(authorName);

    const onEditAuthor = async () => {
        try{
            const id = params.authorid;
            axios.post(URLS.AUTHORMANAGER,{id,newAuthorName});
        } catch(err) {

        }
    }

    const onDeleteAuthor = async () => {
        try{
            const id = params.authorid
            axios.delete(URLS.AUTHORMANAGER,{id});
        } catch(err){

        }
    }

    const toggle = () => setModal(!modal);

    const handleSave = () => {
        onEditAuthor(newAuthorName)
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