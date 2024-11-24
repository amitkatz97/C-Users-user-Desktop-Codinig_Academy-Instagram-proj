import { useState, useEffect } from 'react'
import { userService } from '../services/user/index.js'
import { ImgUploader } from '../cmps/ImgUploader'
import { useSelector } from "react-redux"
import {useNavigate, Outlet} from "react-router-dom"
import { login , signup } from "../store/user.actions.js"
import {showErrorMsg} from "../services/event-bus.service.js"
import { loadUsers } from '../store/user.actions.js'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' , imgUrl: ''})
    const [isSignup, setIsSignup] = useState(false)
    const users = useSelector(userState => userState.userModule.users)

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
        document.getElementById("app-header").style.display = 'none'
    }, [])


    function clearState() {
        setCredentials({ username: '', password: '', fullname: ''})
        setIsSignup(false)
    }

    function handleChange(ev) {
        console.log("ev target:",ev.target.img)
        const field = ev.target.name
        const value = ev.target.value
        const img = ev.target.img
        
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev = null) {
        console.log("login")
        try {
            if (ev) ev.preventDefault()
            if (credentials.fullname === "") {
                showErrorMsg("Enter Username")
                return}
            await login(credentials)
            document.getElementById("app-header").style.display = 'flex'
            clearState()
            navigate("/home")
        } catch (err) {
            console.log("Cant logged in , Some credentials are missing", err)
        }
    }

    async function onSignup(ev = null) {
       try {
         if (ev) ev.preventDefault()
         if (!credentials.username || !credentials.password || !credentials.fullname) return
         await signup(credentials)
         document.getElementById("app-header").style.display = 'flex'
         clearState()
         navigate("/home")
       } catch (err) {
            console.log("Cant sigend up:", err)
       }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl: imgUrl })
    }


    return (
        <div className="login-page">
            {/* <LoginImg images={loginImgs} interval={3000}/> */}
            <img className='main-picture' src="/imgs/LoginImg.JPG" alt="" />
            <div className='all-forms'>
                <img src="/imgs/Logo2.png" alt="" />
            {!isSignup &&<form className="login-form" onSubmit={onLogin}>
                <select
                    name="fullname"
                    value={credentials.fullname}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username} img ={user.ImgUrl}>{user.fullname}</option>)}
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
                <button>Log in</button>
            </form>}
            {!isSignup &&<div className='password'>Forgot password? </div>}
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
                    <button className="btn-link" >Sign Up</button>
                </form>}
                <p>
                {!isSignup &&<span>Don't have an account? <button className="btn-link" onClick={toggleSignup}>Sign Up</button></span>}
                {isSignup &&  <button  onClick={toggleSignup}>Back</button>}
                </p>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}