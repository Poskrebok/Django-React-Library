import {
    Container,
} from "reactstrap";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { URLS } from "../url";
import axios from "axios";

const Main = () => {
    const [Authors, setAuthors] = useState([]);
    const [Books, setBooks] = useState([]);
    const [event, setEvent] = useState({
        book_id: '',
        reader_id: '',
        transaction_expected_return: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value
        });
    };
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(URLS.READERMANAGER).then(response => {
                console.log('Reciving readers', response);
                setAuthors(response.data);
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            });
            await axios.get(URLS.BOOKMANAGMENR).then(response => {
                console.log('Reciving books', response);
                setBooks(response.data)
                console.log(response.data)
            }).catch(err => {
                console.error('Error', err);
            });
        };
        fetchData();
    }, []);

    return (
        <>
            <Container fluid className="mt--7">
                
            </Container>
        </>);
};

export default Main;