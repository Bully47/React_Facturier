import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc, query, where } from "firebase/firestore"
import { auth, db } from "../../Config/Firebase"

import CreateInvoiceForm from "../../Components/CreateInvoiceForm/CreateInvoiceForm"
import Spinner from "../../Components/Spinner/Spinner"

import "./CreateInvoice.css"

function CreateInvoice() {
	let id = useParams()
	const navigate = useNavigate()
	const [customer, setCustomer] = useState({})
	const [user, loading, error] = useAuthState(auth)
	const [isLoading, setIsLoading] = useState(true)

	const getCustomer = async () => {
		// query(collection(db, "Services"), where("userID", "==", user.uid))
		const docSnap = await getDoc(doc(db, "Customers", id.clientID))
		setCustomer(docSnap.data())
		setIsLoading(false)
	}

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
		getCustomer()
	}, [user, loading])

	return (
		<div className="create_invoice_page">
			{!isLoading ? (
				<>
					<div className="create_invoice_container">
						<CreateInvoiceForm user={user} customer={customer} customerID={id.clientID} />
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
export default CreateInvoice
