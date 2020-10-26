import React,{useContext,useEffect,useState} from 'react';
import HomeNav from './HomeNav';
import {Container,Row,Col,Card,Form,Input,Button,CardBody,CardHeader,FormGroup,Label,Alert} from 'reactstrap'
import Users from './Users';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserContext';


const Home = () => {
    const {alertMessage} = useContext(UserContext);
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    useEffect(()=>{
      //  console.log(alertMessage.type);
    },[alertMessage])

    useEffect(()=>{
      
    },[])
    return(
        <div>
            <HomeNav/>
               
            <Container className="mt-5">
            {alertMessage.type === 'delete' && (
                    <Row className="justify-content-center">
                        <Col>
                        <Alert color="danger text-center" isOpen={visible} toggle={onDismiss}>{alertMessage.message}</Alert>
                        </Col>
                    </Row>
                ) 
                
            }
            {alertMessage.type === 'update' && (
                    <Row className="justify-content-center">
                        <Col>
                        <Alert color="info text-center" isOpen={visible} toggle={onDismiss}>{alertMessage.message}</Alert>
                        </Col>
                    </Row>
                ) 
            }
    
                <Card className="mb-5">
                    <CardHeader className="text-center">User List</CardHeader>
                    <CardBody>
                        <Row>
                            <Col></Col>
                            <Col md="3">
                                <Link to="/create/user">
                                <Button color="primary" className="btn btn-block">Add User</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row className="p-3">
                            <Users/>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default Home;