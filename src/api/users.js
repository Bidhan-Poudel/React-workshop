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
export const getUsers = async () => {
    //start
    const result = await axiosInstance.get("/register")  // fulfilled, rejected
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
    password,
    email,
    address,
    age
}) => {
    const result = await axiosInstance.post("/register", {
        name,
        password,
        email,
        address,
        age
    })
    return result.data
}

export const updateUser = async ({
    _id,
    name,
    password,
    email,
    address,
    age
}) => {
    const result = await axiosInstance.put(`/register/${_id}`, {
        name,
        password,
        email,
        address,
        age
    })
    return result.data
}

export const deleteUser = async ({
    _id
}) => {
    const result = await axiosInstance.delete(`/register/${_id}`)
    return result.data
}

export const getUserDetail = async({
    _id
})=>{
    const result= await axiosInstance.get(`/register/${_id}`);
    return result.data;
}