import React from "react"
import PropTypes from "prop-types"
import { showFormattedDate } from "../utils"

function NoteItemContent({ title, body, createdAt }) {
	return (
		<section className="note-item__content">
			<h3 className="note-item__title">{title}</h3>
			<p className="note-item__date">{showFormattedDate(createdAt)}</p>
			<p className="note-item__body">{body}</p>
		</section>
	)
}

NoteItemContent.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
}

export default NoteItemContent
