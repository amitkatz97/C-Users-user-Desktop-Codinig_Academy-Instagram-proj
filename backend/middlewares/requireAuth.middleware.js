import { config } from '../config/index.js'
import {loggerService as logger } from '../services/logger.service.js'
import { asyncLocalStorage } from '../services/als.service.js'
import { authService } from '../api/auth/auth.service.js'

export async function requireAuth(req, res, next) {
	console.log("auth is acivated")
	console.log(req.cookies.loginToken)
	
	try {
		
		const loggedinUser = await authService.validateToken(req.cookies.loginToken)
		// if (!loggedinUser) return res.status(401).send('Login first')
		req.loggedinUser = loggedinUser
		console.log(loggedinUser)
		next()
	} catch (err) {
		console.log("cant Auth", err);
	}
}

