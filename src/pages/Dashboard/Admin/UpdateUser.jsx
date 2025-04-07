import React from 'react'
import useAuth from '../../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const UpdateUser = () => {
  const { user } = useAuth();
  const userCreds = useLoaderData();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);
    axiosSecure.put(`/update-user/${userCreds._id}`, updatedData)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch(err => console.log(err));

  }

  return (
    <div className='w-full mx-4'>
      <div className='my-10'>
        <h1 className='font-bold text-3xl text-center'>Update: <span className='text-secondary'>{userCreds.name}</span></h1>
        <p className='text-center my-2 text-gray-400'>Modifying info for : <span>{userCreds.name}</span></p>
      </div>
      <form onSubmit={handleSubmit} className='mx-auto p-6 bg-white rounded shadow w-full mb-8'>
        <div className='grid grid-cols-2 w-full gap-3 items-center'>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>Name</label>
            <input type='text' required id='name' defaultValue={userCreds?.name} placeholder='Name' name='name'
              className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor='phone'>Phone</label>
            <input type='tel' required id='phone' placeholder='Phone Number' name='phone' pattern="^\d{10}$" maxLength={10}
              className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
          </div>

        </div>
        <div>
          <div className='grid gap-3 grid-cols-2'>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='email'>Email</label>
              <h1 className='text-[12px] my-2 ml-2 text-red-400'>Changing email is not advised</h1>
              <input type='email' disabled required id='email' defaultValue={userCreds?.email} name='email'
                className='w-full text-gray-400 px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500' />
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='skills'>Skills</label>
              <h1 className='text-[12px] my-2 ml-2 text-secondary'>Mention skills in one line separated by comma, if user is instructor.</h1>
              <input type='text' id='skills' name='skills'
                className='w-full  px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='address'>Address</label>
              <input type='text' id='address' name='address'
                className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700 font-bold mb-2' htmlFor='photo'>PhotoUrl</label>
              <input type='text' id='photo' name='photo'
                className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></input>
            </div>
          </div>
          <h1 className='block font-bold mb-2' htmlFor='time'>Please select a role</h1>
          <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mb-6'>
            <div>
              <input className='peer sr-only'
                id="option1"
                type="radio"
                value="user"
                defaultChecked={userCreds.role === 'user' ? true : false}
                tabIndex="-1"
                name="role" />
              <label htmlFor='option1' className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'>
                <span className='text-sm font-medium'>User</span>
              </label>
            </div>
            <div>
              <input className='peer sr-only'
                id="option2"
                type="radio"
                value="admin"
                defaultChecked={userCreds.role === 'admin' ? true : false}
                tabIndex="-1"
                name="role" />
              <label htmlFor='option2' className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'>
                <span className='text-sm font-medium'>Admin</span>
              </label>
            </div>
            <div>
              <input className='peer sr-only'
                id="option3"
                type="radio"
                value="instructor"
                defaultChecked={userCreds.role === 'Instructor' ? true : false}
                tabIndex="-1"
                name="role" />
              <label htmlFor='option3' className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'>
                <span className='text-sm font-medium'>Instructor</span>
              </label>
            </div>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor='about'>About</label>
            <textarea rows="5" cols="50" placeholder="About you ..." type='link' id='about' name='about'
              className='w-full px-4 py-2 outline-none border border-secondary rounded-md focus:outline-none focus:ring-green-500'></textarea>
          </div>
        </div>
        <button type="submit" className='w-full bg-secondary rounded p-2'>Update</button>
      </form>
    </div>
  )
}

export default UpdateUser