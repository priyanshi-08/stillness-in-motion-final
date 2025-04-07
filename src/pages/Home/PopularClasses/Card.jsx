import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({item}) => {
    const {_id, class_name, image, price, available_seats, total_enrolled} = item;
    
  return (
    <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'>
        <img src={image} alt='' className='w-100 h-100'/>
        <div className='p-4 text-center'>
            <h2 className='font-semibold texl-xl mb-2 dark:text-white text-center'>{class_name}</h2>
            <p className='text-gray-600 mb-2'>Available Seats: {available_seats}</p>
            <p className='text-gray-600 mb-2'>Price: ${price}</p>
            <p className='text-gray-600 mb-2'>Total Students: {total_enrolled}</p>
        </div>
        <Link to={`class/${_id}`}>
            <button className='text-center font-bold p-2 rounded-xl w-full bg-secondary'>Select</button>
        </Link>
    </div>
  )
}

export default Card