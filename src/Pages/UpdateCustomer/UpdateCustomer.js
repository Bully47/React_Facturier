import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate, useParams } from "react-router-dom"
import { auth, db } from "../../Config/Firebase"
import { getDoc, setDoc, doc } from "firebase/firestore"
import { NotificationManager } from "react-notifications"
import Spinner from "../../Components/Spinner/Spinner"

import "./UpdateCustomer.css"

function UpdateCustomer() {
	let { id } = useParams()
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)
	const [isLoading, setIsLoading] = useState(true)
	const [customer, setCustomer] = useState({})

	const getCustomer = async () => {
		const docSnap = await getDoc(doc(db, "Customers", id))
		setCustomer(docSnap.data())
		setIsLoading(false)
	}

	function checkCustomer() {
		let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		let phoneRegex = /^\d{10}$/
		let postalCodeRegex = /^[0-9]{5}$/

		if (customer.email === "") {
			NotificationManager.error(
				`L'email ne peut pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!emailRegex.test(customer.email)) {
			NotificationManager.error(`L'email n'est pas valide.`, "Erreur", 2000)
		} else if (customer.phone === "") {
			NotificationManager.error(
				`Le numéro de téléphone ne peux pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!phoneRegex.test(customer.phone)) {
			NotificationManager.error(
				`Le numéro de téléphone est incorrect.`,
				"Erreur",
				2000
			)
		} else if (customer.postalCode === "") {
			NotificationManager.error(
				`Le code postal ne peux pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!postalCodeRegex.test(customer.postalCode)) {
			NotificationManager.error(
				`Le code postal n'est pas valide.`,
				"Erreur",
				2000
			)
		} else {
			// Not Working
			// setcustomer({
			// 	...customer,
			// 	firstName: capitalizeFirstLetter(customer.firstName),
			// 	lastName: capitalizeFirstLetter(customer.lastName),
			// 	city: capitalizeFirstLetter(customer.city),
			// })
			updateCustomer()
		}
	}

	function updateCustomer() {
		try {
			setDoc(doc(db, "Customers", id), customer).then(() => {
				NotificationManager.success(
					`${customer.firstName} a été modifié.`,
					"Client mis à jour",
					2000
				)
				navigate(`/customers/${id}`)
			})
		} catch (err) {
			NotificationManager.error(`${err}`, "Erreur", 2000)
		}
	}

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getCustomer()
	}, [user, loading])

	return (
		<div className="update_customer_page">
			{!isLoading ? (
				<>
					<div className="update_customer_form">
						<div className="margined_bottom">
							<label className="matter-textfield-outlined margined_right">
								<input
									placeholder=" "
									aria-describedby="tooltip"
									value={customer.firstName}
									onChange={(e) =>
										setCustomer({
											...customer,
											firstName: e.target.value,
										})
									}
								/>
								<span>Prénom</span>
							</label>
							<label className="matter-textfield-outlined margined_left">
								<input
									placeholder=" "
									aria-describedby="tooltip"
									value={customer.lastName}
									onChange={(e) =>
										setCustomer({ ...customer, lastName: e.target.value })
									}
								/>
								<span>Nom</span>
							</label>
						</div>

						<div className="margined_bottom">
							<label className="matter-textfield-outlined margined_right">
								<input
									placeholder=" "
									aria-describedby="tooltip"
									value={customer.email}
									onChange={(e) =>
										setCustomer({ ...customer, email: e.target.value })
									}
								/>
								<span>Email</span>
							</label>

							<label className="matter-textfield-outlined margined_left">
								<input
									placeholder=" "
									aria-describedby="tooltip"
									value={customer.phone}
									onChange={(e) =>
										setCustomer({ ...customer, phone: e.target.value })
									}
								/>
								<span>Téléphone</span>
							</label>
						</div>

						<div className="margined_bottom">
							<label className="matter-textfield-outlined margined_right">
								<input
									placeholder=" "
									aria-describedby="tooltip"
									value={customer.postalCode}
									onChange={(e) =>
										setCustomer({
											...customer,
											postalCode: e.target.value,
										})
									}
								/>
								<span>Code Postal</span>
							</label>
							<label className="matter-textfield-outlined margined_left">
								<input
									placeholder=" "
									aria-describedby="tooltip"
									value={customer.city}
									onChange={(e) =>
										setCustomer({ ...customer, city: e.target.value })
									}
								/>
								<span>Ville</span>
							</label>
						</div>

						<label className="matter-textfield-outlined margined_bottom">
							<input
								placeholder=" "
								aria-describedby="tooltip"
								value={customer.address}
								onChange={(e) =>
									setCustomer({ ...customer, address: e.target.value })
								}
							/>
							<span>Adresse</span>
						</label>

						<div className="margined_top">
							<button
								className="matter-button-contained btn_margin"
								onClick={() => navigate(-1)}
							>
								Retour
							</button>
							<button
								className="matter-button-contained btn_margin"
								onClick={checkCustomer}
							>
								Sauvegarder
							</button>
						</div>
					</div>
				</>
			) : (
				<>
					<Spinner />
				</>
			)}
		</div>
	)
}
export default UpdateCustomer
