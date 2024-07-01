import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions'
import { LoginSignup } from './LoginSignup.jsx'
import { storyService } from '../services/story.service.js'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';


export function AppHeader() {
    return (
        <> 
        <div className='app-header'>
            <h1>SociatyGram</h1>
            <Link to ={'/direct'}>
                <button> <ChatIcon/></button>
            </Link>
            <Link to ={'/'}>
                <button> <HomeIcon/> </button>
            </Link>
            <Link to ={'/explore'}>
                <button> <ExploreIcon/> </button>
            </Link>
        </div>
        </>
    )
}