import { useEffect } from "react"



export function UserMiniCard({user}){

    useEffect(()=>{
        console.log(user)
    },[])





    if (!user) return <div>Hey</div>
    return(
        <section className="user-card">
            <img src={user.imgUrl} alt="" />
            <a>{user.fullname}</a>
            <button>Switch</button>
        </section>
    )
}