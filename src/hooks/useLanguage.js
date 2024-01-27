import { useContext } from "react"
import LocaleContext from "../context/LocaleContext"
import id from "../lang/id"
import en from "../lang/en"

function useLanguage() {
	const { locale } = useContext(LocaleContext)

  if (locale == 'en') {
    return en
  }
	return id
}

export default useLanguage
