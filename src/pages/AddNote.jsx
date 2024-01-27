import React from "react"
import NoteCreateForm from "../components/NoteCreateForm"
import PropTypes from "prop-types"
import { addNote } from "../utils/network-data"

function addNoteHandler({ title, body }) {
	addNote({ title, body })
}

function AddNote() {
	return (
		<div className="add-form">
			<NoteCreateForm submitHandler={addNoteHandler} />
		</div>
	)
}

AddNote.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
}

export default AddNote
