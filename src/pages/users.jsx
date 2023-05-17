import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import Layout from '../layouts';

const Users = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const { postNewUser, editUser, removeUser, users } = useUsers();
  const [editingUserId, setEditingUserId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingUserId) {
      await editUser(editingUserId, name, age);
    } else {
      await postNewUser(name, age);
    }

    setName('');
    setAge('');
    setEditingUserId(null);
  };

  const handleDelete = async (_id) => {
    await removeUser(_id);
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setName(user.name);
    setAge(user.age);
  };

  return (
    <Layout>
      <h1>{editingUserId ? 'Update User Data' : 'Add User Data'}</h1>
      <div className='text-purple-700 my-10'>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type='text'
              value={name}
              className='block border border-black'
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              type='text'
              value={age}
              className='block border border-black'
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <button
            type='submit'
            className='bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mx-5 my-4'
          >
            {editingUserId ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>
      <div>
        
        <h2>List form backend are:</h2>

        <table className='border-solid border-collapse border-2 border-black text-center text-purple-700'>
          <thead>
            <tr>
            <th className='border-solid border-collapse border-2 border-black px-2 py-2'>Name</th>
            <th className='border-solid border-collapse border-2 border-black px-2 py-2'>Age</th>
            <th className='border-solid border-collapse border-2 border-black px-2 py-2'>Edit</th>
            <th className='border-solid border-collapse border-2 border-black px-2 py-2'>Delete</th>
            </tr>
          </thead>
          
          <tbody style={{border:"2px solid black"}}>
          {users.map((user) => (
              <tr  key={user._id}>
              <td className='border-solid border-collapse border-2 border-black px-2 py-2'>{user.name}</td>
              <td className='border-solid border-collapse border-2 border-black px-2 py-2'>{user.age}</td>
              <td className='border-solid border-collapse border-2 border-black px-2 py-2'><button onClick={() => handleEdit(user)}className='mx-3'>Edit</button></td>
              <td className='border-solid border-collapse border-2 border-black px-2 py-2'><button onClick={() => handleDelete(user._id)}className='mx-3'>Delete</button></td>
              </tr>
          ))}
          </tbody>
          </table>
      </div>
    </Layout>
  );
};

export default Users;
