import React from 'react'
import bgImg from '../../../assets/home/Banner2.jpg'
import { useNavigate } from 'react-router-dom'

const Hero2 = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${bgImg})` }}>
            <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
                <div>
                    <div className='space-y-4'>
                        <p className='md:text-4xl text:2xl'>Best Online</p>
                        <h1 className='md:text-7xl text:4xl font-bold'>Classes From Home</h1>
                        <div className='w-[800px]'>
                            <p className='text-justify'>Experience the ancient art of Tai Chi without stepping outside.
                                Our virtual classes bring expert guidance straight to your living room.
                                Perfect for all levels — no fancy equipment or big spaces needed.
                                Improve balance, reduce stress, and boost energy with gentle movements.
                                Enjoy flexible schedules and practice at your own pace.
                                Stay active, centered, and connected — all from home.</p>
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

export default Hero2