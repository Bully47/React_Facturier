import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
	collection,
	doc,
	getDocs,
	getDoc,
	query,
	where,
} from "@firebase/firestore"
import { NotificationManager } from "react-notifications"
import { db } from "../../Config/Firebase"
import axios from "axios"

import "./CreateInvoiceForm.css"

function CreateInvoiceForm({ user, customer }) {
	const navigate = useNavigate()
	const [total, setTotal] = useState(0)
	const [services, setServices] = useState([])
	const [selectedService, setSelectedService] = useState({})
	const [selectedServices, setSelectedServices] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const getServices = async () => {
		await getDocs(
			query(collection(db, "Services"), where("userID", "==", user.uid))
		).then((querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			setServices(data)
			setIsLoading(false)
		})
	}

	async function invoice() {
		const response = await axios.post("http://localhost:3001/invoices/create", {
			services: selectedServices,
			customer: customer,
			user: user,
		})
	}

	function updateTotal() {
		let x = 0
		selectedServices.map(
			(invoiceService) => (x += invoiceService.price * invoiceService.quantity)
		)
		setTotal(x)
	}

	function addService() {
		setSelectedServices((selectedServices) => [
			...selectedServices,
			{ ...selectedService, quantity: 1 },
		])
		updateTotal()
	}

	function updateQuantity(quantity, id) {
		setSelectedServices((services) =>
			services.map((service) => {
				if (service.id === id) {
					return { ...service, quantity }
				}
				return service
			})
		)
		updateTotal()
	}

	useEffect(() => {
		getServices()
	}, [])

	return (
		<div className="create_invoice_form">
			<div className="select_service_input">
				{/* <label for="services">Prestations</label> */}

				<select
					name="services"
					id="services"
					onChange={() =>
						setSelectedService(
							services.filter(
								(service) =>
									service.id === document.getElementById("services").value
							)[0]
						)
					}
				>
					<option disabled selected value="">
						Sélectionnez une prestation
					</option>
					{services.map((service) => (
						<option value={service.id}>{service.name}</option>
					))}
				</select>
				<button
					className="matter-button-contained margined_left"
					onClick={() => addService()}
				>
					Ajouter
				</button>
			</div>
			<div className="invoice_services">
				<table className="table margined_top">
					<thead className="table_header">
						<tr className="table_row">
							<th className="table_cell">Nom</th>
							<th className="table_cell">Prix</th>
							<th className="table_cell">Quantité</th>
							<th className="table_cell">Total</th>
						</tr>
					</thead>
					<tbody className="table_body">
						{selectedServices.map((invoiceService) => (
							<tr className="table_row">
								<td className="table_cell">{invoiceService.name}</td>
								<td className="table_cell">{invoiceService.price} €</td>
								<td className="table_cell">
									<input
										className="table_input"
										type="number"
										min={1}
										value={invoiceService.quantity}
										onChange={(e) =>
											updateQuantity(e.target.value, invoiceService.id)
										}
									/>
								</td>
								<td className="table_cell">
									{invoiceService.price * invoiceService.quantity}€
								</td>
							</tr>
						))}
					</tbody>
					<tfoot className="table_footer">
						<tr className="table_row">
							<td colspan="3" className="table_cell">
								Total (Buggé)
							</td>
							<td className="table_cell">{total}</td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div className="margined_top">
				<button
					className="matter-button-contained margined_right"
					onClick={() => navigate(-1)}
				>
					Retour
				</button>
				<button
					className="matter-button-contained margined_left"
					onClick={() => invoice()}
				>
					Facturer
				</button>
			</div>
		</div>
	)
}

export default CreateInvoiceForm
