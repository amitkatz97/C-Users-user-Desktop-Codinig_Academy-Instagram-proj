import { storageService } from '../async-storage.service'
import { utilService } from '../util.service'
// import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

window.userService = userService


// _createUsers()


function getUsers() {
    return storageService.query(STORAGE_KEY_USERS)
    // return httpService.get(`user`)
}



async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_USERS, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl,following: user.following, followers: user.followers}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _createUsers(){
    const users= []
    for (var i = 0; i< 5; i++){
        users.push(_createUser(i))
    }
    console.log(users)
    utilService.saveToStorage(STORAGE_KEY_USERS, users)
}


function _createUser(i){
    const user = {
    _id: utilService.makeId(),
    // username: utilService.makeNameLorem(),
    // password: "mukmuk",
    fullname: utilService.makeNameLorem(),
    imgUrl: `src/imgs/profileImg/${i+1}.jpg`,
    // imgUrl: `https://xsgames.co/randomusers/avatar.php?g=male`,

    
    following: [
        {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "http://some-img"
        }
    ],
    followers: [
        {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "http://some-img"
        }
      ],
     }
        return user 
}

// creation of logged in user- need to change when i will create loggin page:
// const my_user = {
//     _id: 'A1997',
//     fullname: 'Amit_Katz',
//     imgUrl: `src/imgs/profileImg/my_photo.jpg`,
//     following: [
//         {
//         _id: "u106",
//         fullname: "Ronny",
//         imgUrl: "http://some-img"
//         },
//         {
//         _id: "u107",
//         fullname: "Shoshana",
//         imgUrl: "http://some-img"
//         }
//     ],
//     followers: [
//         {
//         _id: "u105",
//         fullname: "Bob",
//         imgUrl: "http://some-img"
//         }
//       ],
// }
// saveLocalUser(my_user)


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



