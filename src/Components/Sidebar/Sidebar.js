import React, { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../Config/Firebase"

import "./Sidebar.css"

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false)
	const [user] = useAuthState(auth)

	return (
		<>
			<div className={`sidebar ${isOpen ? "open" : ""}`}>
				<div className="sidebar_content">
					<nav>
						<Link
							className="sidebar_Link"
							onClick={() => setIsOpen(false)}
							to="/"
						>
							Home
						</Link>
						{!user ? (
							<>
								<Link
									className="sidebar_Link"
									onClick={() => setIsOpen(false)}
									to="/login"
								>
									Login
								</Link>
								<Link
									className="sidebar_Link"
									onClick={() => setIsOpen(false)}
									to="/register"
								>
									Register
								</Link>
							</>
						) : (
							<>
								<Link
									className="sidebar_Link"
									onClick={() => setIsOpen(false)}
									to="/dashboard"
								>
									Dashboard
								</Link>
								<Link
									className="sidebar_Link"
									onClick={() => setIsOpen(false)}
									to="/customers"
								>
									Clients
								</Link>
								<Link
									className="sidebar_Link"
									onClick={() => setIsOpen(false)}
									to="/invoices"
								>
									Factures
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
			<div
				id="menu_burger"
				onClick={() => setIsOpen(!isOpen)}
				className={isOpen ? "open" : ""}
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Outlet />
		</>
	)
}

export default Sidebar
