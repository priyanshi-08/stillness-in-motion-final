import React from 'react'
import bgImg from '../../../assets/home/Banner1.jpg'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
        <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
            <div>
                <div className='space-y-4'>
                    <p className='md:text-4xl text:2xl'>We provide</p>
                    <h1 className='md:text-7xl text:4xl font-bold'>Best Tai Chi Classes Online</h1>
                    <div className='w-[800px]'>
                        <p className='text-justify'>Join our Tai Chi classes to improve your balance, reduce stress, and strengthen your mind-body connection.
                         Whether you're a beginner or experienced, our gentle, flowing movements help you find calm, build focus, and enhance overall wellness.
                        Step into a peaceful practice that brings harmony to your daily life. Whether you're a beginner or looking to deepen your practice, our sessions are designed to improve balance, reduce stress, and enhance your overall well-being.
                        Join us to experience the gentle power of Tai Chi and reconnect with your body and mind.</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-5'>
                        <button onClick={() => navigate("/register")} className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button>
                        <button onClick={() => navigate("/classes")} className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Courses</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero