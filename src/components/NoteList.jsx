import React from "react"
import NoteItem from "./NoteItem"
import PropTypes from "prop-types"
import useLanguage from "../hooks/useLanguage"

function NoteList({ notes, archiveHandler, deleteHandler }) {
	const text = useLanguage()
	return (
		<div>
			<div>
				<div className="notes-list">
					{notes.length ? (
						notes.map((note) => (
							<NoteItem
								note={note}
								key={note.id}
								archiveHandler={archiveHandler}
								deleteHandler={deleteHandler}
							/>
						))
					) : (
						<p className="notes-list-empty page-not-found">
							{text.empty_note}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

NoteList.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	archiveHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
}

export default NoteList
