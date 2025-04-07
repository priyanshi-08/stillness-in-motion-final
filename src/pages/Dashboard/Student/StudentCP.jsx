import React from 'react'
import useUser from '../../../hooks/useUser';
import img from '../../../assets/dashboard/urban-welcome.svg'

const StudentCP = () => {
  const { currentUser, isLoading } = useUser();
  const role = currentUser?.role;
  return (
    <div className='flex items-center justify-center'>
      <div>
        <img src={img} className='h-50 w-60' />
        <div>
          <h1 className='text-2xl font-bold'>Hi <span className='text-secondary font-bold text-3xl'>{currentUser.name}</span>! Welcome to your Dashboard. </h1>
        </div>
      </div>
    </div>
  )
}

export default StudentCP