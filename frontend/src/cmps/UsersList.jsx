import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "./Loader"
import { UserMiniCard } from "./UserMiniCard.jsx"


export function UserList({ user }) {
    const users = useSelector(userState => userState.userModule.users)

    useEffect(() => {
        console.log(users)
    }, [])


    const shuffleArray = (users) => {
        for (let i = users.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [users[i], users[j]] = [users[j], users[i]];
        }
        return users;
    }

    const randomUsers = shuffleArray([...users]).slice(0, 6)



    if (!users) return <div><Loader /></div>
    return (
        <>
            <div className="Logged-in-user-info">
                <UserMiniCard user={user} />
            </div>
            <div className="suggested-users">
                <section>Suggested for you</section>
                {randomUsers.map(suggestedUser =>
                    <li key={suggestedUser._id}>
                        <UserMiniCard user={suggestedUser} />
                    </li>
                )}
            </div>
        </>

    )
}