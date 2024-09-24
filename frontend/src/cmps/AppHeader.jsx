import { useLocation, NavLink } from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImgUploader } from './ImgUploader.jsx'
import { StoryCreation } from './StoryCreation.jsx'
import { useState } from 'react'
import { userService } from '../services/user/index.js'
import { HomeIconFull } from "./SVG.jsx"
import { HomeIcon } from "./SVG.jsx"
import { MessageIcon, MessageIconFull, NotificationIcon, NotificationIconFull, ReelsIcon, ReelsIconFull, SearchIcon, SearchIconFull, ExploreIcon, ExploreIconFull, CreateIcon } from './SVG.jsx';
import { logout } from "../store/user.actions.js"










export function AppHeader() {

    const [isModalOpen, setIsModalOpan] = useState(false)
    const currentUser = useSelector(userState => userState.userModule.user)

    const location = useLocation()

    const isActive = (path) => location.pathname === path;

    function openModal() {
        setIsModalOpan(true)
    }

    function closeModal() {
        setIsModalOpan(false)
    }

    function onLogout() {
        console.log("logout attempted ")
        logout()
    }
    return (
        <>
            <div className='app-header' id='app-header'>
                <h1><img src="src/imgs/Logo.svg" alt="" /></h1>
                <div className='panel-link'>
                    <NavLink to={'/'} className="nav-link" >
                        <span> Home <button> {isActive('/') ? <HomeIconFull /> : <HomeIcon />}</button></span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/search'} className="nav-link">
                        <span> Search <button> {isActive('/search') ? <SearchIconFull/> : <SearchIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/explore'} className="nav-link">
                        <span>Explore <button> {isActive('/explore') ? <ExploreIconFull/> : <ExploreIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/reels'} className="nav-link">
                        <span>Reels <button> {isActive('/reels') ? <ReelsIconFull /> : <ReelsIcon/>} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/direct'} className="nav-link">
                        <span> Messages <button> {isActive('/direct') ? <MessageIconFull /> : <MessageIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/notification'} className="nav-link">
                        <span> Notifications <button> {isActive('/notification') ? <NotificationIconFull/> : <NotificationIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/'} className="nav-link" onClick={openModal}>
                        <span> Create <button> <CreateIcon /> </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={currentUser._id} className="nav-link">
                        <span> Profile <button> <img src={currentUser.imgUrl} alt="" /> </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={"/login"} className="logout-btn">
                        <span> Logout <button onClick={onLogout}></button> </span>
                    </NavLink>

                </div>
                <StoryCreation isOpen={isModalOpen} closeModal={closeModal} />
            </div>
        </>
    )
}


