import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth } from "../../Config/Firebase"

import CreateServiceForm from "../../Components/CreateServiceForm/CreateServiceForm"

import "./CreateService.css"

function CreateService() {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		if (loading) return
		if (!user) return navigate("/login")
	}, [user, loading])

	return (
		<div className="create_service_page">
			<div className="create_service_container">
				<CreateServiceForm user={user} />
			</div>
		</div>
	)
}
export default CreateService
