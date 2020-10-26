import React,{useContext,useState,useEffect} from 'react';
import {
    Card, CardBody, CardHeader,Button, Form, FormGroup, Label, Input,Container, Row, Col,Alert
} from 'reactstrap';
import {AuthContext} from '../context/AuthContext';


const Login = () => {
    const {login,err} = useContext(AuthContext);
    const {email, password} = err.err
    const [data,setData] = useState({email:'',password:''});

    useEffect(()=>{
    },[err]);
    return(
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md="8">
                    <Card>
                        <CardHeader className="text-center">Login</CardHeader>
                        <Form onSubmit={login(data)}>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for="exampleEmail">Email</Label>
                                            <Input type="text" value={data.email} onChange={(e) => setData({...data,email:e.target.value})} placeholder="Enter Email" />
                                            {email ? (<Alert color="danger " className="text-center mt-2 p-1"><small className="text-danger"> {email.toString()} </small></Alert>) : ''}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input type="password" value={data.password} onChange={(e) => setData({...data,password:e.target.value})} placeholder="Enter Password"/>
                                            {password ? (<Alert color="danger" className="text-center mt-2 p-1"><small className="text-danger"> {password.toString()} </small></Alert>) : ''}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {err.invalid ? (<Alert className="text-center" color="danger"><small className="text-danger"> {err.invalid.message} </small></Alert>) : ''}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col md="6" className="text-right">
                                        <Button type="submit" className="btn btn-block" color="primary">Login</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;