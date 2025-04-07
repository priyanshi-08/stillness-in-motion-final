import React, { useRef } from 'react'
import HeroContainer from './Hero/HeroContainer';
import Gallary from './Gallary/Gallary.jsx'
import PopularClasses from './PopularClasses/PopularClasses.jsx';
import PopularTeacher from './PopularTeacher/PopularTeacher.jsx';
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2';

const HomePage = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm("service_ntlxjnj", "template_u1g8b6d", form.current, "jDUCkHvEr8WQWBAtc")
        .then(
          (result) => {
            Swal.fire({
              icon: "success",
              title: "Subscribed Successfully!",
              showConfirmButton: false,
              timer: 1500
            });
            form.current.reset();
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            console.log("Something went wrong: " + error.text);
          }
        );
    };
  return (
    <section id='popular-classes'>
    <HeroContainer/>
    <div className='max-w-screen-xl mx-auto'>
      <Gallary/>
      <PopularClasses/>
      {/* </div> */}
      <PopularTeacher/>
      <div className='bg-pink-200 w-full h-[200px]'>
        <div className='flex space-x-12 text-white  font-sans items-center justify-center py-14'>
          <div className='flex flex-col text-center font-bold'>
            <p className='text-5xl'>35M+</p>
            <p className=''>Visitor</p>
          </div>
          <div className='flex flex-col text-center font-bold'>
            <p className='text-5xl'>5M+</p>
            <p className=''>Subscribers</p>
          </div>
          <div className='flex flex-col text-center font-bold'>
            <p className='text-5xl'>950k+</p>
            <p className=''>Students</p>
          </div>
          <div className='flex flex-col text-center font-bold'>
            <p className='text-5xl'>90%</p>
            <p className=''>Success Stories</p>
          </div>
        </div>
      </div>
      <div className='my-4 flex justify-center'>
        <form ref={form} onSubmit={sendEmail} className='flex flex-col items-center justify-center mt-14 dark:text-white'>
          <label className='dark:text-white w-[40%] text-3xl font-bold-md my-10 text-center w-full'>Want us to email you with the latest blockbuster news?</label>
          <div className='flex flex-col w-[50%] relative w-[300px] justify-center items-center'>
          <input type='email' name='user_email' placeholder='example@company.com' className='rounded-full w-full bg-gray-300 py-3 pl-2 pr-3 mb-2'>
          </input>
          <button type='submit' className="bg-secondary cursor-pointer rounded-full p-2 w-24 pr-8 ">Subscribe</button>
          </div>
        </form>
      </div>
    </div>
    </section>
  )
}

export default HomePage;