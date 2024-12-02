import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NotificationIcon, NotificationIconFull, LogoIcon } from '../cmps/SVG.jsx';
import { logout } from "../store/user.actions.js"
import { useNavigate } from "react-router";
import { UserMiniCard } from '../cmps/UserMiniCard'




export function UpperMobileBar() {

    const users = useSelector(userState => userState.userModule.users)
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);



    // useEffect(() => {
    //     if (searchQuery.trim().length >= 1) {
    //         const filtered = users.filter((user) =>
    //             user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         setFilteredUsers(filtered);
    //     } else {
    //         setFilteredUsers([]);
    //     }
    // }, [searchQuery]);

    // useEffect(() => {
    //     clearInput()
    // }, []);


    // const handleSearchChange = (event) => {
    //     const query = event.target.value;
    //     setSearchQuery(query);
    // };

    // function clearInput() {
    //     setSearchQuery('')
    // }


    function onLogout() {
        console.log("logout attempted ")
        navigate('/')
        logout()
    }


    return (
        <div className="upper-bar-content">
            <div className="Logo" onClick={onLogout}><LogoIcon /></div>
            <div className="search">
                {/* <p>
                    <div className='input-area'>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className='clear-input' onClick={clearInput}>x</button>
                    </div>
                    <ul>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <li key={utilService.makeId()}>
                                    <UserMiniCard user={user} fromSearch={true} />
                                </li>
                            ))
                        ) : (
                            <li className='no-users'>No users found</li>
                        )}
                    </ul>
                </p> */}
            </div>
        </div>
    )
}