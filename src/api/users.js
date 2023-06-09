import axiosInstance from "./axiosInstance"

// callback hell  ===> asynchronous call inside the normal function
// const getUsers = () => {
//     let data = []  // data = []
//     const promise = axiosInstance.get("/api/users") // promise<pending>
//     promise.then((axiosResponse)=>{
//         console.log(axiosResponse)
//         data = axiosResponse.data
//         return data
//     }) // 4 sec
//     .catch((error)=>{
//         console.log(error)
//     })

//     return promise /// 0.2 ms
// }

// completely asynchronos which returns promise as a whole

export const loginUserApi=async({
    email,
    password
})=>{
    const result= await axiosInstance.post("/login",{
        email,
        password
    })
    return result.data
}

export const postRegisterUserApi= async({
    email,
    password,
    name,
    address
})=>{
    const result= await axiosInstance.post("/register",{email,password,name,address})
    return result.data
}


export const getUsers = async () => {
    //start
    const result = await axiosInstance.get("/users")  // fulfilled, rejected
    //stop
    return result.data 
}

// alternate way
// export const getUsersThroughCallback = ()=>{
//     return axiosInstance.get("/api/users")
//     .then(res=>{
//         return res.data
//     })
// }

export const postUser = async ({
    name,
    age
}) => {
    const result = await axiosInstance.post("/users", {
        name,
        age
    })
    return result.data
}

export const updateUser = async ({
    _id,
    name,
    age
}) => {
    const result = await axiosInstance.put(`/users/${_id}`, {
        name,
        age
    })
    return result.data
}

export const deleteUser = async ({
    _id
}) => {
    const result = await axiosInstance.delete(`/users/${_id}`)
    return result.data
}

export const getUserDetail = async({
    _id
})=>{
    const result= await axiosInstance.get(`/users/${_id}`);
    return result.data;
}