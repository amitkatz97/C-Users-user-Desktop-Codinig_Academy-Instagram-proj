import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Loader from './Loader'
import { utilService } from '../services/util.service'
import { UserMiniCard } from './UserMiniCard'
import { socketService, SOCKET_EVENT_STORY_LIKED, SOCKET_EVENT_STORY_COMMENT, SOCKET_EVENT_USER_FOLLOW } from '../services/socket.service.js'
import { NotificationCard } from './NotificationCard.jsx'




export function NotificationDialog({ isNotificationOpen, closeNotification, notificationPosition, notificationWidth }) {

    const [likedList, setLikedList] = useState([])
    const [newFollowersList, setNewFollowerList] = useState([])


    useEffect(() => {
        socketService.on(SOCKET_EVENT_STORY_LIKED, (story) => {
            const { loggedinUser, updateStory } = story
            console.log("logged in user from socket:", loggedinUser)
            const newNotification = { id: utilService.makeId(), by: loggedinUser, story: updateStory, likedBy : true}
            setLikedList([...likedList, newNotification])
            return () => {
                socketService.off(SOCKET_EVENT_STORY_LIKED)
            }
        })

        socketService.on(SOCKET_EVENT_STORY_COMMENT, (story)=> {
            const { loggedinUser, updateStory } = story
            console.log("logged in user from socket:", loggedinUser)
            const newNotification = { id: utilService.makeId(), by: loggedinUser, story: updateStory ,likedBy: false}
            setLikedList([...likedList, newNotification])
            return () => {
                socketService.off(SOCKET_EVENT_STORY_COMMENT)
            }
        })

        socketService.on(SOCKET_EVENT_USER_FOLLOW, (user)=> {
            console.log("user from notification dialog",user)
            const { fullname, userId } = user
            const newNotification = { id: utilService.makeId(), by: user }
            setNewFollowerList([...newFollowersList, newNotification])
            return () => {
                socketService.off(SOCKET_EVENT_USER_FOLLOW)
            }
        })

    }, [likedList, newFollowersList])




    return (
        <div className='notification-dialog'>
            {isNotificationOpen && (
                <div className="dialog" style={{ transform: notificationPosition, width: notificationWidth }}>
                    <h2>Notifications</h2>
                    {likedList.length || newFollowersList.length > 0 ? (
                        <ul>
                            {likedList.map((note) => (
                                <li key={utilService.makeId()} onClick={closeNotification}>
                                    <NotificationCard by={note.by} story={note.story} likedBy = {note.likedBy}/>
                                </li>

                            ))}
                            {newFollowersList.map((note) => (
                                <li key={utilService.makeId()} onClick={closeNotification}>
                                    <NotificationCard by={note.by}/>
                                </li>

                            ))}

                        </ul>
                    ) : (<div className='no-notification'>You dont have new notifications</div>)}

                </div>
            )}
        </div>
    )


}