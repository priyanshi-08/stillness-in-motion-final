import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import photoUrl from "../../assets/home/girl.jpg"
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"
import Swal from 'sweetalert2'
import { AuthContext } from '../../utilities/providers/AuthProvider';

const navbarLinks = [
    { name: 'Home', route: '/' },
    { name: 'Instructor', route: '/instructors' },
    { name: 'Classes', route: '/classes' }
]

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff0000',
        },
        secondary: {
            main: '#00ff00',
        },
    },
})
const Navbar = () => {
    const navigate = useNavigate();
    const [navBg, setNavBg] = useState('bg-[#15151580] text-black');
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIshome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    let { logout, user } = useContext(AuthContext);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode])

    useEffect(() => {
        setIshome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname == '/login');
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (scrollPosition > 100) {
            if (isHome) {
                setNavBg('backdrop-filter backdrop-blur-xl dark:text-white text-black')
            } else {
                setNavBg('bg-white/90 dark:bg-black/90 dark:text-white text-black')
            }
        } else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent text-black dark:text-white dark:bg-black' : 'bg-white/90 dark:bg-black/90 text-black dark:text-white'}
            dark:text-white text-black`)
        }
    }, [scrollPosition]);

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
                logout().then(() => {
                    user = null;
                    Swal.fire({
                        title: "Logout!",
                        text: "You have been logged out successfully",
                        icon: "success"
                    });
                    navigate("/");
                }).catch((err) => Swal.fire("Error", err.message, "error"))
            }
        });
    }

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duation: 0.5 }}
            className={`${isHome ? navBg : "bg-white/90 dark:bg-black/90 backdrop-blur-2xl text-black dark:text-white"}
                            ${isFixed ? "static" : "fixed"} top-0 transition-colors text-black duration-500 ease-in-out w-full z-50`}>
            <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
                <div className='py-[10px] px-[10px] flex items-center justify-between'>
                    {/* logo */}
                    <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 pl-7 md:p-0 flex items-center '>
                        <div>
                            <h1 className='text-2xl flex font-bold gap-3 items-center justify-center'>StillnessInMotion
                                <img src='/logo.jpg' alt='' className='w-6 h-6' /></h1>
                            <p className='font-bold text-[13px] tracking-[8px]'>Flow Strength Balance</p>
                        </div>
                    </div>

                    {/* Mobile icons for menu */}
                    <div className='md:hidden flex items-center'>
                        <button onClick={() => toggleMobileMenu()} type='button' className='text-grey-300 hover:text-white focus:ouline-none'>
                            <FaBars className='h-6 w-6 hover:text-primary'></FaBars>
                        </button>
                    </div>

                    {/* navigation links */}
                    <div className='hidden md:flex text-black dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex space-x-4 items-center pr-4'>
                                {navbarLinks.map((link) => (
                                    <li key={link.route}>
                                        <NavLink
                                            to={link.route}
                                            style={{ whiteSpace: 'nowrap' }}
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}>
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}

                                {/* user check */}
                                {
                                    user ? null : isLogin ? (<li>
                                        <NavLink to={"/register"}
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}>
                                            Register</NavLink>
                                    </li>) : (<li>
                                        <NavLink to={"/login"}
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}>
                                            Login</NavLink>
                                    </li>
                                    )}
                                {
                                    user && <li><NavLink to={"/dashboard"} className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                            'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`}>Dashboard</NavLink></li>
                                }
                                {
                                    user && <li>
                                        <img src={photoUrl} alt="" className='h-[40px] rounded-full w-[40px]'></img>
                                    </li>
                                }
                                {

                                    user && <li> <NavLink onClick={handleLogout} className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}>
                                        Logout</NavLink>
                                    </li>

                                }
                                <li>
                                    {/* done using mui core material ui pckg */}
                                    <ThemeProvider theme={theme}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                            <h1 className='text-[8px] text-gray-450'>Light/Dark</h1>
                                        </div>

                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-black text-black dark:text-white absolute top-16 left-0 w-full shadow-lg">
                    <ul className="flex flex-col items-center space-y-2 py-4">
                        {navbarLinks.map((link) => (
                            <li key={link.route}>
                                <NavLink
                                    to={link.route}
                                    className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        {/* user check */}
                        {
                            user ? null : isLogin ? (<li>
                                <NavLink to={"/register"}
                                    className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Register</NavLink>
                            </li>) : (<li>
                                <NavLink to={"/login"}
                                    className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login</NavLink>
                            </li>
                            )}
                        {
                            user && <li><NavLink to={"/dashboard"} className={({ isActive }) =>
                                `font-bold ${isActive ? 'text-secondary' : 'text-black dark:text-white'} hover:text-secondary duration-300`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >Dashboard</NavLink></li>
                        }
                        {
                            user && <li>
                                <NavLink className={'font-bold px-3 py-2 bg-secondary text-white rounded-xl'}
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Logout</NavLink>
                            </li>
                        }
                        <li>
                            <ThemeProvider theme={theme}>
                                <div className='flex flex-col justify-center items-center'>
                                    <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                    <h1 className='text-[8px] text-gray-450'>Light/Dark</h1>
                                </div>
                            </ThemeProvider>
                        </li>
                    </ul>
                </div>
            )}
        </motion.nav>
    )
}

export default Navbar
