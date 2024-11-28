import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Loader from './Loader'
import { utilService } from '../services/util.service'
import { UserMiniCard } from './UserMiniCard'




export function SearchDialog({ isDialogOpen, closeDialog, dialogPosition, dialogWidth}) {

    const users = useSelector(userState => userState.userModule.users)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);



    useEffect(() => {
        if (searchQuery.trim().length >= 1) {
            const filtered = users.filter((user) =>
                user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        clearInput()
    }, [closeDialog]);


    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    function clearInput(){
        setSearchQuery('')
    }



    if (!users) return <div><Loader /></div>
    return (
        <div>
            {isDialogOpen && (
                <div className="dialog" style={{ transform: dialogPosition, width: dialogWidth }}>
                    <h2>Search</h2>
                    <p>
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
                                    <li key={utilService.makeId()} onClick={closeDialog}>
                                        <UserMiniCard user={user} fromSearch={true} />
                                    </li>
                                ))
                            ) : (
                                <li className='no-users'>No users found</li>
                            )}
                        </ul>
                    </p>
                </div>
            )}
        </div>
    )
}