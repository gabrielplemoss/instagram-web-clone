import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Signup from '../pages/Signup'
import Signin from '../pages/Signin'

const RoutesApp: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />
		</Routes>
	)
}

export default RoutesApp
