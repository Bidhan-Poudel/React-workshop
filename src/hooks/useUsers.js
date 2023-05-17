import { useEffect, useState } from "react"
import { getUsers, postUser, updateUser ,deleteUser,getUserDetail} from "../api/users"

export const useUsers = () => {
  const[loading, setLoading]= useState(false);
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true);
    getUsers().then(usersResponse => setUsers(usersResponse))
    setLoading(false);
  }, [])

  const fetchUsers = async () => {
    setLoading(true);
    const userResponse = await getUsers()
    setUsers(userResponse)
    setLoading(false);
  }

  const getUserById= async(id)=>{
    setLoading(true)
    const userResponse= await getUserDetail({_id:id})
    setLoading(false);
    return userResponse;
  }

  const postNewUser = async (name, age) => {
    setLoading(true);
    const newUser = { name, age }
    const addedUser = await postUser(newUser)
    setUsers([...users, addedUser])
    setLoading(false);
  }

  const editUser = async (_id, name, age) => {
    const updatedUser = await updateUser({ _id, name, age })
    setUsers(prevUsers =>
      prevUsers.map(user => (user._id === updatedUser._id ? updatedUser : user))
    )
  }
  const removeUser = async (_id) => {
    await deleteUser({ _id })
    setUsers(prevUsers => 
      prevUsers.filter(user => user._id !== _id)
      )
  }

  return {
    users,
    fetchUsers,
    getUserById,
    postNewUser,
    editUser,
    removeUser,
    loading
  }
}