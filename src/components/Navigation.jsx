import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import LogoutButton from "./LogoutButton"
import LangToggler from './LangToggler'
import ThemeToggler from "./ThemeToggler"
import useLanguage from "../hooks/useLanguage"

function Navigation() {
	const { auth } = useContext(AuthContext)
	const text = useLanguage()

	return (
		<>
			{auth ? (
				<nav className="navigation">
					<ul>
						<li>
							<Link to="/">{text.list}</Link>
							<Link to="/archives">{text.archive}</Link>
							<Link to="/notes/new">{text.add}</Link>
						</li>
					</ul>
				</nav>
			) : (
				<nav className="navigation">
					<ul>
						<li>
							<Link to="/login">{text.login}</Link>
							<Link to="/register">{text.register}</Link>
						</li>
					</ul>
				</nav>
			)}
			<LogoutButton />
			<ThemeToggler />
			<LangToggler />
		</>
	)
}

export default Navigation
