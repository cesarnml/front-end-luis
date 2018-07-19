import {
  FETCHING_NOTES,
  FETCHING_NOTE,
  POSTING_NOTE,
  DELETING_NOTE,
  UPDATING_NOTE,
  ERROR
} from '../actions'

const initialState = { fetching: false, error: false }

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_NOTES:
      return { ...state, fetching: action.payload }
    case FETCHING_NOTE:
      return { ...state, fetching: action.payload }
    case POSTING_NOTE:
      return { ...state, fetching: action.payload }
    case DELETING_NOTE:
      return { ...state, fetching: action.payload }
    case UPDATING_NOTE:
      return { ...state, fetching: action.payload }
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
