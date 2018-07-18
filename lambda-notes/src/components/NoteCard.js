import React from 'react'
import { Link } from 'react-router-dom'

const NoteCard = (props) => {
  const note = props.note
  return (
    <Link key={note._id} className='myLink' to={`/notes/${note._id}`}>
      <h1 className='cardTitle'>{note.title}</h1>
      <p>{note.textBody}</p>
    </Link>
  )
}
export default NoteCard
