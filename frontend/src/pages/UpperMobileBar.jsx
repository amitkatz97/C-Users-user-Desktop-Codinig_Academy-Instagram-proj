import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NotificationIcon, NotificationIconFull, LogoIcon } from '../cmps/SVG.jsx';




export function UpperMobileBar(){
    

    return(
        <div className="upper-bar-content">
            <div className="Logo"><LogoIcon/></div>
            <div className="search"></div>
        </div>
    )
}