import React from 'react'
import { createBrowserRouter, NavLink } from 'react-router-dom'
import Home from './Home'
import KF_logo from '../../assets/KF_logo.jpg'
import { IconContext } from "react-icons";
import { IoFolderOpen } from "react-icons/io5";


const NavBar = () => {
    // const router = createBrowserRouter(
    //     [
    //         {
    //             path: '/',
    //             component: <Home/>,
    //         },
    //         {
    //             path: '/about',
    //             component: About,
    //         },
    //         {
    //             path: '/skills',
    //             component: Skills,
    //         },
    //         {
    //             path: '/projects',
    //             component: Projects,
    //         },
    //         {
    //             path: '/contact',
    //             component: Contact,
    //         },
    //     ]
    // )

    return (
        <div className='flex justify-start items-start h-24 absolute top-0 left-0 w-full overflow-hidden p-4'>
            <ul className='flex justify-between items-center w-full h-full overflow-hidden'>
                <li className='' >
                    {/* <NavLink to="/"></NavLink> */}
                    <img src={KF_logo} alt="Logo" className='h-full flex justify-start items-start' style={{
                        width: "100px",
                    }} />
                </li>
                <li>
                    {/* <NavLink to="/"></NavLink> */}
                    <span>Khawaja Fashi</span>
                </li>
                <div className='flex flex-col justify-center items-center relative' style={{top: "7.5rem"}}>
                    <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <button className='h-16'>
                            <IoFolderOpen />
                        </button>
                    </IconContext.Provider>
                    <li
                        className='flex flex-col justify-center items-center'>
                        <a
                            className='p-3 text-black'
                            style={{
                                transform: "rotate(5deg)"
                            }}
                        >Home</a>
                        <a
                            className='p-3 text-black'
                            style={{
                                transform: "rotate(-12deg)"
                            }}
                        >About</a>
                        <a
                            className='p-3 text-black'
                            style={{
                                transform: "rotate(9deg)"
                            }}
                        >Skills</a>
                        <a
                            className='p-3 text-black'
                            style={{
                                transform: "rotate(-12deg)"
                            }}
                        >Projects</a>
                        <a
                            className='p-3 text-black'
                            style={{
                                transform: "rotate(9deg)"
                            }}
                        >Contact</a>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default NavBar