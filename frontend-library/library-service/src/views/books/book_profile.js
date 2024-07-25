import { Container } from "reactstrap";
import { useNavigate, useParams, useLocation  } from 'react-router-dom';
import { useState, useEffect } from "react";
import { URLS } from "../../url";
import axios from "axios";

const BookProfile = () => {
    const location = useLocation();
    const [genres, setGenres] = useState([]);
    const [Authors, setAuthors] = useState([]);
    const book_title = location.state.stringValue;

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

    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
            </div>
            <Container fluid className="mt--7">

            </Container>
        </>);
};

export default BookProfile;