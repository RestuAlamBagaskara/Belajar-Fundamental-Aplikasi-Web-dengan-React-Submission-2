import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import useLanguage from "../hooks/useLanguage"

function NoteButton({ id, archived, archiveHandler, deleteHandler }) {
	const text = useLanguage()
	return (
		<section className="note-item__action">
			<button type="button" className="note-item__detail-button">
				<Link to={`/detail/${id}`}>{text.detail}</Link>
			</button>
			<button
				type="button"
				onClick={archiveHandler}
				className="note-item__archive-button"
			>
				{archived ? text.active : text.archive}
			</button>
			<button
				type="button"
				onClick={deleteHandler}
				className="note-item__delete-button"
			>
				{text.delete}
			</button>
		</section>
	)
}

NoteButton.propTypes = {
	id: PropTypes.string.isRequired,
	archived: PropTypes.bool.isRequired,
	archiveHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
}

export default NoteButton
