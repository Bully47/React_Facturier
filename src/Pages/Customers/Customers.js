import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate, Link } from "react-router-dom"
import { auth, db } from "../../Config/Firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

import "./Customers.css"

function Customers() {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)
	const [customers, setCustomers] = useState([])
	const getCustomers = async () => {
		await getDocs(
			query(collection(db, "Customers"), where("userID", "==", user.uid))
		).then((querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			setCustomers(data)
		})
	}

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getCustomers()
	}, [user, loading])
	return (
		<div className="customers_page">
			<div className="customers_container">
				<table className="customers_table">
					<thead>
						<tr>
							<th>Nom</th>
							<th>Email</th>
							<th>Téléphone</th>
							<th>Adresse</th>
							<th>Ville</th>
						</tr>
					</thead>
					<tbody>
						{customers.map((customer) => (
							<tr key={customer.id} onClick={() => navigate(`/customer/${customer.id}`)}>
								<td>
									{customer.firstName} {customer.lastName}
								</td>
								<td>{customer.email}</td>
								<td>{customer.phone}</td>
								<td>{customer.address}</td>
								<td>
									{customer.postalCode} {customer.city}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Link to={'/customers/create'} className="btn btn_bleu" >Ajouter un Client</Link>
			</div>
		</div>
	)
}
export default Customers
