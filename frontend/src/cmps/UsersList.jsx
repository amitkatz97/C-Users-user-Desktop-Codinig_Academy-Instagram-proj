import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "./Loader"
import { UserMiniCard } from "./UserMiniCard.jsx"


export function UserList({ user , users}) {
    const currUser = useSelector(userState => userState.userModule.user)
    // const users = useSelector(userState => userState.userModule.users)

    const [unfollowUserList, setUnfollowUserList]= useState(null)

    useEffect(() => {
        console.log(users)
        getUnfollowUsers()
    }, [currUser])

    async function getUnfollowUsers(){
        let unfollowUserList = []
        for (let i = 0; i < users.length ; i++ ){
            for(let j = 0 ; j < users[i].followers.length; j++){
                if (users[i].followers[j]._id !== currUser._id){
                    unfollowUserList.push(users[i])
                }
           }
        }
        console.log("unfollowList:",unfollowUserList)
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
                <section>Suggested for you</section>
                {unfollowUserList.map(suggestedUser =>
                    <li>
                        <UserMiniCard user={suggestedUser} />
                    </li>
                )}
            </div>
        </>

    )
}