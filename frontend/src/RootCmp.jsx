import React from 'react'
import { Routes, Route , HashRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { MessagePage } from "./pages/MessagePage"
import { ConverstaionPage}  from "./pages/ConverstaionPage"
import { ExplorePage } from "./pages/ExplorePage"
import { StoryDetails } from './cmps/StoryDetails'
import { UpperMobileBar } from './pages/UpperMobileBar'



import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StoryCreation } from './cmps/StoryCreation'
import { LoginSignup } from './pages/LoginSignup'

export function RootCmp() {
    return (
        <Router>
            <div className='main-app'>
                <AppHeader />
                    <main className='container'>
                        <Routes>
                            <Route path='/home' element ={<HomePage/>}>
                                <Route path='/home/:storyId' element = {<StoryDetails/>}/>
                            </Route>
                            <Route path='/:userId' element = {<ProfilePage/>}>
                                <Route  path='/:userId/:storyId' element = {<StoryDetails/>}/>
                            </Route>
                            <Route path='/direct' element ={<MessagePage/>}>
                                <Route path='/direct/:convid' element ={<ConverstaionPage/>}/>
                            </Route>
                            <Route path='/explore' element= {<ExplorePage />}>
                                <Route path='/explore/:storyId' element = {<StoryDetails/>}/>
                            </Route>
                            <Route path='/' element= {<LoginSignup/>}/>
                        </Routes>
                    </main>
                <div className='upper-mobile-bar'><UpperMobileBar/></div>
            </div>
        </Router>
    )
}


