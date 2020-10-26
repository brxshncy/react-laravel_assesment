import React,{useContext,useEffect,useState} from 'react';
import {Container,Row,Col,Card,Form,Input,Button,CardBody,CardHeader,FormGroup,Label,Alert} from 'reactstrap'
import {AuthContext} from '../context/AuthContext';


const Signup = () => {
    const [data,setData] = useState({name:'',email:'',password:'',retype_password:''});
    const {signup,err} = useContext(AuthContext);
    const {name,email,password} = err.err; 

    useEffect(()=>{
        console.log(err);
    },[err])
    return(
        <Container className="mt-5">
        <Row className="justify-content-center">
            <Col md="8">
                <Card>
                    <CardHeader className="text-center">Signup</CardHeader>
                    <Form onSubmit={signup(data)}>
                        <CardBody>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Name</Label>
                                        <Input type="text" value={data.name} onChange={(e) => setData({...data,name:e.target.value})}  placeholder="Enter Name" />
                                        {name ? (<Alert color="danger" className="p-1 mt-2 text-center"><small className="text-danger">{name.toString()}</small></Alert>) : ''}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type="text" value={data.email} onChange={(e) => setData({...data,email:e.target.value})}  placeholder="Enter Email"/>
                                        {email ? (<Alert color="danger" className="p-1 mt-2 text-center"><small className="text-danger">{email.toString()}</small></Alert>) : ''}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type="password" value={data.password} onChange={(e) => setData({...data,password:e.target.value})} placeholder="Enter Password"/>
                                       
                                    </FormGroup>
                                </Col>
                                <Col>
                                     <FormGroup>
                                        <Label>Retype Password</Label>
                                        <Input type="password" value={data.retype_password} onChange={(e) => setData({...data,retype_password:e.target.value})} placeholder="Retype Password"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                {password ? (<Alert color="danger" className="p-1 mt-2 text-center"><small className="text-danger">{password.toString()}</small></Alert>) : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {err.invalid ? (<Alert color="danger" className="text-center mt-1"><small>{err.invalid.message}</small></Alert>) : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col md="6" className="text-right">
                                    <Button type="submit" className="btn btn-block" color="primary">Signup</Button>
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

export default Signup;