import React from 'react'
import useLanguage from "../hooks/useLanguage"

export default function LoadingIndicator(){
  const text = useLanguage()
  return (
    <div className="page-not-found">
			<h1>{text.loading}</h1>
		</div>
  )
}