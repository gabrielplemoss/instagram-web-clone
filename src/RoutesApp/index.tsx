import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Signup from '../pages/Signup'

const RoutesApp: React.FC = () => {
	return (
		<Routes>
			<Route path="/signup" element={<Signup />} />
		</Routes>
	)
}

export default RoutesApp
