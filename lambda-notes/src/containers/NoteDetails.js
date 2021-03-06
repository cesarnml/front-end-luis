import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchNote, deleteNote, editNote } from '../actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class NoteDetails extends Component {
  constructor (props) {
    super(props)

    this.props.fetchNote(this.props.match.params.id)

    this.state = {
      modal: false,
      editModal: false,
      isEditing: false,
      title: this.props.title,
      textBody: this.props.textBody,
      tags: this.props.tags
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  editToggle = () => {
    this.setState({
      editModal: !this.state.editModal,
      isEditing: true
    })
  }

  handleClick = () => {
    this.props.deleteNote(this.props.match.params.id)
    this.props.history.push('/')
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { title, textBody, tags } = this.state
    const note = { title, textBody, tags }
    this.props.editNote(this.props.match.params.id, note)
    this.setState({ title, textBody })
    this.editToggle()
  }

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  render () {
    const note = this.props.note
    return (
      <div className='noteDetails-container'>
        <div className='noteDetails'>
          <div className='noteDetails-btns'>
            <div className=''>
              <Button
                color='secondary'
                className='Btn-modal'
                onClick={this.editToggle}
              >
                Edit
              </Button>
              <Modal
                isOpen={this.state.editModal}
                toggle={this.editToggle}
                className='editModal'
              >
                <ModalHeader>Edit Note</ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={this.handleSubmit}
                    className='editForm d-flex flex-column'
                  >
                    <label>Title:</label>
                    <input
                      className='edit-title'
                      type='text'
                      name='title'
                      value={this.state.title || note.title}
                      onChange={this.handleChange}
                    />
                    <label>
                      Add Tags: <i className='fas fa-tag' />
                    </label>
                    <input
                      className='add tags'
                      type='text'
                      name='tags'
                      value={this.state.tags}
                      onChange={this.handleChange}
                    />
                    <label>Note:</label>
                    <textarea
                      className='edit-textBody'
                      type='text'
                      name='textBody'
                      value={this.state.textBody || note.textBody}
                      onChange={this.handleChange}
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onClick={this.handleSubmit}>
                    Update Note
                  </Button>
                  <Button color='secondary' onClick={this.editToggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            {/* end of edit modal */}
            <div className='btn-modal'>
              <Button
                color='danger'
                className='noteDetail-button Btn-modal'
                onClick={this.toggle}
              >
                Delete
              </Button>
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  Deleting Note <i class='fas fa-trash-alt' />
                </ModalHeader>
                <ModalBody>
                  Are You Sure You Want To Delete This Note ?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color='danger'
                    onClick={(this.toggle, this.handleClick)}
                  >
                    Delete
                  </Button>{' '}
                  <Button color='primary' onClick={this.toggle}>
                    No
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            {/* end of delete modal */}
          </div>

          <h1 className='title-header'>{note.title}</h1>
          <div className='noteBody'>{note.textBody}</div>
          <p>{note.tags}</p>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    note: state.note
  }
}
export default connect(mapStateToProps, { fetchNote, deleteNote, editNote })(
  NoteDetails
)
