import React from 'react'
const ProjectCards = (props) => {

    return (
        <div className='w-[30vw]'>
            <img src={props.project} alt="" style={{
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px'
            }} />
            <div
                className='bg-red-800 flex justify-between items-center pl-3 pr-3 pt-1 pb-1'
                style={{
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                }}
            >
                <span className='text-white text-xs'>Made by Khawaja Fashi</span>
                <span className='text-white text-xs'>{props.date}</span>
            </div>
        </div>
    )
}

export default ProjectCards