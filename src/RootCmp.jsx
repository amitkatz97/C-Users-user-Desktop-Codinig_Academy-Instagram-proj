import React from 'react'
import { Routes, Route , HashRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { MessagePage } from "./pages/MessagePage"
import { ConverstaionPage}  from "./pages/ConverstaionPage"
import { ExplorePage } from "./pages/ExplorePage"



import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

export function RootCmp() {
    return (
        <Router>
            <div className='main-app'>
                <AppHeader />
                    <main className='container'>
                        <Routes>
                            <Route path='/' element ={<HomePage/>}/>
                            <Route path='/:userId' element = {<ProfilePage/>}/>
                            <Route path='/direct' element ={<MessagePage/>}>
                                <Route path='/direct/:convid' element ={<ConverstaionPage/>}/>
                            </Route>
                            <Route path='/explore' element= {<ExplorePage />}/>
                        </Routes>
                    </main>
            </div>
        </Router>
    )
}


