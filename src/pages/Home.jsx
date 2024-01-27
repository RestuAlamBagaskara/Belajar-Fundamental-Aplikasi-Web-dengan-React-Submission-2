import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import PropTypes from "prop-types"
import LoadingIndicator from "../components/LoadingIndicator"
import NoteList from "../components/NoteList"
import SearchBar from "../components/SearchBar"
import useLanguage from '../hooks/useLanguage'
import { archiveNote, deleteNote, getActiveNotes } from "../utils/network-data"

function Home() {
	const [searchParams, setSearchParams] = useSearchParams()
	const search = searchParams.get("keyword")
	const [initNotes, setInitNotes] = useState(false) // flag sudah ambil notes dari api
	const [loading, setLoading] = useState(true)
	const [dataNotes, setDataNotes] = useState([]) // all notes from api
	const [notes, setNotes] = useState([])
	const [keyword, setKeyword] = useState(search)

	// const text = useLanguage()

	const searchHandler = (newKeyword) => {
		setKeyword(newKeyword)
		setSearchParams({ keyword: newKeyword })
	}

	const archiveNoteHandler = (id) => {
		archiveNote(id)
		getActiveNotes().then(res => {
			setNotes(res.data)
		})
	}

	
	const deleteNoteHandler = (id) => {
		deleteNote(id)
		getActiveNotes().then(res => {
			setNotes(res.data)
		})
	}

	useEffect(() => {
		getActiveNotes()
			.then((res) => {
			  if (!res.error) {
				setDataNotes(res.data)
				setNotes(res.data)
				setInitNotes(true)
				setLoading(false)
			  }
			})
			.catch(() => {
			  alert(text.error)
			})
	}, [notes])

	useEffect(() => {
		if (!initNotes) {
			getActiveNotes()
			.then((res) => {
			  if (!res.error) {
				setDataNotes(res.data)
				setNotes(res.data)
				setInitNotes(true)
				setLoading(false)
			  }
			})
			.catch(() => {
			  alert(text.error)
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

	return (
		<>
			<SearchBar
				keyword={keyword ?? ""}
				keywordChange={searchHandler}
			/>
			{loading ? <LoadingIndicator /> : 
			<NoteList
				notes={notes}
				archiveHandler={archiveNoteHandler}
				deleteHandler={deleteNoteHandler}
			/>}
		</>
	)

}

// Home.propTypes = {
// 	defaultKeyword: PropTypes.string,
// 	keywordChange: PropTypes.func.isRequired,
// }

export default Home
