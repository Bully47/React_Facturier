import React from "react"
import Loader from "./Loader.gif"
import "./Spinner.css"

function Spinner() {
	return (
		<div className="spinner_container">
			<img
				className="spinner_image"
				src={Loader}
				style={{ width: "100px", margin: "auto", display: "block" }}
				alt="Loading..."
			/>
		</div>
	)
}

export default Spinner
