import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser';
import { duration, hslToRgb } from '@mui/material';

const KEY = import.meta.env.VITE_IMG_KEY;

const AddClass = () => {
  const IMG_URL = `https://api.imgbb.com/1/upload?key=${KEY}`
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [image, setImage] = useState(null);
  const { currentUser, isLoading } = useUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData ={};
    for (const [key, val] of formData.entries()){
      if(key != 'hours' && key != 'mins'){
        newData[key] = val;
      }
    }
    let duration = 0;
    if(formData.get('mins') == 0 ){
       duration = `${formData.get('hours')} hour(s)`
    } else {
       duration = `${formData.get('hours')} hour(s) ${formData.get('mins')} mins`
    }
    formData.append('file', image);

    fetch(IMG_URL, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => { 
        if(data.success === true){
          newData.image = data.data.display_url;
          newData.instructor = currentUser?.name;
          newData.instructor_email = currentUser?.email;
          newData.status = 'pending';
          newData.submitted = new Date();
          newData.total_enrolled = "0";
          newData.duration = duration;
          axiosSecure.post(`/new-class`, newData).then(res => {
            alert("Added course successfully!!")
          })
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='w-full mx-4'>
      <div className='my-10'>
        <h1 className='font-bold text-2xl text-center'>Add Your Class</h1>
      </div>
      <form onSubmit={handleSubmit} className='mx-auto p-6 bg-white rounded shadow w-full mb-8'>
        <div className='grid grid-cols-2 w-full gap-3 items-center'>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor='class_name'>Class Name</label>
            <input type='text' required id='class_name' placeholder='Your Class Name' name='class_name'
              className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2 '>Thumbnail Photo</label>
            <input type='file' required id='image' name='image'
              onChange={handleImageChange}
              className='block mt-[5px] w-full shadow-sm text-sm focus:z-10 border border-secondary rounded-md focus:outline-none cursor-pointer
            focus:ring-green-500 focus:border-green-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 file:cursor-pointer '></input>
          </div>
        </div>
        <div>
          <h1 className='text-[12px] my-2 ml-2 text-secondary'>You cannot change your name or email</h1>
          <div className='grid gap-3 grid-cols-2'>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='instrName'>Instructor Name</label>
              <input type='text' disabled required id='instrName' defaultValue={currentUser?.name} name='instrName'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='instrEmail'>Instructor Email</label>
              <input type='text' disabled required id='instrEmail' defaultValue={currentUser?.email} name='instrEmail'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='available_seats'>Available Seats</label>
              <input type='text' required id='available_seats' name='available_seats'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='price'>Price</label>
              <input type='text' required id='price' name='price'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='number_of_sessions'>Sessions</label>
              <input type='text' required id='number_of_sessions' name='number_of_sessions'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='duration'>Duration</label>
              <div className='flex'>
              <input type='number' min={0} max={24} required id='duration' name='hours'
                className=' px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
                <p className='mx-2 my-2 block text-gray-700 font-bold'>Hrs</p>
              <input type='number' min={0} max={60} required id='duration' name='mins'
                className=' px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
                <p className='block my-2 text-gray-700 font-bold mx-2'>Mins</p>
              </div>
            </div>
            <div className='mb-6'>
              <label className='block font-bold mb-2' htmlFor='time'>Timings</label>
              <input type='time' required id='time' name='time'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='difficulty_level'>Difficulty Level</label>
              <select type='text' required id='difficulty_level' name='difficulty_level'
                className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advance</option>
                </select>
            </div>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor='course_description'>Description about your course</label>
            <textarea rows="5" cols="50" placeholder="Tell us about the course" type='link' required id='course_description' name='course_description'
              className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></textarea>
          </div>
        </div>
        <button type="submit" className='w-full bg-secondary rounded p-2'>Add</button>
      </form>
    </div>
  )
}

export default AddClass
