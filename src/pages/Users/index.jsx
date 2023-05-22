import React, {useState} from "react";
import { useUsers } from "../../hooks/useUsers";
import Layout from "../../layouts/index";
import Card from '../../components/card'
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/model";
import { toast } from "react-hot-toast";


const UsersPage = () => {
  const navigate = useNavigate();
  const { users, loading, removeUser } = useUsers();

  const [showDelete,setShowDelete]= useState(false)
  const[selectedUser,setSelectedUser]=useState({})
  const[showEdit,setShowEdit]=useState(false)
  
  const handleDelete = async (user) => {
    await removeUser(user._id);
    setSelectedUser({});
    setShowDelete(false);
    toast.success("User deleted successfully");
  };

  const handleEdit= async (user)=>{

    navigate(`/users/${user._id}/edit`);
    setSelectedUser({});
    setShowDelete(false);
  }

  return (
    <Layout>
      <Modal open= {showDelete} className="w-[400px]">
        <div className="text-2xl">
          <p>Do you really want to delete?</p>
          <small className="text-sm">You are about to delete a user with {selectedUser?.name} and of age {selectedUser?.age}.</small>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={()=>handleDelete(selectedUser)}text='Yes' />
          <Button onClick={()=>setShowDelete(false)} text='Cancel'/>
        </div>
      </Modal>

      <Modal open= {showEdit} className="w-[400px]">
        <div className="text-2xl">
          <p>Do you really want to Edit?</p>
          <small className="text-sm">You are about to edit a user with {selectedUser?.name} and of age {selectedUser?.age}.</small>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={()=>handleEdit(selectedUser)}text='Yes' />
          <Button onClick={()=>setShowEdit(false)} text='Cancel'/>
        </div>
      </Modal>

      <Card>

      <div className="flex w-full justify-between items-c enter">
        <h1 className="text-2xl text-primary">Users</h1>
        <Link to="/users/create">
          <Button text={"Create user"} />
        </Link>
      </div>
      <div>
        <table className="table-auto border-collapse border border-slate-500 text-center ">
          <tbody>
            <tr>
              <th className="border border-slate-600 px-3 py-2 ">Name</th>
              <th className="border border-slate-600 px-3 py-2">Email</th>
              <th className="border border-slate-600 px-3 py-2">Address</th>
              <th className="border border-slate-600 px-3 py-2">Age</th>
              <th className="border border-slate-600 px-3 py-2">Actions</th>
            </tr>
            {users.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <p>{loading ? "Loading users" : "No users Found"}</p>
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-slate-600 ">{user.name}</td>
                <td className="border border-slate-600 ">{user.email}</td>
                <td className="border border-slate-600 ">{user.address}</td>
                <td className="border border-slate-600 ">{user.age}</td>
                <td className="border border-slate-600 flex px-4 gap-3 ">
                  {[
                    {
                      label: "Edit",
                      onClick: () => {
                        setShowEdit(true);
                        setSelectedUser(user);
                      },
                    },
                    {
                      label: "View",
                      onClick: () => {
                        navigate(`/users/${user._id}`);
                      },
                    },
                    {
                      label: "Delete",
                      onClick: (e) => {
                        setShowDelete(true)
                        setSelectedUser(user)
                      },
                    },
                  ].map((action) => (
                    <Button
                    key={action.label}
                    text={action.label}
                    onClick={action.onClick}
                    />
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Card>
    </Layout>
  );
};

export default UsersPage;
