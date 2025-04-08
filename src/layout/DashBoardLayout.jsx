import React, { useContext, useEffect, useState } from 'react'
import useUser from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from 'react-icons/bi'
import { FaHome, FaUsers } from 'react-icons/fa';
import { BsFillPostcardFill } from 'react-icons/bs';
import { TbBrandAppleArcade } from 'react-icons/tb'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdExplore, MdOfflineBolt, MdPayments, MdPendingActions } from 'react-icons/md';
import Swal from 'sweetalert2'
import { IoSchoolSharp } from 'react-icons/io5';
import { IoMdDoneAll } from 'react-icons/io';
import { SiGoogleclassroom, SiInstructure } from 'react-icons/si'
import { GridLoader } from 'react-spinners'
import { AuthContext } from '../utilities/providers/AuthProvider';

const DashBoardLayout = () => {

  const adminNavLinks = [
    {
      to: "/dashboard/admin-home",
      icon: <BiHomeAlt className='text-2xl' />,
      label: "Dashboard Home"
    },
    {
      to: "/dashboard/manage-classes",
      icon: <FaUsers className='text-2xl' />,
      label: "Manage Classes"
    },
    {
      to: "/dashboard/manage-users",
      icon: <BsFillPostcardFill className='text-2xl' />,
      label: "Manage Users"
    },
    {
      to: "/dashboard/manage-applications",
      icon: <TbBrandAppleArcade className='text-2xl' />,
      label: "Applications"
    }
  ]

  const instructorNavItems = [
    {
      to: "/dashboard/instructor-cp",
      icon: <FaHome className='text-2xl' />,
      label: "Home"
    },
    {
      to: "/dashboard/add-classes",
      icon: <MdExplore className='text-2xl' />,
      label: "Add a class"
    },
    {
      to: "/dashboard/my-classes",
      icon: <IoSchoolSharp className='text-2xl' />,
      label: "My classes"
    },
    {
      to: "/dashboard/my-pending",
      icon: <MdPendingActions className='text-2xl' />,
      label: "Pending Classes"
    },
    {
      to: "/dashboard/my-approved",
      icon: <IoMdDoneAll className='text-2xl' />,
      label: "Approved Classes"
    }
  ]

  const StudentNavItems = [
    {
      to: "/dashboard/student-cp",
      icon: <BiHomeAlt className='text-2xl' />,
      label: "Dashboard"
    },
    {
      to: "/dashboard/enrolled-class",
      icon: <SiGoogleclassroom className='text-2xl' />,
      label: "My Classes"
    },
    {
      to: "/dashboard/my-selected",
      icon: <BiSelectMultiple className='text-2xl' />,
      label: "My Cart"
    },
    {
      to: "/dashboard/my-payments",
      icon: <MdPayments className='text-2xl' />,
      label: "Payment History"
    },
    {
      to: "/dashboard/apply-instructor",
      icon: <SiInstructure className='text-2xl' />,
      label: "Apply for Instructor"
    },

  ]

  const lastMenuLinks = [
    {
      to: "/",
      icon: <BiHomeAlt className='text-2xl' />,
      label: "Main Home"
    }
  ]

  const [open, setOpen] = useState(true); 
  const { isLoading } = useUser();
  const { currentUser } = useUser();
  const { logout, setLoader } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = currentUser?.role;

  // Close sidebar on small screens
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(res => {
          Swal.fire({
            title: "Logout!",
            text: "You have been logged out successfully",
            icon: "success"
          });
          setLoader(false);
          navigate("/");
        }).catch(err => console.log(err))
        
      }
      
    });
  }

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>
      <GridLoader color="#28c28b" />
    </div>
  }

  return (
    <div className='flex'>
      <div className={`${open ? "w-72 overflow-y-auto" : "w-20 overflow-auto"} h-screen p-5 md:block hidden pt-8 relative duration-100`}>
        <div className='flex gap-x-4 items-center'>
          <img onClick={() => setOpen(!open)} src='/logo.jpg' alt='' className={`cursor-pointer h-[40px] duration-200 ${open && "rotate-[360deg]"}`}></img>
          <h1 onClick={() => setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}>Stillness In Motion</h1>
        </div>
        {/* admin routes */}
        {
          role === 'admin' && <ul>
            <p className={`ml-3 text-gray-500 mt-2 ${!open && "hidden"}`}><small>MENU</small></p>
            {
              role === 'admin' && adminNavLinks.map((item, idx) =>
                <li key={idx}>
                  <NavLink to={item.to} className={({ isActive }) =>
                    `flex ${isActive ? "bg-pink-300 text-white" : "text-[#413F44]"} duration rounded-md p-2
                  hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }>{item.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{item.label}</span></NavLink>
                </li>
              )
            }
          </ul>
        }
        {/* instructor routes */}
        {
          role === 'instructor' && <ul>
            <p className={`ml-3 text-gray-500 mt-2 ${!open && "hidden"}`}><small>MENU</small></p>
            {
              role === 'instructor' && instructorNavItems.map((item, idx) =>
                <li key={idx}>
                  <NavLink to={item.to} className={({ isActive }) =>
                    `flex ${isActive ? "bg-pink-300 text-white" : "text-[#413F44]"} duration rounded-md p-2
                  hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }>{item.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{item.label}</span></NavLink>
                </li>
              )
            }
          </ul>
        }
        {/* student routes */}
        {
          role === 'user' && <ul>
            <p className={`ml-3 text-gray-500 mt-2 ${!open && "hidden"}`}><small>MENU</small></p>
            {
              role === 'user' && StudentNavItems.map((item, idx) =>
                <li key={idx}>
                  <NavLink to={item.to} className={({ isActive }) =>
                    `flex ${isActive ? "bg-pink-300 text-white" : "text-[#413F44]"} duration rounded-md p-2
                  hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }>{item.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{item.label}</span></NavLink>
                </li>
              )
            }
          </ul>
        }
        <div>
          {
            <ul>
              <p className={`ml-3 text-gray-500 mt-2 uppercase ${!open && "hidden"}`}><small>Use full links</small></p>
              {
                lastMenuLinks.map((item, idx) =>
                  <li key={idx}>
                    <NavLink to={item.to} className={({ isActive }) =>
                      `flex ${isActive ? "bg-pink-300 text-white" : "text-[#413F44]"} duration rounded-md p-2
                  hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }>{item.icon}
                      <span className={`${!open && "hidden"} origin-left duration-200`}>{item.label}</span></NavLink>
                  </li>

                )
              }
              <li key="logout">
                <NavLink onClick={handleLogout} className='flex duration rounded-md p-2 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4'>
                  <BiLogInCircle className='text-[#413F44] h-6 w-6' />
                  <span className='text-[#413F44]'>Logout</span>
                </NavLink>
              </li>
            </ul>
          }
        </div>
      </div>
      <Outlet />
      {/* check for use scroll hook video 4(total 1:55:18) 1:32:15 */}
    </div>
  )
}

export default DashBoardLayout;
