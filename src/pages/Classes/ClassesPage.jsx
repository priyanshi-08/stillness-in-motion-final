import React, { useContext, useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../utilities/providers/AuthProvider";
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';


const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosfetch = useAxiosFetch();
  const { user } = useContext(AuthContext);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const axiosSecure = useAxiosSecure();
  const nagivate = useNavigate();

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
            .then(res => {}
), {
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

  const handleHover = (index) => {
    setHoveredCard(index);
  }

  useEffect(() => {
    axiosfetch.get('/classes').then(res => setClasses(res.data)).catch(err => console.log(err)
    );
  }, []);

  const approvedcls = classes.filter(cls => cls.status === 'approved');

  return (
    <div className='mt-20 pt-3'>
      <h1 className='text-secondary text-4xl font-bold text-center mb-4'>Classes</h1>
      <div />
      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          approvedcls.map((cls, idx) => (
            <div
              key={idx} className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-auto
            h-[400px] mx-auto${cls.available_seats < 1 ? 'bg-red' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden`}
              onMouseEnter={() => handleHover(idx)}
              onMouseLeave={() => handleHover(null)}>
              <div className='relative h-48 absolute'>
                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard == idx ? "opacity-60" : ""}`} />
                <img src={cls.image} alt='' className='w-full h-full object-cover'></img>

                <Transition show={hoveredCard === idx}>
                  <div className=" absolute inset-0 flex items-center justify-center">
                    <button onClick={() => handleSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? "Admins/Instructors can't avail the courses" ? cls.available_seats < 1 : 'No seats available' : 'You can select classes'}
                      disabled={role === 'admin' || role === 'instructor' || cls.available_seats < 1}
                      className='bg-secondary hover:bg-red-300 p-2 rounded-md transition duration-300 ease-in data-[closed]:opacity-0'>Add to Cart</button>
                    
                  </div>
                </Transition>
              </div>
              <div className='py-4 px-6'>
                {/* details */}
                <div className='space-y-3'>
                  <p className='font-bold text-lg'>{cls.class_name}</p>
                  <p className='text-gray-500 text-sm'>Instructor: {cls.instructor}</p>
                  <div className='flex'>
                    <p className='text-gray-500 text-sm'>Available Seats: {cls.available_seats}</p>
                    <p className='relative left-20 text-blue-600 font-bold'>${cls.price}</p>
                  </div>
                  <Link to={`/class/${cls._id}`}> <button className='bg-secondary p-2 text-center text-white mt-4 w-full hover:bg-green-600 mt-2'>View</button></Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <ToastContainer position="top-right" />
    </div>
  )
}

export default ClassesPage
