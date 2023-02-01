import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate, Link } from "react-router-dom"
import { auth, db } from "../../Config/Firebase"
import {
	collection,
	getDocs,
	query,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore"
import { NotificationManager } from "react-notifications"
import Spinner from "../../Components/Spinner/Spinner"

import "./Customers.css"

function Customers() {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)
	const [isLoading, setIsLoading] = useState(true)
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
			setIsLoading(false)
		})
	}

	const deleteCustomer = async (id) => {
		await deleteDoc(doc(db, "Customers", id)).then((res, err) =>
			NotificationManager.success(
				`Le client a été supprimé`,
				"Client supprimé",
				2000
			)
		)
		getCustomers()
	}

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getCustomers()
	}, [user, loading])
	return (
		<div className="customers_page">
			<div className="customers_container">
				{!isLoading ? (
					<>
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
									<tr
										key={customer.id}
										// onClick={() => navigate(`/customer/${customer.id}`)}
									>
										<td>
											{customer.firstName} {customer.lastName}
										</td>
										<td>{customer.email}</td>
										<td>{customer.phone}</td>
										<td>{customer.address}</td>
										<td>
											{customer.postalCode} {customer.city}
										</td>
										<td>
											<div className="table_cell_icons">
												<svg
													onClick={() => deleteCustomer(customer.id)}
													className="table_icon"
													xmlns="http://www.w3.org/2000/svg"
													enable-background="new 0 0 24 24"
													viewBox="0 0 24 24"
													fill="red"
												>
													<path
														d="M13.4,12l6.3-6.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4
	l6.3,6.3l-6.3,6.3C4.1,18.5,4,18.7,4,19c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.4,0.3,0.7,0.3
	s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12z"
													/>
												</svg>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="red"
													enable-background="new 0 0 24 24"
													viewBox="0 0 24 24"
													onClick={() => navigate(`/customer/${customer.id}`)}
													className="table_icon"
												>
													<g
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
													>
														<circle cx="7.579" cy="4.778" r="4.778" />
														<path d="M5.32907052e-15,16.2013731 C-0.00126760558,15.8654831 0.0738531734,15.5336997 0.219695816,15.2311214 C0.677361723,14.3157895 1.96797958,13.8306637 3.0389178,13.610984 C3.81127745,13.4461621 4.59430539,13.3360488 5.38216724,13.2814646 C6.84083861,13.1533327 8.30793524,13.1533327 9.76660662,13.2814646 C10.5544024,13.3366774 11.3373865,13.4467845 12.1098561,13.610984 C13.1807943,13.8306637 14.4714121,14.270023 14.929078,15.2311214 C15.2223724,15.8479159 15.2223724,16.5639836 14.929078,17.1807781 C14.4714121,18.1418765 13.1807943,18.5812358 12.1098561,18.7917621 C11.3383994,18.9634099 10.5550941,19.0766219 9.76660662,19.1304349 C8.57936754,19.2310812 7.38658584,19.2494317 6.19681255,19.1853548 C5.92221301,19.1853548 5.65676678,19.1853548 5.38216724,19.1304349 C4.59663136,19.077285 3.8163184,18.9640631 3.04807112,18.7917621 C1.96797958,18.5812358 0.686515041,18.1418765 0.219695816,17.1807781 C0.0745982583,16.8746908 -0.000447947969,16.5401098 5.32907052e-15,16.2013731 Z" />
													</g>
												</svg>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<>
						<Spinner />
					</>
				)}
				<Link to={"/customers/create"} className="matter-button-contained">
					Ajouter un Client
				</Link>
			</div>
		</div>
	)
}
export default Customers
