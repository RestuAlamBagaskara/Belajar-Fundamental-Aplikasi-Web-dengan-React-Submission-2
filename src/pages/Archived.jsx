import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types"
import LoadingIndicator from "../components/LoadingIndicator"
import NoteList from "../components/NoteList"
import SearchBar from "../components/SearchBar"
import {
	deleteNote,
	getArchivedNotes,
	unarchiveNote,
} from "../utils/network-data"

function ArchivedPage(){
	const [searchParams, setSearchParams] = useSearchParams()
	const search = searchParams.get("keyword")
	const [initNotes, setInitNotes] = useState(false) // flag sudah ambil notes dari api
	const [loading, setLoading] = useState(true)
	const [dataNotes, setDataNotes] = useState([]) // all notes from api
	const [notes, setNotes] = useState([])
	const [keyword, setKeyword] = useState(search)

	const searchHandler = (keyword) => {
		setKeyword(keyword)
		setSearchParams({keyword})
	}

	const unarchiveNoteHandler = (id) => {
		unarchiveNote(id)
		getArchivedNotes().then(res => {
			setNotes(res.data)
		})
	}

	const deleteNoteHandler = (id) => {
		deleteNote(id)
		getArchivedNotes().then(res => {
			setNotes(res.data)
		})
	}

	useEffect(() => {
		getArchivedNotes()
			.then((res) => {
			  if (!res.error) {
				setDataNotes(res.data)
				setNotes(res.data)
				setInitNotes(true)
				setLoading(false)
			  }
			})
			.catch(() => {
			  alert("textApp.msg.error")
			})
	}, [notes])

	useEffect(() => {
		if (!initNotes) {
			getArchivedNotes()
			.then((res) => {
			  if (!res.error) {
				setDataNotes(res.data)
				setNotes(res.data)
				setInitNotes(true)
				setLoading(false)
			  }
			})
			.catch(() => {
			  alert("textApp.msg.error")
			})
		}

		if (initNotes) {
		  let tempDataNotes = [...dataNotes]
		  if (search !== '') {
			tempDataNotes = tempDataNotes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
		  }
		  setNotes(tempDataNotes)
		}
		
	  }, [search])
	// const filteredNotes = notes.filter((note) => {
	// 	return note.title.toLowerCase().includes(this.state.keyword.toLowerCase())
	// })
	return (
		<>
			<SearchBar
				keyword={keyword ?? ""}
				keywordChange={searchHandler}
			/>
			{loading ? <LoadingIndicator /> : 
			<NoteList
				notes={notes}
				archiveHandler={unarchiveNoteHandler}
				deleteHandler={deleteNoteHandler}
			/>}
		</>
	)
}

export default ArchivedPage
