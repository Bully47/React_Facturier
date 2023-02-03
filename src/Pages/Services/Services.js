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

import "./Services.css"

function Services() {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)
	const [isLoading, setIsLoading] = useState(true)
	const [services, setServices] = useState([])
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

	const deleteService = async (id) => {
		await deleteDoc(doc(db, "Services", id)).then((res, err) =>
			NotificationManager.success(
				`La prestation a été supprimé`,
				"Prestation supprimé",
				2000
			)
		)
		getServices()
	}

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getServices()
	}, [user, loading])
	return (
		<div className="services_page">
			<div className="services_container">
				{!isLoading ? (
					<>
						<table className="services_table">
							<thead>
								<tr>
									<th>Nom</th>
									<th>Prix</th>
								</tr>
							</thead>
							<tbody>
								{services.map((service) => (
									<tr key={service.id}>
										<td>{service.name}</td>
										<td>{service.price}</td>

										<td>
											<div className="table_cell_icons">
												<svg
													onClick={() => deleteService(service.id)}
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
				<Link to={"/services/create"} className="matter-button-contained">
					Ajouter une Prestation
				</Link>
			</div>
		</div>
	)
}
export default Services
