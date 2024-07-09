import { NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions'
import { LoginSignup } from './LoginSignup.jsx'
import { storyService } from '../services/story.service.js'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';



export function AppHeader() {
    return (
        <> 
        <div className='app-header'>
            <h1>SociatyGram</h1>
            <div>
            <NavLink to ={'/direct'} className="nav-link" activeClassName = "active">
                <span> Messages <button> <ChatIcon/> </button> </span>
            </NavLink>
            </div>
            <div>
            <NavLink to ={'/'} className="nav-link" activeClassName = "active">
                <span> Home <button> <HomeIcon/> </button></span>
            </NavLink>
            </div>
            <div>
            <NavLink to ={'/explore'} className="nav-link" activeClassName = "active">
                <span>Explore <button> <ExploreIcon/> </button> </span>
            </NavLink>
            </div>
            <div>
            <NavLink to ={'/'} className="nav-link" activeClassName = "active">
                <span> Search <button> <SearchOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div>
            <NavLink to ={'/'} className="nav-link" activeClassName = "active">
                <span> Notifications <button> <FavoriteBorderOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div>
            <NavLink to ={'/'} className="nav-link" activeClassName = "active">
                <span> Create <button> <AddCircleOutlineOutlinedIcon/> </button> </span>
            </NavLink>
            </div>
            <div>
            <NavLink to ={'/'} className="nav-link" activeClassName = "active">
                <span> My Profile <button> Picture </button> </span>
            </NavLink>
            </div>
        </div>
        </>
    )
}