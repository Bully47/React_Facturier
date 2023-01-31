import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../Config/Firebase"
import { query, collection, getDocs, where } from "firebase/firestore"

import CreateCustomerForm from "../../Components/CreateCustomerForm/CreateCustomerForm"

import "./CreateCustomer.css"

function CreateCustomer() {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
	}, [user, loading])

	return (
		<div className="create_customer_page">
			<div className="create_customer_container">
				<CreateCustomerForm user={user} />
			</div>
		</div>
	)
}
export default CreateCustomer
