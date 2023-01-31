import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "@firebase/firestore"

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

	function addCustomer() {
		try {
			addDoc(collection(db, "Customers"), newCustomer)
		} catch (err) {
			alert(err)
		}
		if (checked)
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
		else navigate("/customers")
	}

	return (
		<div className="create_customer_form">
			<input
				type="text"
				className="create_customer_form_firstName"
				value={newCustomer.firstName}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, firstName: e.target.value })
				}
				placeholder="Prénom"
			/>
			<input
				type="text"
				className="create_customer_form_lastName"
				value={newCustomer.lastName}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, lastName: e.target.value })
				}
				placeholder="Nom"
			/>
			<input
				type="email"
				className="create_customer_form_email"
				value={newCustomer.email}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, email: e.target.value })
				}
				placeholder="Email"
			/>
			<input
				type="tel"
				className="create_customer_form_phone"
				value={newCustomer.phone}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, phone: e.target.value })
				}
				placeholder="Téléphone"
			/>
			<input
				type="text"
				className="create_customer_form_address"
				value={newCustomer.address}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, address: e.target.value })
				}
				placeholder="Adresse"
			/>
			<input
				type="text"
				className="create_customer_form_city"
				value={newCustomer.city}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, city: e.target.value })
				}
				placeholder="Ville"
			/>
			<input
				type="text"
				className="create_customer_form_cp"
				value={newCustomer.postalCode}
				onChange={(e) =>
					setNewCustomer({ ...newCustomer, postalCode: e.target.value })
				}
				placeholder="Code Postal"
			/>

			<p className="small_text">Ajout Multiple</p>
			<label className="switch">
				<input
					type="checkbox"
					value={checked}
					onChange={() => setChecked(!checked)}
				/>
				<span className="slider"></span>
			</label>

			<div>
				<button className="btn btn_bleu" onClick={() => navigate(-1)}>
					Retour
				</button>
				<button className="btn btn_bleu" onClick={addCustomer}>
					Ajouter
				</button>
			</div>
		</div>
	)
}

export default CreateCustomerForm
