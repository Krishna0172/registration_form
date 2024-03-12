import React from 'react'
import axios from 'axios';
import { Form, Button} from 'semantic-ui-react';
import { useState ,useEffect} from 'react';
import { useNavigate, useParams } from'react-router-dom';
const Update = () => {
    const {id}  = useParams();
    const [user,setUsers] = useState({
        id:'',
        name:'',
        age:'',
        dep:''
    });
    const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3300/users/${id}`);
        setUsers(response.data);
        navigate(`/Update/${id}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    try{
        const UpdatedUser = {...user,id:parseInt(id)};
        await axios.put(`http://localhost:3300/users/${id}`,UpdatedUser);
        console.log('Data updated successfully:', UpdatedUser);
        window.alert('Data updated successfully!');
        navigate('/');
    }
    catch(error){
        console.error('Error updating data:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
    return (
        <div>
          <h1>Update Form</h1>
          <Form  className="create-form">
            <Form.Field>
            <label>ID</label>
              <input type="text" name="id" value={user.id} readOnly placeholder={user.id}/>
            </Form.Field>
            <Form.Field>
              <label>NAME</label>
              <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
            </Form.Field>
            <Form.Field>
              <label>AGE</label>
              <input
            type="text"
            name="age"
            value={user.age}
            onChange={handleChange}
            placeholder="Enter Age"
          />
            </Form.Field>
            <Form.Field>
              <label>DEP</label>
              <input
            type="text"
            name="dep"
            value={user.dep}
            onChange={handleChange}
            placeholder="Enter Department"
          />
            </Form.Field>
            <Button type="button" onClick={handleUpdate}>Update</Button>
          </Form>
        </div>
      );
}

export default Update
