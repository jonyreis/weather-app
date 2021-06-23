import { Reducer } from 'redux'

interface ICardLocationProps {
  id: string
  city: string
  state: string
  country: string
}


const INITIAL_STATE: Array<ICardLocationProps> = []

const search: Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_SEARCH': {
      const { payload } = action
      return payload
    }
    default: {
      return state
    }
  }
}

export default search