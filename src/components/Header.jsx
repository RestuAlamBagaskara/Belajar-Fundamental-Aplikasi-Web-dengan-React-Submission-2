import React from "react"
import Navigation from "./Navigation"
import useLanguage from "../hooks/useLanguage"

function Header() {
	const text = useLanguage()

	return (
		<header className="note-app__header">
			<h1>{text.title}</h1>
			<Navigation />
		</header>
	)
}

export default Header
