import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment'

const ApprovedClass = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/classes/${currentUser?.email}`)
      .then(res => {
        setClasses((res.data).filter(cls => cls.status === 'approved'));
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="w-full">
      <div className="my-4 text-center">
        <h1 className="text-4xl font-bold">My <span className="text-secondary text-center">Classes</span></h1>
        <p className="text-gray-400 my-2">Hi Instructor! You can see all your classes here.</p>
      </div>
      <div>
        {
          classes.length === 0 ? (<div className="text-center">Sorry! There are no approved classes.</div>) : <div>
            {
              classes.map((cls, index) => (
                <div key={index} className="mb-5 hover:ring ring-secondary duration-200 focus-ring rounded-lg mx-8">
                  <div className="bg-white flex rounded-lg gap-8 shadow p-4">
                    <div className="w-[500px]">
                      <img src={cls.image} alt={cls.class_name} className="max-h-[200px] max-w-[300px]" />
                    </div>
                    <div className="w-full">
                      <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-2 ">{cls.class_name}</h2>
                      <div className="flex gap-6">
                        <div>
                          <h1 className="text-green-900 my-2">
                            <span className="text-black">Total Students</span> :{" "}
                            {cls.total_enrolled ? cls.total_enrolled : 0}
                          </h1>
                          <h1 className="text-green-900">
                            <span className="text-black">Total Seats </span> :{" "}
                            {cls.available_seats}
                          </h1>
                          <div>
                            <h1 className="text-black my-2">
                            Description: <span className="text-green-900">{cls.course_description}</span> 
                            </h1>

                          </div>

                        </div>
                        <div className="">
                          <h1 className="text-green-900 my-2">
                            <span className="text-black">Price</span> :{" "}
                            <span className="text-green-900">${cls.price}</span>
                          </h1>
                          <h1 className="text-green-900 my-2">
                            <span className="text-black">Submitted</span> :{" "}
                            <span className="">{
                              cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY')
                                : "Not get data"
                            }</span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}

export default ApprovedClass