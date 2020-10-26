import React,{useEffect,useContext} from 'react';
import { Table } from 'reactstrap';
import {UserContext} from '../context/UserContext';
import UserLists from './UserLists';


const Users = () =>{
    const {users} = useContext(UserContext);

    useEffect(()=>{

    },[users])
    useEffect(()=>{
        console.log(users)
    },[])    
    return(
        <Table striped bordered className="mt-2">
            <thead>
            <tr className="text-center">
                <th>#</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody className="text-center">
                {users.length > 0 ? users.map((user,i) =>{
                    return(
                        <UserLists key={user.id} user={user}/>
                    )
                }): <tr><td colSpan="4">No User added.</td></tr>}
            </tbody>
      </Table>
    )
}

export default Users;