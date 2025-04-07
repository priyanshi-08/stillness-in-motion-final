import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { LuUsers } from "react-icons/lu";
import { LiaComments } from "react-icons/lia";
import { IoDocumentsOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";

const AdminStats = ({ users }) => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState([]);

    useEffect(() => {
        axiosSecure.get("/admin-stats").then(res => setStats(res.data)).catch(err => console.log(err))
    }, [])
    return (
        <div className='w-full flex'>
            <div className='grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 mx-auto '>
                <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                    <div className='p-4 bg-green-400'>
                        <LuUsers className='text-white w-12 h-12' />
                    </div>
                    <div className='px-4 text-gray-700'>
                        <h3 className='text-sm tracking-wider'>Total Members</h3>
                        <p className='text-3xl'>{users.length}</p>
                    </div>
                </div>
                <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                    <div className='p-4 bg-blue-400'>
                        <IoDocumentsOutline className='text-white w-12 h-12' />
                    </div>
                    <div className='px-4 text-gray-700'>
                        <h3 className='text-sm tracking-wider'>Approved Classes</h3>
                        <p className='text-3xl'>{stats.approvedClasses}</p>
                    </div>
                </div>
                <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow pr-8'>
                    <div className='p-4 bg-purple-300'>
                        <LiaComments className='text-white w-12 h-12' />
                    </div>
                    <div className='px-4 text-gray-700'>
                        <h3 className='text-sm tracking-wider'>Instructors</h3>
                        <p className='text-3xl'>{stats.instructor}</p>
                    </div>
                </div>
                <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                    <div className='p-4 bg-red-300'>
                        <GoDatabase className='text-white w-12 h-12' />
                    </div>
                    <div className='px-4 text-gray-700'>
                        <h3 className='text-sm tracking-wider'>Pending Classes</h3>
                        <p className='text-3xl'>{stats.pendingClasses}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminStats
