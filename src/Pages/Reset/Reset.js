import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { auth, sendPasswordResetEmail } from "../../Config/Firebase"
import "./Reset.css"
function Reset() {
	const [email, setEmail] = useState("")
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()
	useEffect(() => {
		if (loading) return
		if (user) navigate("/dashboard")
	}, [user, loading])
	return (
		<div className="reset">
			<div className="reset_container">
				<input
					type="text"
					className="reset_input"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Adresse e-mail"
				/>
				<button
					className="blue_btn"
					onClick={() => sendPasswordResetEmail(email)}
				>
					Envoyer l'email de récupération
				</button>
				<div>
					Pas de compte ? <Link to="/register">Créez en un</Link> maintenant.
				</div>
			</div>
		</div>
	)
}
export default Reset
