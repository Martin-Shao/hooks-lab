// actions
const ADD = 'ADD'
const INITIAL = 'INITIAL'
const UPDATEQUERY = 'UPDATEQUERY'
const ONLOADCHANGE = 'ONLOADCHANGE'
const UPDATESTEP = 'UPDATESTEP'

// action creators
export const fetchInitial = payload => ({
  type: INITIAL,
  payload,
})

export const addTodo = payload => {
  if (!payload) return;
  return {
    type: ADD,
    payload,
  }
}

export const onLoadChange = load => ({
  type: ONLOADCHANGE,
  payload: load,
})

export const updateQuery = payload => ({
  type: UPDATEQUERY,
  payload,
})

export const updateStep = payload => ({
  type: UPDATESTEP,
  payload,
})

export const reducer = (state, action) => {
  console.info('reducer...', state, action)
  switch (action.type) {
    case INITIAL:
      return { ...state, ...action.payload };
    case ADD:
      return { ...state, ...action.payload };
    case UPDATEQUERY:
      return { ...state, Query: action.payload };
    case ONLOADCHANGE:
      return { ...state, load: action.payload };
    case UPDATESTEP:
      return {
        ...state,
      }
    default:
      return state;
  }
};