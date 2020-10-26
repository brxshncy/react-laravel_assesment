import React,{useEffect,useContext} from 'react';
import {Button} from 'reactstrap';
import {UserContext} from '../context/UserContext';
import {Link} from 'react-router-dom';

const UserLists = (user) =>{

    const {id,name,email,password} = user.user;
    const {deleteUser} = useContext(UserContext);
    
    useEffect(()=>{
       // console.log(user)
    },[])
    return(
        <>
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                 <Link to={`/update/user/${id}`}>
                    <Button color="info" className="mr-2">Edit</Button>
                </Link>

                <Button onClick={()=>deleteUser(id)} color="danger">Delete</Button>
            </td>
        </tr>
        </>
    )
}

export default UserLists;