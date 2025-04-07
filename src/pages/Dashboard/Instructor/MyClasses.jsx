import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import moment from 'moment'

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/classes/${currentUser?.email}`)
      .then(res => {
        setClasses(res.data);
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
          classes.length === 0 ? (<div className="">You have not added any class yet</div>) : <div>
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
                          <h1 className="text-secondary my-2">
                            <span className="text-black">Status: </span> {" "}
                            <span className={`font-bold ${cls.status === "pending"
                              ? "text-orange-400"
                              : cls.status === "checking"
                                ? "text-yellow-400"
                                : cls.status === "approved"
                                  ? "text-green-400"
                                  : "text-red-600"
                              }`} >
                              {cls.status}
                            </span>
                          </h1>
                        </div>
                        <div className="">
                          <h1 className="ttext-green-900 my-2">
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
                        <div className="space-y-2 my-2 w-1/3">
                          <h1 className="font-bold mb-3">Action : </h1>
                          <button onClick={() => handleFeedback(cls._id)} className="px-3 bg-orange-400 font-bold py-1 ext-white w-full rounded-lg"> View Feedback</button>
                          <button className="px-3 bg-green-500 font-bold py-1 ext-white w-full rounded-lg"> View Details</button>
                          <button onClick={() => navigate(`dashboard/update/${cls._id}`)} className="px-3 bg-blue-700 font-bold py-1 ext-white w-full rounded-lg"> Update </button>
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

export default MyClasses
