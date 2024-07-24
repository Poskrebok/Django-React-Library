import {
  Card, CardHeader, Table, Container, Row,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const ReadersList = () => {
  const [readers, setReaders] = useState([]);

  const history = useNavigate();

  const handleRowClick = (readerId) => {
    history(`/Main/readers/${readerId}`);
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
                  <h3 className="mb-0">Readers</h3>
  
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name </th>
                      <th scope="col">Adress </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*                     {courses.map((course) => (
                        <tr key={course.id} onClick={() => handleRowClick(course.id)} style={{ cursor: 'pointer' }}>
                          <th scope="col">{course.name}</th>
                          <th scope="col" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.description}</th>
                          <th scope="col">{course.pass_rate}</th>
                        </tr>
                      ))} */}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>);
  };
  
  export default ReadersList;