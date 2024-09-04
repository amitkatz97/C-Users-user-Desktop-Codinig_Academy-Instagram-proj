import { NavLink} from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions'
import { LoginSignup } from '../pages/LoginSignup.jsx'
import { storyService } from '../services/story.service.js'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImgUploader } from './ImgUploader.jsx'
import { StoryCreation } from './StoryCreation.jsx'
import { useState } from 'react'


// function onCreate(){
//     console.log('creation is active')
//     return (
//         <div><StoryCreation/></div>
//     )
// }



export function AppHeader() {

    const [isModalOpen, setIsModalOpan]= useState(false)
    const currentUser = useSelector(userState => userState.userModule.user)

    function openModal(){
        setIsModalOpan(true)
    }

    function closeModal(){
        setIsModalOpan(false)
    }
    return (
        <> 
        <div className='app-header'>
            <h1><img src="src/imgs/Logo.svg" alt="" /></h1>
            <div className='panel-link'>
            <div className='panel-link'>
            <NavLink to ={'/'} className="nav-link" activeclassname = "active">
                <span> Home <button> <HomeOutlinedIcon/> </button></span>
            </NavLink>
            </div>
            <NavLink to ={'/direct'} className="nav-link" activeclassname = "active">
                <span> Messages <button> <ChatOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'> 
            <NavLink to ={'/explore'} className="nav-link" activeclassname = "active">
                <span>Explore <button> <ExploreOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={'/search'} className="nav-link" activeclassname = "active">
                <span> Search <button> <SearchOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={'/notification'} className="nav-link" activeclassname = "active">
                <span> Notifications <button> <FavoriteBorderOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink className="nav-link" onClick={openModal}>
                <span> Create <button> <AddBoxOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div className='panel-link'>
            <NavLink to ={currentUser._id} className="nav-link" activeclassname = "active">
                <span> My Profile <button> <img src={currentUser.imgUrl} alt="" /> </button> </span>
            </NavLink>
            </div>
            {/* <div className='panel-link'>
                <NavLink to={"/login"} className="nav-link" activeclassname = "active">
                <span> Login <button></button> </span>
                </NavLink>

            </div> */}
            <StoryCreation isOpen ={isModalOpen} closeModal={closeModal}/>
           
        </div>
        </>
    )
}