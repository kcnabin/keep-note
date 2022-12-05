import React, { useState, useEffect } from 'react'
import './style.css'
import noteRequests from './noteRequests'

const App = () => {
  const [title, setTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [notice, setNotice] = useState(null)
  const [error, setError] = useState(null)
  const [allNotes, setAllNotes] = useState('')

  const displayNotice = text => {
    setNotice(text)
    setTimeout(() => {
      setNotice(null)
    }, 4000)
  }

  const displayError = text => {
    setError(text)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  useEffect(() => {
    try {
      const initialNotes = noteRequests.getAll()
      setAllNotes(initialNotes)

      displayNotice('Initial data fetched from server!')

    } catch (error) {
      console.log(error)

      displayError("Can't fetch initial data")
    }
  }, [])

  const saveNote = e => {
    e.preventDefault()
    console.log('Add note clicked')

    if (noteContent === '') {
      displayError(`Can't save a note without content`)
      return
    }

  }

  const newNoteForm = () => {
    return (
      <form onSubmit={saveNote}>
        <div>
          <p>Add new note</p>
          <input 
            type="text"
            id="note-title"
            placeholder="Note Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>  
        
        <div>
          <input 
            type="text"
            id="note-content"
            placeholder="Enter your notes here"
            value={noteContent}
            onChange={({ target }) => setNoteContent(target.value)}
          />
        </div>

        <button type="submit">Add Note</button>
      </form>
    )
  }

  return (
    <div>
      <Title text="Keep your notes safe!" />
      <Notice notice={notice} />
      <Error error={error} />
      
      {newNoteForm()}

      

    </div>
  )
}

const Title = ({ text }) => <h3>{text}</h3>

const Notice = ({ notice }) => {
  if (notice) {
    return (<h3 className="notice">{notice}</h3>)
  }
  return null
}

const Error = ({ error }) => {
  if (error) {
    return (<h3 className="error">{error}</h3>)
  }
  return null
}

export default App