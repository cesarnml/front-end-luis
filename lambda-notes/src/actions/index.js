import axios from 'axios'

const url = `https://killer-notes.herokuapp.com/note`

export const FETCH_NOTES = 'FETCH_NOTES'
export const FETCHING_NOTES = 'FETCHING_NOTES'
export const ERROR = 'ERROR_FETCHING_NOTES'

export const FETCH_NOTE = 'FETCH_NOTE'
export const FETCHING_NOTE = 'FETCHING_NOTE'

export const POSTING_NOTE = 'POSTING_NOTE'
export const DELETING_NOTE = 'DELETING_NOTE'
export const UPDATING_NOTE = 'UPDATING_NOTE'

export const FETCH_TAGS = 'FETCH_TAGS'
export const UPDATE_TAGS = 'UPDATED_TAGS'

const flatten = function (arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i]
    if (Array.isArray(value)) {
      flatten(value, result)
    } else {
      result.push(value)
    }
  }
  return result
}
export const fetchNotes = () => {
  const request = axios.get(`${url}/get/all`)
  return (dispatch) => {
    dispatch({ type: FETCHING_NOTES, payload: true })
    request
      .then((res) => {
        const arr = res.data.map((note) => note.tags)
        let tags = [ ...new Set(flatten(arr)) ].filter((tag) => tag.length >= 2)
        dispatch({ type: FETCH_TAGS, payload: tags })
        dispatch({ type: FETCH_NOTES, payload: res.data })
        dispatch({ type: FETCHING_NOTES, payload: false })
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }))
  }
}

export const fetchNote = (id) => {
  const request = axios.get(`${url}/get/${id}`)
  return (dispatch) => {
    dispatch({ type: FETCHING_NOTE, payload: true })
    request
      .then((res) => {
        dispatch({ type: FETCHING_NOTE, payload: false })
        dispatch({ type: FETCH_NOTE, payload: res.data })
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }))
  }
}

export const deleteNote = (id) => {
  const request = axios.delete(`${url}/delete/${id}`)
  return (dispatch) => {
    dispatch({ type: DELETING_NOTE, payload: true })
    request
      .then((res) => {
        dispatch({
          type: FETCH_NOTES,
          payload: axios.get(`${url}/get/all`).then((res) => {
            dispatch({ type: FETCH_NOTES, payload: res.data })
          })
        })
        dispatch({ type: DELETING_NOTE, payload: false })
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }))
  }
}

export const postNote = (note) => {
  const request = axios.post(`${url}/create`, note)
  return (dispatch) => {
    dispatch({ type: POSTING_NOTE, payload: true })
    request
      .then((res) => {
        dispatch({
          type: FETCH_NOTES,
          payload: axios.get(`${url}/get/all`).then((res) => {
            const arr = res.data.map((note) => note.tags)
            dispatch({ type: FETCH_TAGS, payload: flatten(arr) })
            dispatch({ type: FETCH_NOTES, payload: res.data })
            dispatch({ type: POSTING_NOTE, payload: false })
          })
        })
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }))
  }
}

export const editNote = (id, note) => {
  // console.log('IN EDITNOTE', note)
  const request = axios.put(`${url}/edit/${id}`, note)
  return (dispatch) => {
    dispatch({ type: UPDATING_NOTE, payload: true })
    request
      .then((res) => {
        dispatch({ type: UPDATING_NOTE, payload: false })
        dispatch({
          type: FETCH_NOTE,
          payload: axios.get(`${url}/get/${id}`).then((res) => {
            const arr = res.data.tags
            dispatch({ type: UPDATE_TAGS, payload: arr })
            dispatch({ type: FETCH_NOTE, payload: res.data })
          })
        })
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }))
  }
}
