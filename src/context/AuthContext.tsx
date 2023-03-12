import { createContext } from 'react'

interface Children {
	children: React.ReactNode
}

const AuthContext = createContext<any>({})

const AuthProvider: React.FC<Children> = ({ children }) => {
	return (
		<AuthContext.Provider value={{}} >
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthContext,
	AuthProvider
}
