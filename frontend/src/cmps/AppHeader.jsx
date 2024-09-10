import { useLocation,NavLink} from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router'
import {useSelector} from 'react-redux'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImgUploader } from './ImgUploader.jsx'
import { StoryCreation } from './StoryCreation.jsx'
import { useState } from 'react'
import { userService } from '../services/user/index.js'
import  {GoHome} from "react-icons/go";
import  {GoHomeFill}  from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { BiSolidMoviePlay } from "react-icons/bi";











export function AppHeader() {

    const [isModalOpen, setIsModalOpan]= useState(false)
    const currentUser = useSelector(userState => userState.userModule.user)

    const location = useLocation()

    const isActive = (path) => location.pathname === path;

    function openModal(){
        setIsModalOpan(true)
    }

    function closeModal(){
        setIsModalOpan(false)
    }
    
    async function onLogout(){
        console.log("logout attempted ")
        await userService.logout()
    }
    return (
        <> 
        <div className='app-header' id='app-header'>
            <h1><img src="src/imgs/Logo.svg" alt="" /></h1>
            <div className='panel-link'>
            <NavLink to ={'/'} className="nav-link" >
                <span> Home <button> {isActive('/') ? <GoHomeFill size="2em"/> : <GoHome size="2em"/>}</button></span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={'/search'} className="nav-link">
                <span> Search <button> {isActive('/search') ? <IoSearch size="2em"/> : <IoSearchOutline size="2em"/>} </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'> 
            <NavLink to ={'/explore'} className="nav-link">
                <span>Explore <button> {isActive('/explore') ? <MdExplore size="2em"/> : <MdOutlineExplore size="2em"/>} </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'> 
            <NavLink to ={'/reels'} className="nav-link">
                <span>Reels <button> {isActive('/reels') ? <BiSolidMoviePlay size="2em"/> : <BiMoviePlay size="2em"/>} </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'> 
            <NavLink to ={'/direct'} className="nav-link">
                <span> Messages <button> {isActive('/direct') ? <RiSendPlaneFill size="2em"/> : <TbSend size="2em"/>} </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={'/notification'} className="nav-link">
                <span> Notifications <button> {isActive('/notification') ? <FaHeart size="1.8em"/> : <FaRegHeart size="1.8em"/>} </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={'/'}className="nav-link" onClick={openModal}>
                <span> Create <button> <AddBoxOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={currentUser._id} className="nav-link">
                <span> Profile <button> <img src={currentUser.imgUrl} alt="" /> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
                <NavLink to={"/login"} className="logout-btn">
                <span> Logout <button onClick={onLogout}></button> </span>
                </NavLink>

            </div>
            <StoryCreation isOpen ={isModalOpen} closeModal={closeModal}/>
        </div>
        </>
    )
}


