import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './SingleClasses.css';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { useLoaderData } from 'react-router-dom';
import { FaBusinessTime, FaLevelUpAlt, FaUser, FaUsers } from 'react-icons/fa';
import { MdBookOnline } from 'react-icons/md';
import { toast } from 'react-toastify';
import img from '../Classes/check.png'

const SingleClasses = () => {
    const course = useLoaderData();
    const [enrolledClasses, setEnrolledClasses] = useState();
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const axiosSecure = useAxiosSecure();
    const axiosFetch = useAxiosFetch();
      const handleSelect = (id) => {
        axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
          .then(res => setEnrolledClasses(res.data)).catch(error => console.log(error));
    
        if (!currentUser) {
         toast.error("Please login");
         nagivate('/login');
        }
    
        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
          .then(res => {
            if (res.data.classId === id) {
              toast.error("Already Selected");
            } else if (enrolledClasses.find(item => item.classes._id === id)) {
              toast.error("Already Enrolled")
            } else {
              const data = {
                classId: id,
                userMail: currentUser?.email,
                date: new Date()
              }
    
              toast.promise(axiosSecure.post('add-to-cart', data)
                .then(), {
                pending: 'Selecting...',
                success: {
                  render({ data }) {
                    return 'Selected Successfully'
                  }
                },
                error: {
                  render({ data }) {
                    return `Error: ${data.message}`
                  }
                }
              })
            }
          })
      }
    

    return (
        <>
            <div className='breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat'>
                <ToastContainer /> {/* Adding ToastContainer for toast notifications */}
                <h2 className='text-4xl text-center font-bold text-secondary'>Course Details</h2>
            </div>
            <div className='nav-tab-wrapper tabs section-padding mt-8'>
                <div className='container'>
                    <div className='lg:col-span-8 col-span-12 px-4 w-[80%]'>
                        <div className='single-course-details'>
                            <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
                                <img src={course.image} alt='' className='rounded-md object-fut w-full h-full block' />
                            </div>
                            <h2 className='text-2xl mb-2'>{course.class_name}</h2>
                            <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                                <div className='flex space-x-4 items-center group'>
                                    <div className='flex-none'>
                                        <div className='h-12 w-12 rounded'>
                                            <img src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt='' className='object-cover w-full h-full rounded' />
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-secondary'> Trainer
                                            <a href='#' className='text-black'>
                                                : {course.instructor}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-secondary'>
                                        Time:
                                        <a href='#' className='text-black ml-1'>
                                            {course.time}
                                        </a>
                                    </span>
                                </div>
                            </div>
                            <div className='nav-tab-wrapper mt-12'>
                                <ul id="tabs-nav" className='course-tab mb-8 flex space-x-4'>
                                    <li className='active cursor-pointer'>
                                        <a href='#tab1'>Overview</a>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <a href='#tab2'>Curriculum</a>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <a href='#tab3'>Instructor</a>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <a href='#tab4'>Reviews</a>
                                    </li>
                                </ul>
                                <div id="tabs-content">
                                    <div id='tab1' className='tab-content'>
                                        <div>
                                            <h3 className='text-2xl mt-8'>Course Description</h3>
                                            <p className='mt-4'>{course.course_description}
                                            </p>
                                            <div className='bg-[#F8F8F8] dark:bg-teel-500 space-y-6 p-8 rounded-md my-8'>
                                                <h4 className='text-2xl'>What will you learn?</h4>
                                                <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                            <img src={img} alt='' className='h-20 w-20 sm:h-10 sm:w-10'/>
                                                        </div>
                                                        <div className='flex-1'>
                                                            Build on the foundational movements learned in the beginner class.
                                                            We will focus on improving posture, balance, and alignment to enhance your practice.
                                                        </div>
                                                    </li>
                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                            <img src={img} alt='' className='h-20 w-20 sm:h-10 sm:w-10' />
                                                        </div>
                                                        <div className='flex-1'>
                                                            Expand your repertoire with new forms and sequences that challenge your coordination and memory, helping you to develop a more comprehensive understanding of Tai Chi.
                                                        </div>
                                                    </li>
                                                    <li className='flex space-x-3'>
                                                        <div className='flex-none relative top-1'>
                                                            <img src={img} alt='' className='h-20 w-20 sm:h-10 sm:w-10' />
                                                        </div>
                                                        <div className='flex-1'>
                                                            Delve into the philosophy and principles behind Tai Chi, including concepts such as Yin and Yang, energy flow (Qi), and the importance of breath control.
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right side */}
                    <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0 px-6 w-[40%]'>
                        <div className='sidebarWrapper space-y-6'>

                            <div className='widget custom-text space-y-5'>
                                <a className='h-[220x] rounded relative block' href=''>
                                    <img src={course.image} alt='' className='block w-full h-full object-cover rounded' />                                </a>
                                <h3 className='font-bold text-green-900'>${course.price}</h3>
                                <button onClick={() => handleSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot select' ? course.available_seats < 1 : 'No seat available' : 'Ypu can select this class'} disabled={role === 'admin' || role === 'instructor' || course.available_seats < 1} className='btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white'>
                                    Enroll Now
                                </button>
                                <ul className='list space-y-4'>
                                    <li className='flex space-x-3 border-b border-[#ECECEC] md-4 pb-4 last:pb-0 past:mb-0 last:border-0 md:flex-row sm:flex-col'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaUser className='inline-flex' />
                                            <div className='text-black font-semibold'>
                                                Instructor
                                            </div>
                                        </div>
                                        <div className='flex-none'>{course.instructor}</div>
                                    </li>
                                    <li className='flex space-x-3 border-b border-[#ECECEC] md-4 pb-4 last:pb-0 past:mb-0 last:border-0 md:flex-row sm:flex-col'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <MdBookOnline />
                                            <div className='text-black font-semibold'>
                                                Sessions
                                            </div>
                                        </div>
                                        <div className='flex-none'>{course.
                                            number_of_sessions
                                        }</div>
                                    </li>
                                    <li className='flex space-x-3 border-b border-[#ECECEC] md-4 pb-4 last:pb-0 past:mb-0 last:border-0 md:flex-row sm:flex-col'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaBusinessTime />
                                            <div className='text-black font-semibold'>
                                                Duration
                                            </div>
                                        </div>
                                        <div className='flex-none'>{course.duration}</div>
                                    </li>
                                    <li className='flex space-x-3 border-b border-[#ECECEC] md-4 pb-4 last:pb-0 past:mb-0 last:border-0 md:flex-row sm:flex-col'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaUsers />
                                            <div className='text-black font-semibold'>
                                                Total Enrollment
                                            </div>
                                        </div>
                                        <div className='flex-none'>{
                                            course.total_enrolled}</div>
                                    </li>
                                    <li className='flex space-x-3 border-b border-[#ECECEC] md-4 pb-4 last:pb-0 past:mb-0 last:border-0 md:flex-row sm:flex-col'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaLevelUpAlt />
                                            <div className='text-black font-semibold'>
                                                Course Level
                                            </div>
                                        </div>
                                        <div className='flex-none'>{course.difficulty_level}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleClasses
