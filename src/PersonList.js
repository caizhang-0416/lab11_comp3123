import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

class PersonList extends Component {
    // Define state default values
    state = {
        persons: []
    }

    // Component lifecycle callback
    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                console.log(res.data);
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }

    render() {
        return (
            <Container className="my-5">
                <h2 className="text-center mb-4">User List</h2>
                <Row>
                    {this.state.persons.map(person => (
                        <Col md={4} key={person.login.uuid} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={person.picture.large} />
                                <Card.Body>
                                    <Card.Title>{person.name.first} {person.name.last}</Card.Title>
                                    <Card.Text>
                                        <strong>Username:</strong> {person.login.username}<br />
                                        <strong>Gender:</strong> {person.gender.toUpperCase()}<br />
                                        <strong>Time Zone:</strong> {person.location.timezone.description}<br />
                                        <strong>Address:</strong> {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}<br />
                                        <strong>Email:</strong> {person.email}<br />
                                        <strong>Birth Date:</strong> {person.dob.date} ({person.dob.age})<br />
                                        <strong>Register Date:</strong> {person.registered.date}<br />
                                        <strong>Phone#:</strong> {person.phone}<br />
                                        <strong>Cell#:</strong> {person.cell}
                                    </Card.Text>
                                    <Button variant="primary">View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default PersonList;
