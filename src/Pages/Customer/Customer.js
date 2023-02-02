import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate, useParams } from "react-router-dom"
import { auth, db } from "../../Config/Firebase"
import {
	collection,
	getDoc,
	query,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore"
import { NotificationManager } from "react-notifications"
import Spinner from "../../Components/Spinner/Spinner"

import "./Customer.css"

function Customer() {
	let { id } = useParams()
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)
	const [isLoading, setIsLoading] = useState(true)
	const [customer, setCustomer] = useState({})
	// const getCustomer = async () => {
	// 	await getDoc(
	// 		query(doc(db, "Customers", id), where("userID", "==", user.uid))
	// 	).then((docSnap) => {
	// 		setCustomer(docSnap.data())
	// 		setIsLoading(false)
	// 	})
	// }

	const getCustomer = async () => {
		const docSnap = await getDoc(doc(db, "Customers", id))
		setCustomer(docSnap.data())
		setIsLoading(false)
	}

	const deleteCustomer = async () => {
		await deleteDoc(doc(db, "Customers", id)).then(() => {
			navigate("/customers")
			NotificationManager.success(
				`Le client a été supprimé`,
				"Client supprimé",
				2000
			)
		})
	}

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getCustomer()
	}, [user, loading])

	return (
		<div className="customer_page">
			{!isLoading ? (
				<>
					<div className="customer_card">
						<div className="customer_card_name">
							<p>
								{customer.firstName} {customer.lastName}
							</p>
						</div>
						<div className="customer_card_informations">
							<div className="customer_card_address">
								<p>{customer.address}</p>
								<p>
									{customer.postalCode} {customer.city}
								</p>
							</div>
							<div className="customer_card_contact">
								<p>{customer.phone}</p>
								<p>{customer.email}</p>
							</div>
						</div>
						<div className="customer_card_buttons">
							<button
								className="matter-button-contained btn_margin"
								onClick={() => navigate(-1)}
							>
								Retour
							</button>
							<button
								className="matter-button-contained btn_margin"
								onClick={() => navigate(`/customers/update/${id}`)}
							>
								Modifier
							</button>
							<button
								className="matter-button-contained btn_margin"
								onClick={() => deleteCustomer(customer.id)}
							>
								Supprimer
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
export default Customer
