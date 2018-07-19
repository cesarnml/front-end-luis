import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'markdown-to-jsx'

import { fetchNote } from '../actions'

const NoteCard = (props) => {
  const { note } = props

  const handleDetails = () => {
    props.fetchNote(note._id)
    props.history.push(`/notes/${note._id}`)
  }

  return (
    // <Link key={note._id} className='myLink' to={`/notes/${note._id}`}>
    <div key={note._id} className='myLink' onClick={() => handleDetails()}>
      <div className='cardTitle'>
        {note.title.length > 25 ? note.title.substr(0, 24) + ' ...' : note.title}
      </div>
      <Markdown className='cardBody'>
        {note.textBody.length > 200 ? (
          note.textBody.substr(0, 199) + ' ...'
        ) : (
          note.textBody
        )}
      </Markdown>
      <div className='card-tags'>
        <div className='fas fa-tag card-tags'>
          {note.tags.map((tag, index) => {
            return (
              <div className='card-tag' key={tag + index}>
                {tag}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default connect(null, { fetchNote })(NoteCard)
