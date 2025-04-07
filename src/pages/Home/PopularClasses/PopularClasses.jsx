import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import Card from './Card';

const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axiosFetch.get('/popular-classes');
            setClasses(response.data)
        }
        fetchClasses(); 
    }, [])
    
  return (
    <div className='md:w-[80%] mx-auto my-28'>
        <div className='font-bold text-5xl text-center dark:text-white'>
        Our <span className='text-secondary'>Popular</span> Classes
        </div>
        <div className='md:w-[40%] mx-auto text-center my-4'>
            <p className='text-gray-500'>Explore our popular classes. Here are some popular classes based on how many students enrolled </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                classes.map((item, index) => <Card key={index} item={item}/>)
            }
        </div>
    </div>
  )
}

export default PopularClasses