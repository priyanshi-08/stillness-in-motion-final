import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Pagination from '@mui/material/Pagination';
import Swal from 'sweetalert2'

const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemsPerPage);

  useEffect(() => {
    axiosFetch.get(`/classes-manage`)
      .then(res => setClasses(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length
    }
    const currentItems = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentItems);
  }, [page, totalPage])

  const handlChange = (event, value) => {
    setPage(value);
  }

  const handleApprove = (id) => {
    axiosSecure.patch(`/change-status/${id}`, { status: 'approved' }).then(res => {
      if (res.data.modifiedCount <= 0) {
        Swal.fire({
          icon: "success",
          title: "Class already approved",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        const updatedClasses = classes.map(cls => cls.id === id ? { ...cls, status: 'approved' } : cls)
        setClasses(updatedClasses);
        Swal.fire({
          icon: "success",
          title: "Class updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(0);
      }
    }).catch(err => console.log(err));


  }

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unpublish it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axiosSecure.patch(`/change-status/${id}`, { status: 'rejected' }).then(res => {
          if (res.data.modifiedCount > 0) {
            const updatedClasses = classes.map(cls => cls.id === id ? { ...cls, status: 'rejected' } : cls)
            setClasses(updatedClasses);
            Swal.fire({
              title: "Deleted!",
              text: "The class has been deleted.",
              icon: "success"
            });
            navigate(0);
          }
        });
      }
    });
  };

  return (
    <div className='w-full'>
      <h1 className='text-4xl text-secondary font-bold text-center my-10'>Manage <span className='text-black'>Classes</span></h1>
      <div>
        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:-mx-6 font-light'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm font-light '>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr className='p-2'>
                      <th className='text-left p-2 semi-bold border'>Photo</th>
                      <th className='text-left p-2 semi-bold border'>Course Name</th>
                      <th className='text-left p-2 semi-bold border'>Instructor Name</th>
                      <th className='text-left p-2 semi-bold border'>Status</th>
                      <th className='text-left p-2 semi-bold border'>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      classes.length === 0 ? <tr><td className='text-center font-bold border text-2xl'>No Classes Available</td></tr> :
                        paginatedData.map((item, idx) => {
                          return (<tr key={idx} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                            <td className='whitespace-nowrap px-6 py-4'>
                              <img src={item.image} className='h-[35px] w-[35px]' alt='' /></td>
                            <td className='whitespace-nowrap px-6 py-4'>{item.class_name}</td>
                            <td className='whitespace-nowrap px-6 py-4'>{item.instructor}</td>
                            <td className='whitespace-nowrap  px-6 py-4'>
                              <span className={`font-bold uppercase text-white rounded-xl p-1 ${item.status === 'pending' ? 'bg-orange-400' :
                                item.status === 'checking' ? 'bg-yellow-500' :
                                  item.status === 'approved' ? 'bg-green-500' : 'bg-red-600'}`}>
                                {item.status}</span></td>
                            <td className='whitespace-nowrap px-6 py-4'>
                              <div className='flex gap-2'>
                                {
                                  <button onClick={() => handleApprove(item._id)} className='text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white'>Approve</button>
                                }
                                {
                                  <button onClick={() => handleReject(item._id)} className='text-[12px] cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white'>Deny</button>
                                }
                              </div>
                            </td>
                          </tr>)
                        })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* pagination */}
          <Pagination count={totalPage} onChange={handlChange} />
        </div>
      </div>
    </div>
  )
}
export default ManageClasses
