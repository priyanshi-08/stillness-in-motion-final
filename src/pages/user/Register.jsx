import { useForm } from 'react-hook-form'
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from 'react-icons/ai'
import { IoLocationOutline } from "react-icons/io5";
import GoogleLogin from '../../components/Social/GoogleLogin';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import axios from 'axios';
const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { signUp, updateUser, setError } = useContext(AuthContext);
    
    const onSubmit = (data) => {
        setError("");
        signUp(data.email, data.password).then((result) => {
            const user = result.user;
            if(user){
               return updateUser(data.name, data.photourl).then(() => {
                const userImp ={
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    role: 'user',
                    gender: data.gender,
                    phone: data.phone,
                    address: data.address
                };
                
                if(user.email && user.displayName){
                    return axios.post('https://stillness-in-motion-server.onrender.com/new-user', userImp).then(() => {
                        setError("");
                        navigate('/');
                        return "Registration Successful";
                    }).catch(err => {
                        throw new Error(err)});
                }
               }).catch(err => {
                setError(err);
                throw new Error(err);
               })
            }
        });
    };
    
    const password = watch('password', "");
    return (
        <div className='flex items-center justify-center pt-14 bg-gray-300' >
            <div className='bg-white p-8 rounded-lg shadow-md my-8'>
                <h2 className='text-center font-bold text-3xl mb-6 '>Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineUser className='inline-block mr-2 text-lg' />
                                Name
                            </label>
                            <input type='text' className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Enter your name'
                                {...register("name", { required: true })}></input>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineMail className='inline-block mr-2 text-lg' />
                                Email
                            </label>
                            <input type='email' className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Enter your email'
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid email address"
                                    }
                                })}></input>
                                {errors.email && (
                                    <div className='text-red-500 text-sm w-full mt-1'>
                                        <p>{errors.email.message}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineLock className='inline-block mr-2 text-lg' />
                                Password
                            </label>
                            <input type='password' name= "password" className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Enter your password'
                                {...register("password", { required: true})}></input>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='password2' className='block text-gray-700 font-bold mb-2'>
                                <AiOutlineLock className='inline-block mr-2 text-lg' />
                                Confirm Password
                            </label>
                            <input type='password' className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Re-enter your password'
                                {...register("password2", { required: true, validate: (value) => value === password || "password doesn't match!"})}></input>
                                {/* validate: (value) => value === password || "password does not match!!" */}
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor='phone' className='block text-gray-700 font-bold mb-2'>
                                <AiOutlinePhone className='inline-block mr-2 text-lg' />
                                Phone Number
                            </label>
                            <input type='tel' name='phone' className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Enter your phone Number' maxLength={10} 
                                {...register("phone", { 
                                    required: true,
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Please enter exactly 10 digits"
                                    },
                                    validate: {
                                        isNumber: (value) => !isNaN(value) || "Phone number must contain only numbers"
                                    }
                                })}></input>
                                {errors.phone && (
                                    <div className='text-red-500 text-sm w-full mt-1'>
                                        <p>{errors.phone.message}</p>
                                    </div>
                                )}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='photourl' className='block text-gray-700 font-bold mb-2'>
                                <AiOutlinePicture className='inline-block mr-2 text-lg' />
                                Photo URL
                            </label>
                            <input type='url' className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Photo URL'
                                {...register("photourl")}></input>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='gender' className='block text-gray-700 font-bold mb-2'>
                            <AiOutlineUser className='inline-block mr-2 text-lg' />
                            Gender
                        </label>
                        <select className='w-full border-gray-300 border rounded-md py-2 px-4 
                            focus:outline-none focus:ring focus:border-blue-300'
                            {...register("gender", { required: true })}>
                            <option value="" disabled selected className='text-gray-400'>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='address' className='block text-gray-700 font-bold mb-2'>
                            <IoLocationOutline className='inline-block mr-2 text-lg' />
                            Address
                        </label>
                        <textarea rows='5' className='w-full border-gray-300 border rounded-md py-1 px-4 
                            focus:outline-none focus:ring focus:border-blue-300' placeholder='Tell us about yourself... '
                            {...register("address", { required: true })}>
                        </textarea>
                    </div>
                    <div className='mb-4 text-center my-2'>
                        <button type='submit' className='bg-secondary  p-2 rounded-lg hover:bg-green-500'>Register</button>
                        {
                            errors.password2 && (
                                <div className='text-red-500 text-sm w-full mt-1'>
                                    <p>{errors.password2.message}</p>
                                </div>
                            )
                        }
                    </div>
                </form>
                <p className='text-center mt-4'>Already have Account?
                 <a href='/login' className='underline cursor-poiner hover:text-secondary'>Login</a></p>
                <GoogleLogin/>
            </div>
        </div>

    )
}

export default Register
