import { BrowserRouter } from 'react-router-dom'
import RoutesApp from './RoutesApp'
import { AuthProvider } from './context/AuthContext'

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<RoutesApp />
			</AuthProvider>
		</BrowserRouter>
	)
}

export default App
