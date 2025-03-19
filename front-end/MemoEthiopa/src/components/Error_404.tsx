import React from 'react';
import img_400 from "../assets/404.png"
import Ethio_logo from "../assets/MemoEthio_logo_4.png"
import { Link } from 'react-router';
const Error404: React.FC = () => {
    return (
        <>
        <div className=' fixed'><Link to={"/"}> <img src={Ethio_logo} onDragStart={e => e.preventDefault()}  alt="" className='h-20 w-20' /></Link></div>
        <div className='flex justify-center text-white'>
            <div className="">
            <img src={img_400} alt="" onDragStart={e => e.preventDefault()} />
            <div className="text-center">
            <h1>404</h1>
            <p>Page Not Found</p>
            <button className='p-1 cursor-default m-3 text-blue-600 underline '><Link className='cursor-default' to={"/"} >Home</Link></button>
            </div>
            </div>
        </div>
        </>
    );
};

export default Error404;