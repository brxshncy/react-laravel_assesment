import React,{useState,useContext,useEffect} from 'react';
import {Container,Row,Col,Card,Form,Input,Button,CardBody,CardHeader,FormGroup,Label,Alert} from 'reactstrap'
import HomeNav from './HomeNav';
import {UserContext} from '../context/UserContext';


const AddUser = () => {

    const {addUser,err} = useContext(UserContext);
    const {name,email,password} = err.err; 
    const [data,setData] = useState({name:'',email:'',password:'',retype_password:''});
     
    useEffect(()=>{
        console.log(err.err)
    },[])
    return(
        <div>
            <HomeNav/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                    <Card className="mt-5">
                    <CardHeader className="text-center">Add User</CardHeader>
                            <CardBody>
                            <Form onSubmit={addUser(data)}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input type="text" onChange={(e)=> setData({...data,name:e.target.value})} placeholder="Enter Name"/>
                                            {name ? (<Alert color="danger" className="p-1 mt-2 text-center"><small className="text-danger">{name.toString()}</small></Alert>) : ''}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input type="text" onChange={(e)=> setData({...data,email:e.target.value})} placeholder="Enter Email"/>
                                            {email ? (<Alert color="danger" className="p-1 mt-2 text-center"><small className="text-danger">{email.toString()}</small></Alert>) : ''}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input type="password" onChange={(e)=> setData({...data,password:e.target.value})} placeholder="Enter Password"/>
                                            
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label>Retype Password</Label>
                                            <Input type="password" onChange={(e)=> setData({...data,retype_password:e.target.value})} placeholder="Enter Retype Password"/>
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
                                         {err.invalid ? (<Alert color="danger" className="text-center mt-1"><small>{err.invalid}</small></Alert>) : ''}
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col>
                                        <Button color="primary" className="btn btn-block">Add User</Button>
                                    </Col>
                                </Row>
                            </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddUser;