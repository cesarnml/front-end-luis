import { FETCH_NOTES, FETCH_NOTE, FETCH_TAGS, UPDATE_TAGS } from '../actions'

export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTES:
      return [...action.payload]
    default:
      return state
  }
}

export const singleReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOTE:
      return action.payload
    default:
      return state
  }
}

export const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return action.payload
    case UPDATE_TAGS:
      return [...state, action.payload]
    default:
      return state
  }
}
