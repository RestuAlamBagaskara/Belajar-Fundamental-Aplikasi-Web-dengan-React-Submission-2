import React from "react"
import useLanguage from "../hooks/useLanguage"

function PageNotFount() {
	const text = useLanguage()

	return (
		<div className="page-not-found">
			<h1>404</h1>
			<p>{text.pageNotFound}</p>
		</div>
	)
}

export default PageNotFount
