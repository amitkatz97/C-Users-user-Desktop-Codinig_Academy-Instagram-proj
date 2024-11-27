import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Loader from './Loader'
import { utilService } from '../services/util.service'
import { UserMiniCard } from './UserMiniCard'
import { socketService, SOCKET_EVENT_STORY_LIKED } from '../services/socket.service.js'
import { NotificationCard } from './NotificationCard.jsx'




export function NotificationDialog({ isNotificationOpen, closeNotification, notificationPosition, notificationWidth }) {

    const [noticationList, setNotificationList] = useState([])


    useEffect(() => {
        socketService.on(SOCKET_EVENT_STORY_LIKED, (story) => {
            const { loggedinUser, updateStory } = story
            const newNotification = { id: utilService.makeId(), by: loggedinUser, story: updateStory }
            setNotificationList([...noticationList, newNotification])
            console.log("Your story being liked!", story)
            console.log("notificationList:", noticationList)

            return () => {
                socketService.off(SOCKET_EVENT_STORY_LIKED)
            }
        })
    }, [noticationList])




    return (
        <div className='notification-dialog'>
            {isNotificationOpen && (
                <div className="dialog" style={{ transform: notificationPosition, width: notificationWidth }}>
                    <h2>Notifications</h2>
                    {noticationList.length > 0 ? (
                        <ul>
                            {noticationList.map((note) => (
                                <li key={utilService.makeId()}>
                                    <NotificationCard by={note.by} story={note.story} />
                                </li>

                            ))}
                        </ul>
                    ) : (<div className='no-notification'>You dont have new notifications</div>)}

                </div>
            )}
        </div>
    )


}