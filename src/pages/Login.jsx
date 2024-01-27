import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import useLanguage from "../hooks/useLanguage"
import useInput from "../hooks/useInput"
import { getUserLogged, login, putAccessToken } from "../utils/network-data"

export default function LoginPage() {
	const { setAuth } = useContext(AuthContext)
	const [email, onEmailChange] = useInput("")
	const [password, onPasswordChange] = useInput("")
	const text = useLanguage()
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		login({ email, password }).then((res) => {
			if (!res.error) {
				putAccessToken(res.data.accessToken)
				getUserLogged()
					.then((res) => {
						if (!res.error) {
							setAuth(res.data)
						} else {
							setAuth(null)
						}
						navigate("/")
					})
					.catch(() => {
						alert(text.error)
					})
			}
		})
	}

	return (
		<section className="login-page">
			<h2>{text.login}</h2>
			<form className="input-login" onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					value={email}
					minLength="6"
					maxLength="255"
					onChange={onEmailChange}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					minLength="6"
					maxLength="255"
					onChange={onPasswordChange}
					required
				/>
				<button type="submit">{text.login}</button>
			</form>
		</section>
	)
}
