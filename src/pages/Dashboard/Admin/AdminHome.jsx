import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import AdminStats from './AdminStats';

const AdminHome = () => {
  const { currentUser } = useUser();
  const axiosFetch = useAxiosFetch();
  const [ users, setUsers ] = useState([]);
  useEffect(() => {
    axiosFetch.get(`/users`).then(res => setUsers(res.data)).catch(err => console.log(err))
  }, [])

  const admins = users.filter(user => user.role === 'Admin' || user.role === 'admin');
  return (
    <div>
      <div>
        <h1 className='text-4xl font-bold my-7'>Welcome Back, <span className='text-secondary'>{currentUser?.name}</span></h1>
        <AdminStats users = {users}/>
      </div>
    </div>
  )
}

export default AdminHome