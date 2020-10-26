import Axios from 'axios';
import React,{useState,useEffect,useContext} from 'react';
import {Card,Container,Button,Row,Col,Form,FormGroup,Input,Label,CardHeader,CardBody,Alert} from 'reactstrap';
import HomeNav from './HomeNav';
import {
    useParams,
    Link
  } from "react-router-dom";
import {UserContext} from '../context/UserContext';


const EditUser = () =>{
    let { id } = useParams();
    const {getSpecificUser,specificUser,editUser,err} = useContext(UserContext);
    let [data,setData] = useState({name:'',email:specificUser.email,password:'',retype_password:''});

    
    useEffect(()=>{
        console.log(id);
        console.log(specificUser.name ? specificUser.name : ' ')
        getSpecificUser(id)
    },[]);
    
    useEffect(()=>{
        setData({...specificUser})
    },[specificUser])
    
    useEffect(()=>{
        console.log(err)
    },[err]);
    return(
        <>
            <HomeNav/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                    <Card className="mt-5">
                        <CardHeader className="text-center">Edit User</CardHeader>
                        <CardBody>
                            <Form onSubmit={editUser(data)}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input value={data.name || ''}  onChange={(e)=> setData({...data,name:e.target.value})}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input value={data.email || ''} onChange={(e)=> setData({...data,email:e.target.value})} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>New Password</Label>
                                        <Input type="password" placeholder="Enter New Password" onChange={(e)=> setData({...data,password:e.target.value})}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>Retype Password</Label>
                                        <Input type="password"  placeholder="Retype New Password"  onChange={(e)=> setData({...data,retype_password:e.target.value})} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                     {err.invalid ? (<Alert color="danger" className="mt-2 text-center"><small className="text-center">{err.invalid}</small></Alert>) : ''}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Link to="/home">
                                        <Button className="btn btn-block">Back</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Button type="submit" className="btn btn-block" color="info">Edit</Button>
                                </Col>
                            </Row>
                            </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default EditUser;