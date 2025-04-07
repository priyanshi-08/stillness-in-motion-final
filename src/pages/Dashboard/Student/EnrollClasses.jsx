import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';

const EnrollClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
      .then(
        res => {
          setData(res.data);
        })
      .catch(err => console.log(err))
  }, [])

  const handleClick = (id) =>  {
    navigate(`/class/${id}`);
  }

  return (
    <div className='w-full'>
      <h1 className='text-2xl my-6 text-center font-bold'> Enrolled Classes </h1>
      <div className='flex flex-col gap-3 mx-auto w-full overflow-hidden '>
        {
          data.length === 0 ? <h1 className='mt-16 text-center text-xl'>You have not enrolled in any course.</h1> : data.map((cls, idx) => (
            <div key={idx} className='bg-white shadow-md h-[30%] mx-3 rounded-3xl flex md:flex-row justify-around items-center overflow-hidden
        sm:flex-grow sm:h-52 w-full my-2'>
              <img src={cls.classes.image} alt='' className='h-1/2 w-full sm:h-full sm:w-1/2 object-cover' />
              <div className='flex-1 w-full p-2 flex flex-col items-baseline h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2'>
                <div>
                  <h1 className='text-2xl font-bold'>{cls.classes.class_name}</h1>
                  <p className='text-gray-500'>by {cls.classes.instructor}</p>
                  <p className='mt-4'>{(cls.classes.course_description).slice(0, 90)}...</p>
                    <div className='flex flex-col sm:flex-row justify-between md:items-baseline p-2'>

                    <p className='font-bold text-blue-500 mt-8 mb-2'>${cls.classes.price}</p>
                    <button onClick={() => {handleClick(cls.classes._id)}} className='rounded-lg h-10 w-10 bg-secondary text-white text-sm mr-4 cursor-pointer sm:mt-2'>View</button>
                  </div>
                </div>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default EnrollClasses
