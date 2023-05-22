import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers';
import Layout from '../../layouts';
import Button from '../../components/button';
import Card from '../../components/card';

const ViewUser = () => {

    const Params= useParams();
    const {getUserById}= useUsers();
    const[data,setData]=useState({});

    useEffect(()=>{
      if(Params.id){
        getUserById(Params.id).then(res=>setData(res))
      } 
    },[Params.id])

    console.log(Params.id);
  return (
    <Layout>
      <Card>

      <div className='flex justify-between item-center gap-3'>
        <div>View Users</div>
        <div className='px-10 -my-3'>
        <Link to ='/users'>
            <Button text={"Users List"} />
        </Link>
        </div>
      </div>
      {data.name} 
      {data.address}
      {data.email}
      {data.age}
      </Card>
    </Layout>
  )
}

export default ViewUser