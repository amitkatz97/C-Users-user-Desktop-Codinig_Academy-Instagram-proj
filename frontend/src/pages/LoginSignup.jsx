import { useState, useEffect } from 'react'
import { userService } from '../services/user/index.js'
import { ImgUploader } from '../cmps/ImgUploader'
import { useSelector } from "react-redux"
import {useNavigate, Outlet} from "react-router-dom"
import { login , signup } from "../store/user.actions.js"
import {showErrorMsg} from "../services/event-bus.service.js"
import { loadUsers } from '../store/user.actions.js'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    // const [users, setUsers] = useState([])
    const users = useSelector(userState => userState.userModule.users)

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
        document.getElementById("app-header").style.display = 'none'
    }, [])

    // async function loadUsers() {
    //     const users = await userService.getUsers()
    //     console.log(users)
    //     setUsers(users)
    // }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        console.log("login")
        try {
            if (ev) ev.preventDefault()
            if (credentials.fullname === "") {
                showErrorMsg("Enter Username")
                return}
            login(credentials)
            document.getElementById("app-header").style.display = 'flex'
            clearState()
            navigate("/")
        } catch (err) {
            console.log("Cant logged in , Some credentials are missing", err)
        }
    }

    function onSignup(ev = null) {
       try {
         if (ev) ev.preventDefault()
         if (!credentials.username || !credentials.password || !credentials.fullname) return
         signup(credentials)
         clearState()
         navigate("/")
       } catch (err) {
            console.log("Cant sigend up:", err)
       }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    const loginImgs =[
        'src\imgs\LoginImg.JPG',
        "src\imgs\LoginImg2.JPG",

    ]

    return (
        <div className="login-page">
            {/* <LoginImg images={loginImgs} interval={3000}/> */}
            <img src="src\imgs\LoginImg.JPG" alt="" />
            <div className='all-forms'>
                <img src="src/imgs/Logo.svg" alt="" />
            {!isSignup && <form className="login-form" onSubmit={onLogin}>
                <select
                    name="fullname"
                    value={credentials.fullname}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                </select>
                {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
                <button>Login</button>
            </form>}
            <div className="signup-section">
                {isSignup && <form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <ImgUploader onUploaded={onUploaded} />
                    <button>Signup</button>
                </form>}
                <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}