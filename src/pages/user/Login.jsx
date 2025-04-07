import { useState } from 'react'
import { MdOutlineAlternateEmail, MdRemoveRedEye } from 'react-icons/md'
import GoogleLogin from '../../components/Social/GoogleLogin';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [validationError, setValidationError] = useState('');
  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setValidationError('');
    
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    
    if (!email || !password) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    
    setLoader(true); // Set loader to true when login starts
    login(email, password)

      .then(() => {
      setLoader(false); // Set loader to false after successful login
      navigate(location.state || '/dashboard'); 
    }).catch(err => {
      setError(err.code);
      setLoader(false); // Ensure loader is set to false on error
    });
  }

  return (
    <div className='mx-auto py-16'>
      <h1 className='text-4xl text-secondary text-center mb-8'>Get Started Today</h1>
      <p className='text-gray-400 text-sm text-center w-[30%] mx-auto mb-8'>Explore our comprehensive library of courses,
        meticulously crafted to crafted to cater to all levels of expertise</p>
      <div className='text-center p-8 mx-auto my-2'>
        <form onSubmit={handleSubmit} className='space-y-4 border-0 mx-auto'>
          <p className='text-red-400 text-xl my-2'>Sign into your account</p>
          {validationError && (
            <p className="text-red-500 text-sm mb-4">{validationError}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error === 'auth/user-not-found' 
                ? 'User not found' 
                : error === 'auth/wrong-password'
                ? 'Incorrect password'
                : 'Login failed'}
            </p>
          )}
          <div className='relative'>
            <input type='email' placeholder='Enter Email' name='email' className='border p-2 w-full rounded-lg'></input>
            <span className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <MdOutlineAlternateEmail className='h-4 w-4 text-gray-400' /></span>
          </div>
          <div className='relative'>
            <input type={showPass ? 'text' : 'password'} placeholder='Enter Password' name='password' className='border p-2 w-full rounded-lg'></input>
            <span onClick={() => setShowPass(!showPass)} className='absolute inset-y-0 end-0 grid place-content-center px-4'>
              <MdRemoveRedEye className='h-4 w-4 text-gray-400' /></span>
          </div>
          <button className='bg-secondary border w-full cursor-pointer p-2 rounded-lg'>Sign in</button>
          <p>No account?<a href='/register' className='pointer-cursor underline'> Sign Up</a></p>
          <GoogleLogin />
        </form>
      </div>
    </div>
  )
}

export default Login
