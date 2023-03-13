import { createContext } from 'react'
import { apiPost } from '../services/api'

interface Children {
	children: React.ReactNode
}

interface Signup {
	username: string
	email: string
	password: string
}

interface Signin {
	login: string
	password: string
}

interface AuthContext {
	signup: (data: Signup) => Promise<void>
	signin: (data: Signin) => Promise<void>
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

const AuthProvider: React.FC<Children> = ({ children }) => {
	async function signup(data: Signup) {
		const response = await apiPost('/auth/signup', data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		localStorage.setItem('token', response.data.token)
		localStorage.setItem('user', JSON.stringify(response.data.user))
	}

	async function signin(data: Signin) {
		const response = await apiPost('/auth/signin', data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		localStorage.setItem('token', response.data.token)
		localStorage.setItem('user', JSON.stringify(response.data.user))
	}

	return (
		<AuthContext.Provider value={{ signup, signin }} >
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthContext,
	AuthProvider
}
