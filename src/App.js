import React from "react"
import { Routes, Route } from "react-router-dom"

import Sidebar from "./Components/Sidebar/Sidebar"

import Error404 from "./Pages/NoMatch/Error404"
import Home from "./Pages/Home/Home"

import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Reset from "./Pages/Reset/Reset"

import Dashboard from "./Pages/Dashboard/Dashboard"
import Customers from "./Pages/Customers/Customers"
import CreateCustomer from "./Pages/CreateCustomer/CreateCustomer"

import "./App.css"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Sidebar />}>
					<Route index element={<Home />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/reset" element={<Reset />} />
					<Route exact path="/dashboard" element={<Dashboard />} />
					<Route exact path="/customers" element={<Customers />} />
					<Route exact path="/customers/create" element={<CreateCustomer />} />
					<Route path="*" element={<Error404 />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
