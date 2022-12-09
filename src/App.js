import React, { useState, useEffect } from 'react'
import './style.css'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

const App = () => {
  
  const [title, setTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [notice, setNotice] = useState(null)
  const [error, setError] = useState(null)

  const [notes, setNotes] = useState([])

  const displayNotice = text => {
    setNotice(text)
    setTimeout(() => {
      setNotice(null)
    }, 5000)
  }

  const displayError = text => {
    setError(text)
    setTimeout(() => {
      setError(null)
    }, 10000)
  }

  // fetching initial data using effect hook
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(returnedNotes => {
        setNotes(notes.concat(returnedNotes.data))
        displayNotice('Fetched initial notes sucessfully')
      })
      .catch(error => {
        console.log(error)
        displayError(`Can't fetch initial notes`)
      })
  }, [])

  // saving data from the form
  const saveNote = e => {
    e.preventDefault()
    console.log('Add note clicked')

    if (noteContent === '') {
      displayError(`Can't save a note without content`)
      return
    }

    const noteObject = {
      title: title,
      content: noteContent,
      pinned: true
    }

    axios
      .post(baseUrl, noteObject)
      .then(response => {
        const returnedNote = response.data
        setNotes(notes.concat(returnedNote))

        displayNotice('Note saved successfully')
        setTitle('')
        setNoteContent('')
      })
      .catch(error => {
        console.log(error)
        displayError('Error saving note!')
      })

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

      <PinnedNotes notes={notes} title="Pinned Notes" setNotes={setNotes}/>
      <OtherNotes notes={notes} title="Other Notes" setNotes={setNotes} />

    </div>
  )
}

const PinnedNotes = ({ notes, title, setNotes }) => {
  const pin = notes.filter(note => note.pinned)

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {
          pin.map((note, i) => {
            return (<Note key={i} note={note} setNotes={setNotes} notes={notes} />)
          })
        }
      </ul>
    </div>
  )
}

const Note = ({ note, setNotes, notes }) => {


  return (
    <li>
      {note.content} 
      <button 
        onClick={() => {
          if (window.confirm(`Do you want to delete note '${note.content}?' `)) {
            console.log('Note to delete ', note.id)
            const deleteUrl = `${baseUrl}/${note.id}`
            axios
              .delete(deleteUrl)
              .then(response => {
                console.log(`Note '${note.title}' deleted successfully`)
                setNotes(notes.filter(newNote => newNote.id !== note.id))
              })
              .catch(error => {
                console.log(error)
              })
          }
        }}
      >Delete</button>
    </li>
  )
}

const OtherNotes = ({ notes, title, setNotes }) => {
  const notPin = notes.filter(note => !note.pinned)
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {
          notPin.map((note, i) => {
            return (<Note note={note} key={i} setNotes={setNotes} notes={notes} />)
          })
        }
      </ul>
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