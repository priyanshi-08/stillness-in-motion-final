import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Pagination } from '@mui/material';
import Swal from 'sweetalert2'
import emailjs from "@emailjs/browser";

const ManageApplications = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 5;
  const totalPage = Math.ceil(applications.length / itemsPerPage);


  useEffect(() => {
    let lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    if (lastIndex > applications.length) {
      lastIndex = applications.length
    }
    const currentItems = applications.slice(firstIndex, lastIndex);
    setPaginatedData(currentItems);
  }, [page, totalPage])

  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    axiosFetch.get('/applied-instructor').then(res => {
      setApplications(res.data);
    }).catch(err => console.log(err));
  }, [])

  const handleAccept = (email) => {
    axiosSecure.put(`/update-applicant/${email}`, { role: 'instructor' })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Application Accepted",
            showConfirmButton: false,
            timer: 1500
          });
          axiosSecure.delete(`/delete-appl/${email}`).then(res => console.log(res.data)).catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err));
  }

  const handleReject = (email, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to reject this application?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const templateParams = {
          user_name: name,
          user_email: email
        };
        
        axiosSecure.delete(`/delete-appl/${email}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              // Update UI state
              setApplications(prev => prev.filter(app => app.email !== email));
              
              // Send email notification
              return emailjs.send(
                "service_ntlxjnj", 
                "template_erhbhzb", 
                templateParams, 
                "jDUCkHvEr8WQWBAtc"
              );
            }
            throw new Error('Failed to delete application');
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Application Rejected!",
              text: `${name} has been notified.`,
              showConfirmButton: false,
              timer: 2000
            });
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Rejection Failed",
              text: err.message || "Something went wrong!",
            });
          });
      }
    });
  }

  return (
    <div className='w-full'>
      <h1 className='text-4xl font-bold text-center my-10'>Instructor <span className='text-secondary'>Applications</span></h1>
      <div>
        <div className='flex flex-col my-4'>
          <table className='min-w-full text-left text-sm font-light '>
            <thead className='border-b font-medium dark:border-neutral-500'>
              <tr className='p-2 text-center'>
                <th className='text-left p-2 semi-bold border text-center'>#</th>
                <th className='text-left p-2 semi-bold border text-center'>Name</th>
                <th className='text-left p-2 semi-bold border text-center'>Skills</th>
                <th className='text-left p-2 semi-bold border text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                applications.length === 0 ? <tr><td className='text-center font-bold border text-2xl'>No Applications currently</td></tr> :
                  paginatedData.map((item, idx) => {
                    return (<tr key={idx} className='border-b transition text-center duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                      <td>{idx + 1}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{item.name}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{item.exp}</td>
                      <td className='whitespace-nowrap  px-6 py-4 flex space-x-4 justify-center'>
                        <button onClick={() => handleAccept(item.email)} className='p-1 rounded-md text-white bg-green-600'>Accept</button>
                        <button onClick={() => handleReject(item.email, item.name)} className='p-1 rounded-md text-white bg-red-600'>Deny</button>
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

export default ManageApplications
