import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FiBriefcase } from "react-icons/fi";
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import Swal from 'sweetalert2';

const ApplyIntsructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState();
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch.get(`/applied-instructor/${currentUser?.email}`)
      .then(res => {
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const exp = e.target.exp.value;

    axiosFetch.get(`/applied-instructor/${email}`).then(res => {
      if (res.data) {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "You have already applied",
        });
      } else {

        const data = {
          name,
          email,
          exp
        }

        axiosFetch.post(`/ass-instructor`, data)
          .then(res => {
            Swal.fire({
              icon: "success",
              title: "Applied Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(err => console.log(err))

      }
    }).catch(err => console.log(err))



  }


  return (
    <div className='space-y-2 flex flex-col w-full'>
      <div className='mt-8 mb-20 space-y-2'>
        <h1 className='text-3xl font-bold text-secondary text-center'>Join Us</h1>
        <p className='text-primary text-center'>Send your applications to become an Instructor</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className='flex gap-[160px]'>
          <label className='mx-1' htmlFor='name'>Name:</label>
          <label className='mx-1' htmlFor='email'>Email:</label>
        </div>
        <div className='flex '>
          <p><AiOutlineUser className='text-lg h-8 mx-1' /></p>
          <input type='text' defaultValue={currentUser?.name} placeholder='Name' name='name' className='px-[10px] outline-none border-b'></input>
          <p><AiOutlineMail className='text-lg h-8 mx-1' /></p>
          <input type='email' defaultValue={currentUser?.email} placeholder='Email' name='email' className='px-[10px] outline-none border-b'></input>
        </div>
        <div>
          <p className='m-2'>Experience</p>
        </div>
        <div className='flex'>
          <FiBriefcase className='text-lg h-8 mx-1' />
          <textarea rows='3' cols="40" name='exp' placeholder='Tell us about your experience' className='px-[10px] outline-none border' />
        </div>
        <div className='flex justify-center my-2'>
          <button type='submit' className='bg-secondary text-white p-2 rounded-lg flex mr-[2px] cursor-pointer'><IoPaperPlaneOutline className='my-[5px] mx-[2px]' />Submit</button>
        </div>
      </form>
    </div>
  )
}

export default ApplyIntsructor