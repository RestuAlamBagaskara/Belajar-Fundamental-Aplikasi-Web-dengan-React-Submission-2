import React from "react"
import PropTypes from "prop-types"

function NoteInput({ handler, placeholder, type, value, style }) {
	return (
		<>
			{type === "textarea" ? (
				<textarea
					className="add-new-page__input add-new-page__input__body"
					placeholder={placeholder}
					onChange={handler}
					value={value}
					style={style}
				/>
			) : (
				<input
					className="add-new-page__input add-new-page__input__title"
					type={type}
					placeholder={placeholder}
					onChange={handler}
					value={value}
				/>
			)}
		</>
	)
}

NoteInput.propTypes = {
	handler: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	type: PropTypes.string,
	style: PropTypes.object,
}

export default NoteInput
