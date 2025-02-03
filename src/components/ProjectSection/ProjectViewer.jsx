import React from 'react'
import { motion } from 'framer-motion'
import ProjectCards from './ProjectCards'
import Project1 from '../../assets/Video_1.gif'
import Project2 from '../../assets/Video_2.gif'
import Project3 from '../../assets/Video_3.gif'
import Project4 from '../../assets/Video_4.gif'
import back from '../../assets/Projects_back.png'
const ProjectViewer = () => {
    let top = [12, 50, 30];
    let increase = [0, 35, 70, 105];
    let left = 12
    console.log(top);
    return (
        
        <div className='sticky flex h-screen items-center'>
            
            <div className='relative w-[90vw]'
                style={{
                    top: `${top[0]}%`,
                    left: `${left + increase[0]}%`
                }}
            >
                <ProjectCards project={Project1} date={"12/12/24"} />
            </div>
            <div className='relative w-[90vw] block'
                style={{
                    top: `${top[1]}%`,
                    left: `${left + increase[1]}%`
                }}
            >
                <ProjectCards project={Project2} date={"2/12/24"} />
            </div>
            <div className='relative'
                style={{
                    top: `${top[2]}%`,
                    left: `${left + increase[2]}%`
                }}
            >
                <ProjectCards project={Project3} date={"1/12/24"} />
            </div>
            <div className='relative'
                style={{
                    top: `${top[0]}%`,
                    left: `${left + increase[3]}%`
                }}
            >
                <ProjectCards project={Project4} date={"1/12/24"} />
            </div>
        </div>
    )
}

export default ProjectViewer