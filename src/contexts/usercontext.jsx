import { createContext, useContext, useEffect, useState } from "react"
import { loginUserApi,postRegisterUserApi } from "../api/users"


export const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        name: "",
        address: ""
    })
    const [users, setUsers] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        init()
    }, [])

    const init = () => {
        console.log("Initialize User Provider")
        // restoring user from local storage
        try{
            const userListString = window.localStorage.getItem("users")
            const userString = localStorage.getItem("currentUser")

            if(!!userListString){
                const userArray = JSON.parse(userListString)
                console.log(userArray)
                setUsers(userArray)
            }

            if(!!userString) {
                const userObject = JSON.parse(userString)
                setUser(userObject)
                setIsLoggedIn(true)
            }
        }catch(e){
            console.log(e)
        }
    }

    const loginUser = async({
        email,
        password
    }) => {
        if (!password | !email) {
            return {
                error: "All fields are required"
            }
        }
        
        try{
            const userResponse= await loginUserApi({email,password})
            console.log("Userdata from backend",userResponse)
            localStorage.setItem("currentUser",JSON.stringify({email}))
            localStorage.setItem("accessToken",userResponse.data.accessToken)
            setUser({email})
            setIsLoggedIn(true)
            return{
                success:true
            }
        }
        catch(e){
            return{
                error:e?.response?.data?.message??"Somethings went wrong"
            }
        }

        // const filteredUsers = users.filter(each=>each.email === email && each.password === password)

        // if (filteredUsers.length === 0) {
        //     return {
        //         error: "User doesnot exist"
        //     }
        // }

        
        // const loggedInUser = users.find(each => each.email === email && each.password === password)
        // localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
        // setUser(loggedInUser)
        // setIsLoggedIn(true)

        // return {
        //     success: true
        // }
    }

    const registerUser = async (
        {name,password,email,address}
    ) => {
        try{

            const addedUser = await postRegisterUserApi({email,password,name,address})
            return addedUser


            
        }
        catch(e){
            console.log(e?.response?.data?.message);
            return{
                error:e?.response?.data?.message??"Something went wrong"
            }
        }
        // console.log("Userdata from backend", userResponse);



        // if (!password | !email | !address | !name) {
        //     response.error = "All fields are required"
        //     return response
        // }
        // // "bidhan " => "bidhan" => [ "bidhan"]
        // if (name.trim().split(" ").length < 2) {
        //     response.error = "Name with surname is required"
        //     response.field = "name"
        //     return response
        // }

        // if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        //     response.error = "Valid email is required"
        //     response.field = "email"
        //     return response
        // }

        // if (users.filter(usr => usr.email === email).length > 0) {
        //     response.error = "User with the email already exists"
        //     response.field = "email"
        //     return response
        
        // }


        
        //     const userArrayAsString = JSON.stringify(updatedUserArray) //for converting object Array to string
        //     window.localStorage.setItem("users", userArrayAsString) // store to local storage 
        //     return updatedUserArray
        // })
        // response.success = true
        // return response
    }

    return <UserContext.Provider value={{
        user,
        users,
        setUser,
        init,
        isLoggedIn,
        registerUser,
        loginUser
    }} >
        {children}
    </UserContext.Provider>
}