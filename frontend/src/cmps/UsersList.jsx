import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "./Loader"
import { UserMiniCard } from "./UserMiniCard.jsx"
import { userService } from "../services/user/index.js"


export function UserList({ user }) {
    // const currUser = useSelector(userState => userState.userModule.user)
    // const users = useSelector(userState => userState.userModule.users)

    const [unfollowUserList, setUnfollowUserList]= useState()

    useEffect(() => {
        console.log("User list is rendering")
        getUnfollowUsers()
    }, [user])

    async function getUnfollowUsers(){
        const users = await userService.getUsersByFollowing(user._id)
        console.log(users)
        // console.log(users.length)
        const randomUsers = shuffleArray([...users]).slice(0, 6)
        setUnfollowUserList(randomUsers)
    }

    const shuffleArray = (users) => {
        for (let i = users.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [users[i], users[j]] = [users[j], users[i]];
        }
        return users;
    }

    



    if (!unfollowUserList) return <div><Loader /></div>
    return (
        <>
            <div className="Logged-in-user-info">
                <UserMiniCard user={user} />
            </div>
            <div className="suggested-users">
                <section>Suggested for you <span>See All</span></section>
                {unfollowUserList.map(suggestedUser =>
                    <li key={suggestedUser._id}>
                        <UserMiniCard user={suggestedUser} fromHome ={true} />
                    </li>
                )}
            </div>
        </>

    )
}