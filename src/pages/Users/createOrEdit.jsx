import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import Layout from '../../layouts'
import Button from '../../components/button'
import Card from '../../components/card'
const CreateOrEditUser = () => {

    const Params= useParams();
    const {getUserById,postNewUser,editUser}= useUsers()

    const [data, setData]= useState({name:'',age:''});

    useEffect(()=>{
        if(Params.id){
            getUserById(Params.id).then((res)=>setData(res))
        }
    },[Params.id])

    const handleSubmit=async (e)=>{
         e.preventDefault()
        if(Params.id){
          console.log('edit')
          await editUser(Params.id,data.name,data.age);
        }else{
          console.log('create')
          await postNewUser(data.name,data.age);
        }
        setData({name:'',age:''});
    }

    
    console.log('value of params', Params);


  return (
    <Layout>
        <Card>
        <div className='flex justify-between items-center gap-9'>
            <h1 className='text-2xl text-primary'>{Params.id? "Edit":"Create"} User</h1>
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