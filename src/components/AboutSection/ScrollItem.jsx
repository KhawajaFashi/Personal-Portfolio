import React from 'react'
import h_slider1 from '../../assets/Story_img.png'
const ScrollItem = () => {
    return (
        <div className='flex h-screen w-[98.7vw] p-12 pt-32 gap-9'>
            <img src={h_slider1} alt="" className='w-7/12 h-5/6'/>
            <div className='flex flex-col justify-start items-start gap-10 pl-10'>
                <h1 className='text-7xl'>My Story</h1>
                <p className='text-xl w-[90%] text-left'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia pariatur, vero atque distinctio fugiat quas quod quos quam nam est, maxime rerum quidem, magnam molestias quae debitis error iste. Quaerat qui ullam perferendis eaque minus nulla, corrupti corporis asperiores quibusdam et nostrum a eveniet ut.</p>
                <button className='bg-purple-800 text-white'>See the Full Story</button>
            </div>
        </div>
    )
}

export default ScrollItem