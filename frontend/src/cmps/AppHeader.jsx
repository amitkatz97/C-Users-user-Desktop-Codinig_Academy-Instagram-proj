import { useLocation, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StoryCreation } from './StoryCreation.jsx'
import { useState , useEffect} from 'react'
import { HomeIconFull } from "./SVG.jsx"
import { HomeIcon } from "./SVG.jsx"
import { MessageIcon, MessageIconFull, NotificationIcon, NotificationIconFull, ReelsIcon, ReelsIconFull, SearchIcon, SearchIconFull, ExploreIcon, ExploreIconFull, CreateIcon, LogoutMenuIcon , LogoIcon} from './SVG.jsx';
import { logout } from "../store/user.actions.js"
import { Padding } from '@mui/icons-material';
import { SearchDialog } from './SearchDialog.jsx';
import { useParams } from 'react-router-dom'










export function AppHeader() {

    const [isModalOpen, setIsModalOpan] = useState(false)
    const currentUser = useSelector(userState => userState.userModule.user)

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogPosition, setDialogPosition] = useState('translateX(-5%)')
    const [dialogWidth, setDialogWidth] = useState('50px')


    useEffect(() => {
        if (isDialogOpen) {
            setDialogPosition('translateX(0)')
            setDialogWidth('400px')
        }
    }, [isDialogOpen]);


    const location = useLocation()

    const isActive = (path) => location.pathname === path;

    function openModal() {
        setIsModalOpan(true)
    }

    function closeModal() {
        setIsModalOpan(false)
    }

    function openDialog(){
        setIsDialogOpen(!isDialogOpen)
    }

    async function closeDialog() {
        try {
            setDialogPosition('translateX(-5%)');
            setDialogWidth('50px')
        } catch (error) {
            console.log("cant close dialog", error)
        } finally {
            setTimeout(() => {
                setIsDialogOpen(false)
            }, 420);
        }

    }

    function onLogout() {
        console.log("logout attempted ")
        logout()
    }

    return (
        <>
            <div className='app-header' id='app-header'>
            {!isDialogOpen ?(<h1 className='Logo'> <img src="/imgs/Logo2.png" alt="" /> <LogoIcon/></h1>):(<h1 className='Logo2'><LogoIcon/></h1>)}
                <div className='panel-link'>
                    <NavLink to={'/home'} className="nav-link" >
                        <span> <span className='link-text'> Home </span> <button> {isActive('/home') ? <HomeIconFull /> : <HomeIcon />}</button></span>
                    </NavLink>
                </div>
                <div className='panel-link temp'>
                    <NavLink className="nav-link" onClick={!isDialogOpen ?openDialog : closeDialog}>
                        <span> <span className='link-text'> Search </span> <button> {isActive(isDialogOpen) ? <SearchIconFull/> : <SearchIcon />} </button> </span>
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
                    <NavLink className="nav-link" onClick={openModal}>
                        <span> <span className='link-text'> Create </span> <button> <CreateIcon /> </button> </span>
                    </NavLink>
                </div>
                {currentUser && <div className='panel-link'>
                   <NavLink to={currentUser._id} className="nav-link">
                        <span>  <span className='link-text'> Profile </span><button> <img src={currentUser.imgUrl} alt="" /> </button> </span>
                    </NavLink>
                </div>}
                <div className='panel-link temp'>
                    <NavLink to={"/"} className="logout-btn nav-link" onClick={onLogout}>
                        <span> <span className='link-text'> Logout </span> <button ><LogoutMenuIcon/></button> </span>
                    </NavLink>

                </div>
                <StoryCreation isOpen={isModalOpen} closeModal={closeModal} />
                <SearchDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} dialogPosition= {dialogPosition} dialogWidth={dialogWidth}/>
            </div>
        </>
    )
}


