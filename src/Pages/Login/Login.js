import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
	auth,
	signInWithEmailAndPassword,
	signInWithGoogle,
} from "../../Config/Firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "./Login.css"

function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [user, loading, error] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) {
			// maybe trigger a loading screen
			// <div class="loader">Loading...</div>
			return
		}
		if (user) navigate("/dashboard")
	}, [user, loading])

	return (
		<div className="login_page">
			<div className="login_container">
				<label class="custom_input">
					<input
						placeholder=" "
						type="email"
						required="required"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<span class="label">Email</span>
					<div class="helper">Entrez un email valide</div>
					<div class="error">Erreur: Cet email n'es pas valide</div>
				</label>

				<label class="custom_input">
					<input
						placeholder=" "
						type="password"
						required="required"
						minLength={8}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<span class="label">Mot de Passe</span>
					<div class="helper">Entrez un mot de passe valide</div>
					<div class="error">Erreur: Ce mot de passe n'es pas valide</div>
				</label>

				<div className="login_buttons_container">
					<button
						className="btn btn_bleu"
						onClick={() => signInWithEmailAndPassword(email, password)}
					>
						Login
					</button>

					<button className="icon_btn btn_bleu" onClick={signInWithGoogle}>
						<svg viewBox="0 0 24 24" className="google_icon">
							<path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
						</svg>
						Google Login
					</button>
				</div>

				<div>
					<Link className="text_link" to="/reset">
						Mot de Passe oublié
					</Link>
				</div>
				<div>
					Pas de compte ?{" "}
					<Link className="text_link" to="/register">
						Créez en un
					</Link>{" "}
					maintenant.
				</div>
			</div>
		</div>
	)
}
export default Login
