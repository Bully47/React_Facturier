import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "@firebase/firestore"
import { NotificationManager } from "react-notifications"
import { db } from "../../Config/Firebase"

import "./CreateCustomerForm.css"

function CreateCustomerForm({ user }) {
	const navigate = useNavigate()
	const [checked, setChecked] = useState(false)
	const [newCustomer, setNewCustomer] = useState({
		userID: user.uid,
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		postalCode: "",
	})

	// Not Working
	// function capitalizeFirstLetter(string) {
	// 	return string.charAt(0).toUpperCase() + string.slice(1)
	// }

	function checkCustomer() {
		let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		let phoneRegex = /^\d{10}$/
		let postalCodeRegex = /^[0-9]{5}$/

		if (newCustomer.email === "") {
			NotificationManager.error(
				`L'email ne peut pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!emailRegex.test(newCustomer.email)) {
			NotificationManager.error(`L'email n'est pas valide.`, "Erreur", 2000)
		} else if (newCustomer.phone === "") {
			NotificationManager.error(
				`Le numéro de téléphone ne peux pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!phoneRegex.test(newCustomer.phone)) {
			NotificationManager.error(
				`Le numéro de téléphone est incorrect.`,
				"Erreur",
				2000
			)
		} else if (newCustomer.postalCode === "") {
			NotificationManager.error(
				`Le code postal ne peux pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!postalCodeRegex.test(newCustomer.postalCode)) {
			NotificationManager.error(
				`Le code postal n'est pas valide.`,
				"Erreur",
				2000
			)
		} else {
			// Not Working
			// setNewCustomer({
			// 	...newCustomer,
			// 	firstName: capitalizeFirstLetter(newCustomer.firstName),
			// 	lastName: capitalizeFirstLetter(newCustomer.lastName),
			// 	city: capitalizeFirstLetter(newCustomer.city),
			// })
			addCustomer()
		}
	}

	function addCustomer() {
		try {
			addDoc(collection(db, "Customers"), newCustomer).then(() => {
				if (checked) {
					setNewCustomer({
						userID: user.uid,
						firstName: "",
						lastName: "",
						email: "",
						phone: "",
						address: "",
						city: "",
						postalCode: "",
					})
					NotificationManager.success(
						`${newCustomer.firstName} fait désormais partie de vos clients`,
						"Nouveau Client",
						2000
					)
				} else {
					navigate("/customers")
					NotificationManager.success(
						`${newCustomer.firstName} fait désormais partie de vos clients`,
						"Nouveau Client",
						2000
					)
				}
			})
		} catch (err) {
			NotificationManager.error(`${err}`, "Erreur", 2000)
		}
	}

	return (
		<div className="create_customer_form">
			<div className="margined_bottom">
				<label className="matter-textfield-outlined margined_right">
					<input
						placeholder=" "
						aria-describedby="tooltip"
						value={newCustomer.firstName}
						onChange={(e) =>
							setNewCustomer({ ...newCustomer, firstName: e.target.value })
						}
					/>
					<span>Prénom</span>
				</label>
				<label className="matter-textfield-outlined margined_left">
					<input
						placeholder=" "
						aria-describedby="tooltip"
						value={newCustomer.lastName}
						onChange={(e) =>
							setNewCustomer({ ...newCustomer, lastName: e.target.value })
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
						value={newCustomer.email}
						onChange={(e) =>
							setNewCustomer({ ...newCustomer, email: e.target.value })
						}
					/>
					<span>Email</span>
				</label>

				<label className="matter-textfield-outlined margined_left">
					<input
						placeholder=" "
						aria-describedby="tooltip"
						value={newCustomer.phone}
						onChange={(e) =>
							setNewCustomer({ ...newCustomer, phone: e.target.value })
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
						value={newCustomer.postalCode}
						onChange={(e) =>
							setNewCustomer({ ...newCustomer, postalCode: e.target.value })
						}
					/>
					<span>Code Postal</span>
				</label>
				<label className="matter-textfield-outlined margined_left">
					<input
						placeholder=" "
						aria-describedby="tooltip"
						value={newCustomer.city}
						onChange={(e) =>
							setNewCustomer({ ...newCustomer, city: e.target.value })
						}
					/>
					<span>Ville</span>
				</label>
			</div>

			<label className="matter-textfield-outlined margined_bottom">
				<input
					placeholder=" "
					aria-describedby="tooltip"
					value={newCustomer.address}
					onChange={(e) =>
						setNewCustomer({ ...newCustomer, address: e.target.value })
					}
				/>
				<span>Adresse</span>
			</label>

			<label className="matter-switch margined_bottom margined_top">
				<input
					type="checkbox"
					role="switch"
					value={checked}
					onChange={() => setChecked(!checked)}
				/>
				<span>Ajout Multiple : </span>
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
					Ajouter
				</button>
			</div>
		</div>
	)
}

export default CreateCustomerForm
