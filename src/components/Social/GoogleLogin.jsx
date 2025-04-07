import {FcGoogle} from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {

    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const handleLogin = () => {
        googleLogin()
        .then((userCredential) => {
            const user = userCredential.user;
            
            if(user) {
                const userImp = {
                    name: user?.displayName,
                    email: user?.email,
                    age: 'not defined',
                    photo: user?.photoURL, 
                    role: 'user',
                    gender: 'not defined',
                    about: 'not defined',
                    skills: 'not defined'
                };

                if(user.displayName && user.email){
                    return axios.post('https://stillness-in-motion-server.onrender.com/new-user', userImp).then(() => {
                        navigate('/');
                        return 'Registration Successful'
                    }).catch(error =>{
                        throw new Error(error)
                    });
                }
            }

            
        }).catch(error => console.log(error.message));
    }; 

  return (
    <div className='flex items-center justify-center'>
        <button onClick={() => handleLogin()} type='button'
        className='flex items-center border bg-white text-center text-gray-800 shadow-md text-sm 
        rounded-lg hover:bg-gray-300 cursor-pointer px-6 py-4 font-medium outline-none focus:outline-none my-2'>
        <FcGoogle className='mx-1 h-6 w-6'/>Continue with Google
        </button>
    </div>
  )
}

export default GoogleLogin