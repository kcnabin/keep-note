import React, { useState } from 'react'
import './style.css'

const App = () => {
  const [title, setTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [notice, setNotice] = useState(null)

  const saveNote = e => {
    e.preventDefault()

    if (noteContent === '') {
      setNotice(`Can't save a note without content`)
      setTimeout(() => {
        setNotice(null)
      }, 4000)
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

export default App