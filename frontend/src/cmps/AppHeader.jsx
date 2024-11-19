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
import { MessageIcon, MessageIconFull, NotificationIcon, NotificationIconFull, ReelsIcon, ReelsIconFull, SearchIcon, SearchIconFull, ExploreIcon, ExploreIconFull, CreateIcon, LogoutMenuIcon , LogoIcon} from './SVG.jsx';
import { logout } from "../store/user.actions.js"
import { Padding } from '@mui/icons-material';










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
                <h1><img src="src/imgs/Logo2.png" alt="" /> <LogoIcon/></h1>
                <div className='panel-link'>
                    <NavLink to={'/'} className="nav-link" >
                        <span> <span className='link-text'> Home </span> <button> {isActive('/') ? <HomeIconFull /> : <HomeIcon />}</button></span>
                    </NavLink>
                </div>
                <div className='panel-link temp'>
                    <NavLink to={'/search'} className="nav-link">
                        <span> <span className='link-text'> Search </span> <button> {isActive('/search') ? <SearchIconFull/> : <SearchIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/explore'} className="nav-link">
                        <span> <span className='link-text'> Explore </span> <button> {isActive('/explore') ? <ExploreIconFull/> : <ExploreIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/reels'} className="nav-link">
                        <span> <span className='link-text'> Reels </span> <button> {isActive('/reels') ? <ReelsIconFull /> : <ReelsIcon/>} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/direct'} className="nav-link">
                        <span> <span className='link-text'> Messages </span> <button> {isActive('/direct') ? <MessageIconFull /> : <MessageIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link temp'>
                    <NavLink to={'/notification'} className="nav-link">
                        <span> <span className='link-text'> Notifications </span>  <button> {isActive('/notification') ? <NotificationIconFull/> : <NotificationIcon />} </button> </span>
                    </NavLink>
                </div>
                <div className='panel-link'>
                    <NavLink to={'/'} className="nav-link" onClick={openModal}>
                        <span> <span className='link-text'> Create </span> <button> <CreateIcon /> </button> </span>
                    </NavLink>
                </div>
                {currentUser && <div className='panel-link'>
                   <NavLink to={currentUser._id} className="nav-link">
                        <span>  <span className='link-text'> Profile </span><button> <img src={currentUser.imgUrl} alt="" /> </button> </span>
                    </NavLink>
                </div>}
                <div className='panel-link temp'>
                    <NavLink to={"/login"} className="logout-btn nav-link" onClick={onLogout}>
                        <span> <span className='link-text'> Logout </span> <button ><LogoutMenuIcon/></button> </span>
                    </NavLink>

                </div>
                <StoryCreation isOpen={isModalOpen} closeModal={closeModal} />
            </div>
        </>
    )
}


