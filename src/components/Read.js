import React, { useState, useEffect } from 'react';
import { useNavigate } from'react-router-dom';
import axios from 'axios';
const Read = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3300/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const handleDelete = async (id) => {
    try{
        await axios.delete(`http://localhost:3300/users/${id}`);
        console.log('Data deleted successfully:', id);
        window.alert('Data deleted successfully!');
        fetchData();
    }
    catch(error){
        console.error('Error deleting data:', error);
    }
  }
  return (
    <div className='data-container'>
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.dep}</td>
              <td><button  className='update-button'  onClick={()=> handleUpdate(user.id)}>Update </button></td>
              <td><button className='update-button' onClick={()=>handleDelete(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
