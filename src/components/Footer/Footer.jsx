import React from 'react'
import {FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa'

const Footer = () => {
  return (
    <>
    <div className='flex px-16 mt-24 mb-20 py-4'>
        <div className='flex flex-col '>
            <p className='text-gray-500 w-[50%] mb-4 text-justify'>Our experienced instructors will guide you through structured lessons,
             helping you develop a solid foundation while nurturing your creativity and musical expression. </p>
             <div className='flex space-x-6 px-4'>
                <FaFacebook className='w-6 h-6 dark:text-white'/>
                <FaInstagram className='w-6 h-6 dark:text-white'/>
                <FaTwitter className='w-6 h-6 dark:text-white'/>
             </div>
        </div>
        <div className='flex text-secondary space-x-10 w-[60%] text-center'>
          <div className='flex flex-col w-full'>
            <p className='font-bold text-black dark:text-white'>Services</p>
            <a className='cursor-pointer hover:text-green-600'>Rock and Yoga</a>
            <a className='cursor-pointer hover:text-green-600'>Healthy Diet</a>
            <a className='cursor-pointer hover:text-green-600'>Fit to Health</a>
            <a className='cursor-pointer hover:text-green-600'>Excercise</a>
          </div>
        <div className='flex flex-col w-full'>
            <p className='font-bold text-black dark:text-white'>About</p>
            <a className='cursor-pointer hover:text-green-600'>About</a>
            <a className='cursor-pointer hover:text-green-600'>History</a>
            <a className='cursor-pointer hover:text-green-600'>Careers</a>
            <a className='cursor-pointer hover:text-green-600'>Our Team</a>
          </div>
          <div className='flex flex-col w-full'>
            <p className='font-bold text-black dark:text-white'>Support</p>
            <a className='cursor-pointer hover:text-green-600'>FAQs</a>
            <a className='cursor-pointer hover:text-green-600'>Contact</a>
            <a className='cursor-pointer hover:text-green-600'>Live chat</a>
          </div>
        </div>
    </div>
    <div className='flex flex-col items-center text-center justify-center py-2 text-gray-400 mb-8'>
      <p>@Company 2024. All rights reserved.</p>
      <p>Created with <a href='/' className='text-secondary hover:text-green-600'>Stillness In Motion</a></p>
    </div>
    </>
  )
}

export default Footer