import { useEffect, useState } from "react"
import { getUsers, postUser, updateUser ,deleteUser} from "../api/users"

export const useUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(usersResponse => setUsers(usersResponse))
  }, [])

  const useFetchUsers = async () => {
    const userResponse = await getUsers()
    setUsers(userResponse)
  }

  const postNewUser = async (name, age) => {
    const newUser = { name, age }
    const addedUser = await postUser(newUser)
    setUsers([...users, addedUser])
  }

  const editUser = async (_id, name, age) => {
    const updatedUser = await updateUser({ _id, name, age })
    setUsers(prevUsers =>
      prevUsers.map(user => (user._id === updatedUser._id ? updatedUser : user))
    )
  }
  const removeUser = async (_id) => {
    await deleteUser({ _id })
    setUsers(prevUsers => prevUsers.filter(user => user._id !== _id))
  }

  return {
    users,
    useFetchUsers,
    postNewUser,
    editUser,
    removeUser
  }
}