import React, { useState } from "react"
import NoteInput from "./NoteInput"
import PropTypes from "prop-types"
import useLanguage from "../hooks/useLanguage"

function NoteCreateForm({ submitHandler }) {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const text = useLanguage()

	const titleChangeHandler = (ev) => {
		const characterLimit = 50
		if (ev.target.value.length > characterLimit) return

		setTitle(ev.target.value)
	}

	const bodyChangeHandler = (ev) => {
		setBody(ev.target.value)
	}

	const localSubmitHandler = (ev) => {
		ev.preventDefault()
		if (!title || !body) return

		submitHandler({ title, body })
		setTitle("")
		setBody("")
	}
	
	return (
		<div className="note-input">
			<h2 className="note-input__title">{text.create_note}</h2>
			<p className="note-input__title__char-limit">
				{text.remain_char}: <span>{50 - title.length}</span>
			</p>
			<form className="add_form" onSubmit={localSubmitHandler}>
				<div>
					<NoteInput
						handler={titleChangeHandler}
						placeholder={text.input_title_placeholder}
						type={"text"}
						value={title}
					/>
				</div>
				<div>
					<NoteInput
						handler={bodyChangeHandler}
						placeholder={text.input_body_placeholder}
						type={"textarea"}
						value={body}
						style={{ height: "200px" }}
					/>
					<button type="submit" disabled={!title || !body}>
						{text.add_note}
					</button>
				</div>
			</form>
		</div>
	)
}

NoteCreateForm.propTypes = {
	submitHandler: PropTypes.func.isRequired,
}

export default NoteCreateForm
