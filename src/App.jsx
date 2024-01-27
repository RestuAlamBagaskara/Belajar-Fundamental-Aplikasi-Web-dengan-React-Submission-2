import React, { useEffect, useMemo, useState } from "react"
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Archived from "./pages/Archived"
import DetailNote from "./pages/DetailNote"
import AddNote from "./pages/AddNote"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PageNotFount from "./pages/404"
import LocaleContext from "./context/LocaleContext"
import AuthContext from "./context/AuthContext"
import ThemeContext from "./context/ThemeContext"
import useTheme from "./hooks/useTheme"
import { getUserLogged } from "./utils/network-data"

function App() {
	const [auth, setAuth] = useState(null)
	const [locale, setLocale] = useState("id")
	const [theme, changeTheme] = useTheme()
	const [loading, setLoading] = useState(true)

	const toggleLocale = () => {
		localStorage.setItem("locale", locale === "id" ? "en" : "id")
		setLocale((prevLocale) => (prevLocale === "id" ? "en" : "id"))
	}

	const localeContextValue = useMemo(
		() => ({
			locale,
			toggleLocale,
		}),
		[locale]
	)

	const authContextValue = useMemo(
		() => ({
			auth,
			setAuth,
		}),
		[auth]
	)

	const themeContextValue = useMemo(
		() => ({
			theme,
			changeTheme,
		}),
		[auth]
	)

	useEffect(() => {
		/**
		 * Get User Logged
		 */
		getUserLogged()
			.then((res) => {
				if (!res.error) {
					setAuth(res.data)
				} else {
					setAuth(null)
				}
				setLoading(false)
			})
			.catch(() => {
				alert(text.error)
			})

		/**
		 * Inisialisasi Locale
		 */
		if (localStorage.locale && ["id", "en"].includes(localStorage.locale)) {
			setLocale(localStorage.locale)
		}

		/**
		 * Inisialisasi Theme
		 */

		if (localStorage.theme) {
			changeTheme(localStorage.theme)
		} else {
			localStorage.setItem("theme", "dark")
			changeTheme("dark")
		}
	}, [])

	if (auth === null) {
		return (
			<>
				<ThemeContext.Provider value={themeContextValue}>
					<LocaleContext.Provider value={localeContextValue}>
						<AuthContext.Provider value={authContextValue}>
							<Header />
							<Routes>
								<Route path="/*" element={<Login />} />
								<Route path="/register" element={<Register />} />
							</Routes>
						</AuthContext.Provider>
					</LocaleContext.Provider>
				</ThemeContext.Provider>
			</>
		)
	}

	return (
		<>
			<ThemeContext.Provider value={themeContextValue}>
				<LocaleContext.Provider value={localeContextValue}>
					<AuthContext.Provider value={authContextValue}>
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/archives" element={<Archived />} />
							<Route path="/detail/:id" element={<DetailNote />} />
							<Route path="/notes/new" element={<AddNote />} />
							<Route path="/*" element={<PageNotFount />} />
						</Routes>
					</AuthContext.Provider>
				</LocaleContext.Provider>
			</ThemeContext.Provider>
		</>
	)
}

export default App
