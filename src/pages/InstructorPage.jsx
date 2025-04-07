import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch';

const InstructorPage = () => {
  const axiosFetch = useAxiosFetch();
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        const fetchInstructors = async () => {
            const response = await axiosFetch.get('/popular-instructors');
            setInstructors(response.data)
        }
        fetchInstructors();
    }, [])
  return (
     <div className='md:w-[80%] mx-auto my-28'>
        <div className>
        <h1 className='font-bold text-5xl text-center dark:text-white'>Our <span className='text-secondary'>Best</span> Teachers</h1>
        
        <div className='md:w-[40%] mx-auto text-center my-4'>
            <p className='text-gray-500'>Meet our highly skilled and experienced teacher who'll make your Tai Chi journey smooth and eventful.</p>
        </div>
            {
                instructors ? <>
                    <div className='grid mb-28 md:grid-cols-1 lg:grid-cols-2 w-[90%] gap-4 mx-auto'>
                        {
                            instructors.slice(0,4)?.map((instructor, i) => (
                                <div key={i} className='flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer
                                     flex-col shadow-md py-8 px-10 md:px-8 rounded-md dark:shadow-white'>
                                    <div className='flex-col flex gap-6 md:gap-8'>
                                        <img className='rounded-full w-24 h-24 border-4 border-gray-300 mx-auto'
                                         src={instructor?.instructor?.photoUrl || `${img}`} alt=''/>
                                    </div>
                                    <div className='text-center'>
                                        <p className='font-bold py-4'>{instructor?.instructor?.name}</p>
                                        <p className='text-gray-500 mb-4'>Instructor</p>
                                        <p className='text-gray-600 mb-4'>About: <span className='text-black'>{instructor?.instructor?.about}</span></p>
                                        <p className='text-gray-600 mb-4 '>Email: <span className='text-black'>{instructor?.instructor?.email}</span></p>
                                        <p className='text-gray-600 mb-4 '>Skills: <span className='text-black'>{instructor?.instructor?.skills.map(skill => skill).join(', ')}</span></p>
                                        <p className='text-italics text-secondary hover:text-green-600'>View Profile</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </> : <><p>No Instructors available</p></>
            }        
        </div>
    </div>
  )
}

export default InstructorPage