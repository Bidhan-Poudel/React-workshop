import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import Layout from '../../layouts'
import Button from '../../components/button'
import Card from '../../components/card'
import { toast } from 'react-hot-toast'


const CreateOrEditUser = () => {

    const Params= useParams();
    const navigate=useNavigate()
    const {getUserById,postNewUser,editUser}= useUsers()

    const [data, setData]= useState({name:'',password:'',email:'',address:'',age:''});

    useEffect(()=>{
        if(Params.id){
            getUserById(Params.id).then((res)=>setData(res))
        }
    },[Params.id])

    const handleSubmit=async (e)=>{
         e.preventDefault()
         let message;
        if(Params.id){
          console.log('edit')
          await editUser(Params.id,data.name,data.password,data.email,data.address,data.age);
          message="User edited successfully"
        }else{
          console.log('create')
          console.log(data.name,data.password,data.email,data.address,data.age)
          await postNewUser(data.name,data.password,data.email,data.address,data.age);
          message="User created successfully"
        }
        setData({name:'',password:'',email:'',address:'',age:''});
        navigate("/users")
        setTimeout(()=>{
            toast.success(message);
        },200)
    }

    
    console.log('value of params', Params);


  return (
    <Layout>   
        

        <Card>
        <div className='flex justify-between items-center gap-9'>
            <h1 className='text-2xl text-primary'>{Params.id? "Edit":"Create"} User</h1>
            <Link to="/users">
                <Button text={"Users List"}/>
            </Link>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Name:</th>
                            <th><input type="text" value={data.name} name= 'name' onChange={(e)=>{setData({...data,name:e.target.value})} }/></th>
                        </tr>
                        <tr>
                            <th>Password:</th>
                            <th><input type="text" value={data.password} name='email' onChange={(e)=>{setData({...data,password:e.target.value})} } /></th>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <th><input type="text" value={data.email} name='email' onChange={(e)=>{setData({...data,email:e.target.value})} } /></th>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <th><input type="text" value={data.address} name='address' onChange={(e)=>{setData({...data,address:e.target.value})} } /></th>
                        </tr>
                        <tr>
                            <th>Age:</th>
                            <th><input type="text" value={data.age} name='age' onChange={(e)=>{setData({...data,age:e.target.value})} } /></th>
                        </tr>
                        <tr>
                            <th colSpan={2}><Button text={Params.id?"Edit":"Add"}/></th>
                        </tr>
                    </thead>
                </table>
            </form>
        </div>
        </Card>
    </Layout>
  )
}

export default CreateOrEditUser;