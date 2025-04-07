import React from 'react'
import p1 from '../../../assets/gallery/Image1.jpg'
import p2 from '../../../assets/gallery/Image2.jpg'

const Gallary = () => {
  return (
    <div className='md:w-[80%] mx-auto my-28'>
      <div className='mb-16'>
        <h1 className='text-center text-5xl font-bold dark:text-white'>Our Gallary</h1>
      </div>
      {/* gallery imgs */}
      <div className='md:grid grid-cols-2 items-center justify-center gap-4'>
        <div className='mb-4 md:mb-0 '>
          <img src={p1} alt='' className='w-full md:h-[720px] mx-auto'></img>
        </div>
        <div className='grid gap-4 grid-cols-2'>
          <div> <img src={p2} alt='' className='md:h-[350px]'/></div>
          <div> <img src={p2} alt='' className='md:h-[350px]'/></div>
          <div> <img src={p2} alt='' className='md:h-[350px]'/></div>
          <div> <img src={p2} alt='' className='md:h-[350px]'/></div>
        </div>
      </div>
    </div>
    
  )
}

export default Gallary