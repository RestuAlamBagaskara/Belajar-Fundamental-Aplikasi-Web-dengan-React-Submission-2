import React, { useEffect, useState } from "react"
import PropTypes, { func } from "prop-types"
import { useParams } from "react-router-dom"
import { getNote } from "../utils/network-data"
import { showFormattedDate } from "../utils/index"
import LoadingIndicator from "../components/LoadingIndicator"

function DetailNote() {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(true)
	const { id } = useParams()

	useEffect(() => {
		getNote(id).then((res) => {
			setNotes(res.data)
			setLoading(false)
		})
	}, [notes])

	const { title, createdAt, body } = notes
	return (
		<>
			{loading ? (
				<LoadingIndicator />
			) : (
				<div className="detail-page">
					<p className="detail-page__title">{title}</p>
					<p className="detail-page__createdAt">
						{showFormattedDate(createdAt)}
					</p>
					<p className="detail-page__body">{body}</p>
				</div>
			)}
		</>
	)
}

export default DetailNote
