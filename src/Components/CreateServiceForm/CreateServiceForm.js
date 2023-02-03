import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "@firebase/firestore"
import { NotificationManager } from "react-notifications"
import { db } from "../../Config/Firebase"

import "./CreateServiceForm.css"

function CreateServiceForm({ user }) {
	const navigate = useNavigate()
	const [checked, setChecked] = useState(false)
	const [newService, setNewService] = useState({
		userID: user.uid,
		name: "",
		price: 0,
	})

	function checkService() {
		let priceRegex = /^[1-9]\d*(\.\d+)?$/

		if (newService.price === "") {
			NotificationManager.error(
				`Le prix ne peut pas être vide.`,
				"Erreur",
				2000
			)
		} else if (!priceRegex.test(newService.price)) {
			NotificationManager.error(
				`Le prix n'es pas valide (si le prix n'es pas un entier il faut utiliser un point et non une virgule).`,
				"Erreur",
				2000
			)
		} else {
			addService()
		}
	}

	function addService() {
		try {
			addDoc(collection(db, "Services"), newService).then(() => {
				if (checked) {
					setNewService({
						userID: user.uid,
						name: "",
						price: 0,
					})
					NotificationManager.success(
						`${newService.name} a été ajouté.`,
						"Nouvelle Prestation",
						2000
					)
				} else {
					navigate("/customers")
					NotificationManager.success(
						`${newService.name} a été ajouté.`,
						"Nouvelle Prestation",
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
			<label className="matter-textfield-outlined">
				<input
					placeholder=" "
					aria-describedby="tooltip"
					value={newService.name}
					onChange={(e) =>
						setNewService({ ...newService, name: e.target.value })
					}
				/>
				<span>Nom</span>
			</label>

			<label className="matter-textfield-outlined">
				<input
					placeholder=" "
					aria-describedby="tooltip"
					value={newService.email}
					type="number"
					onChange={(e) =>
						setNewService({ ...newService, price: e.target.value })
					}
				/>
				<span>Prix</span>
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
					onClick={checkService}
				>
					Ajouter
				</button>
			</div>
		</div>
	)
}

export default CreateServiceForm
