import { FormEvent, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";


const Login = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    interface loginDTO {
        username: string,
        password: string
    }

    const handleJWT = (token :string) => {

        localStorage.setItem("JWT", token)

    }


    const handleLogin = (e: FormEvent) => {
        e.preventDefault();

        const loginData: loginDTO = {
            username: username,
            password: password
        }

        fetch("http://localhost:3001/auth/login", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta');
                }
                return response.json();
            })
            .then(data => {
                handleJWT(data);
            })
            .catch(error => {
                console.error('Errore:', error);
            });

    }


    return (
        <Container fluid>
            <Row className="justify-center">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>LOGIN</Card.Title>
                            <hr />
                            <Card.Text>
                                <Form onSubmit={(e) => handleLogin(e)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="string" placeholder="Enter email" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <p>{username}</p>

        </Container>
    );
}

export default Login;