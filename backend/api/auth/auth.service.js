import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { UserService } from '../user/user.service.js'
import { loggerService } from '../../services/logger.service.js'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Amit-1997')

export const authService= {
        login,
        signup,
        getLoginToken,
        validateToken
}


async function login(fullname){
    const user = await UserService.getByFullname(fullname)
    if (!user) throw "Unknown _id" 

    const miniUser ={
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        following : user.following,
        followers: user.followers
    }
    return miniUser
}

async function signup(crecredentials){
    const {fullname, username, imgUrl} = crecredentials
    const saltRounds = 10

    loggerService.debug(`auth.service - signup with fullname: ${fullname}`)
    if (!fullname) throw 'Missing required signup information'
    
    const userExist = await UserService.getByFullname(fullname)
    if (userExist) throw 'Username already taken'
    
    // const hash = await bcrypt.hash(password, saltRounds)
    return UserService.add({  fullname, username, imgUrl})
}

function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function validateToken(token){
    try {
        const json = cryptr.decrypt(token)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}