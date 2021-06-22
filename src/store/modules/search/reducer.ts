import { Reducer } from 'redux'

const INITIAL_STATE: Array<object> = []

const search: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_SEARCH': {
      state = action.payload
      return state
    }
    default: {
      return state
    }
  }
}

export default search