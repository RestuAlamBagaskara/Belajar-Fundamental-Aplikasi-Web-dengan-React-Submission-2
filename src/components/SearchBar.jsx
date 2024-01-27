import React from "react"
import PropTypes from "prop-types"
import useLanguage from "../hooks/useLanguage"

function SearchBar({ keyword, keywordChange }) {
	const text = useLanguage()
	return (
		<>
			<div className="search-bar__title">
				<h2>{text.search_title}</h2>
			</div>
			<div className="search-bar">
				<input
					type="text"
					placeholder={text.search_title_placeholde}
					value={keyword}
					onChange={(event) => keywordChange(event.target.value)}
				/>
			</div>
		</>
	)
}

SearchBar.propTypes = {
	keyword: PropTypes.string.isRequired,
	keywordChange: PropTypes.func.isRequired,
}

export default SearchBar
