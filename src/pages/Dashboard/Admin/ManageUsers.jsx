import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { TbRefresh } from "react-icons/tb";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { Pagination } from '@mui/material';
import Swal from 'sweetalert2'

const ManageUsers = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 5;
  const totalPage = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    axiosFetch.get('/users').then(res => {
      setUsers(res.data);
    }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    let lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    if (lastIndex > users.length) {
      lastIndex = users.length
    }
    const currentItems = users.slice(firstIndex, lastIndex);
    setPaginatedData(currentItems);
  }, [page, totalPage])

  const handleChange = (event, value) => {
    setPage(value);
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axiosSecure.delete(`/user/${id}`).then(res => {
          if (res.data.modifiedCount > 0) {
            const updatedUsers = users.map(user => user.id)
            setUsers(updatedClasses);
            Swal.fire({
              title: "Deleted!",
              text: "The class has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
        // Handle case where user is not found
        if (res.data.modifiedCount === 0) {
          Swal.fire({
            title: "Error!",
            text: "User not found.",
            icon: "error"
          });
        }

  }

  return (
    <div className='w-full'>
      <h1 className='text-4xl font-bold text-center my-10'>Manage <span className='text-secondary'>Users</span></h1>
      <div>
        <div className='flex flex-col my-4'>
          <table className='min-w-full text-left text-sm font-light '>
            <thead className='border-b font-medium dark:border-neutral-500'>
              <tr className='p-2 text-center'>
                <th className='text-left p-2 semi-bold border'>#</th>
                <th className='text-left p-2 semi-bold border'>Photo</th>
                <th className='text-left p-2 semi-bold border'>Name</th>
                <th className='text-left p-2 semi-bold border'>Role</th>
                <th className='text-left p-2 semi-bold border'>Update</th>
                <th className='text-left p-2 semi-bold border'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length === 0 ? <tr><td className='text-center font-bold border text-2xl'>No Users Available</td></tr> :
                  paginatedData.map((item, idx) => {
                    return (<tr key={idx} className='border-b transition text-center duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                      <td>{idx + 1}</td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <img src={item.photoUrl} className='h-[35px] w-[35px]' alt='' />
                      </td>
                      <td className='whitespace-nowrap px-6 py-4'>{item.name}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{item.role}</td>
                      <td className='whitespace-nowrap  px-6 py-4'>
                        <button onClick={() => navigate(`/dashboard/update-user/${item._id}`)} className='p-1 rounded-md text-white bg-green-600'>Update <TbRefresh className='inline-block' /></button>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item._id)} className='p-1 rounded-md text-white bg-red-600'>Delete <MdOutlinePlaylistRemove className='inline-block' /></button>
                      </td>
                    </tr>)
                  })
              }
            </tbody>
          </table>
        </div>
        <Pagination count={totalPage} onChange={handleChange} />
      </div>
    </div>
  )
}

export default ManageUsers
