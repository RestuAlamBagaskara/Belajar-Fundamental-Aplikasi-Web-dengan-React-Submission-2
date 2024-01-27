import React from "react"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import useLanguage from "../hooks/useLanguage"
import useInput from "../hooks/useInput"
import { register } from "../utils/network-data"

function RegisterPage() {
	const [name, onNameChange] = useInput("")
	const [email, onEmailChange] = useInput("")
	const [password, onPasswordChange] = useInput("")
	const [confirmPassword, onConfirmPasswordChange] = useInput("")

	const text = useLanguage()
	const navigate = useNavigate()

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			alert(text.password_mismatch)
		}
        else{
            register({ name, email, password })
                .then((res) => {
                    if (!res.error) {
                        alert(text.register_success)
                        navigate("/login")
                    }
                })
                .catch(() => {
                    alert(text.error)
                })
        }
	}

	return (
		<form onSubmit={onSubmitHandler} className="input-register">
			<input
				type="text"
				placeholder="Nama"
				value={name}
				onChange={onNameChange}
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={onEmailChange}
			/>
			<input
				type="password"
				id="password"
				value={password}
				onChange={onPasswordChange}
				minLength="6"
				maxLength="255"
				required
			/>
			<input
				type="password"
				id="confirmPassword"
				value={confirmPassword}
				onChange={onConfirmPasswordChange}
				minLength="6"
				maxLength="255"
				required
			/>
			<button type="submit">{text.register}</button>
		</form>
	)
}

// RegisterPage.propTypes = {
// 	register: PropTypes.func.isRequired,
// }

export default RegisterPage
